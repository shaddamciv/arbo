// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

/// @dev Constant Flow Agreement registration key, used to get the address from the host.
bytes32 constant CFA_ID = keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1");

/// @dev Thrown when the receiver is the zero adress.
error InvalidReceiver();

/// @dev Thrown when receiver is also a super app.
error ReceiverIsSuperApp();

/// @dev Thrown when the callback caller is not the host.
error Unauthorized();

/// @dev Thrown when the token being streamed to this contract is invalid
error InvalidToken();

/// @dev Thrown when the agreement is other than the Constant Flow Agreement V1
error InvalidAgreement();



/// @title Stream Redirection Contract
/// @notice This contract is a registered super app, meaning it receives
contract RedirectAll is SuperAppBase {
    // CFA library setup
    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1Lib;
    //public variables which we'll set userData values to
    ISuperfluid.Context public uData;
    address public sender;

    /// @dev Super token that may be streamed to this contract
    ISuperToken internal immutable _acceptedToken;

    /// @notice This is the current receiver that all streams will be redirected to.
    address public _receiver;

    constructor(
        ISuperfluid host,
        ISuperToken acceptedToken
    ) {
        assert(address(host) != address(0));
        assert(address(acceptedToken) != address(0));
        // assert(receiver != address(0));

        _acceptedToken = acceptedToken;
        _receiver = address(this);

        cfaV1Lib = CFAv1Library.InitData({
            host: host,
            cfa: IConstantFlowAgreementV1(address(host.getAgreementClass(CFA_ID)))
        });

        // Registers Super App, indicating it is the final level (it cannot stream to other super
        // apps), and that the `before*` callbacks should not be called on this contract, only the
        // `after*` callbacks.
        host.registerApp(
            SuperAppDefinitions.APP_LEVEL_FINAL |
                SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
                SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
                SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP
        );
    }

    // ---------------------------------------------------------------------------------------------
    // EVENTS

    /// @dev Logged when the receiver changes
    /// @param receiver The new receiver address.
    event ReceiverChanged(address indexed receiver);

    // ---------------------------------------------------------------------------------------------
    // MODIFIERS

    modifier onlyHost() {
        if (msg.sender != address(cfaV1Lib.host)) revert Unauthorized();
        _;
    }

    modifier onlyExpected(ISuperToken superToken, address agreementClass) {
        if (superToken != _acceptedToken) revert InvalidToken();
        if (agreementClass != address(cfaV1Lib.cfa)) revert InvalidAgreement();
        _;
    }

       
    // ---------------------------------------------------------------------------------------------
    // SUPER APP CALLBACKS

    function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, //_agreementId
        bytes calldata, //_agreementData
        bytes calldata, //_cbdata
        bytes calldata _ctx
    )
        external
        override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        ISuperfluid.Context memory decompiledContext = cfaV1Lib.host.decodeCtx(_ctx);
        uData = decompiledContext;

        sender = decompiledContext.msgSender;
        
        int96 netFlowRate = cfaV1Lib.cfa.getNetFlow(_acceptedToken, address(this));
        (,int96 flowRate,,) = cfaV1Lib.cfa.getFlow(_acceptedToken, sender, address(this));

        _waterTree(flowRate, netFlowRate, sender, false);
        return _ctx;
    }

    function afterAgreementUpdated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId,
        bytes calldata, // _agreementData,
        bytes calldata, // _cbdata,
        bytes calldata _ctx
    )
        external
        override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        ISuperfluid.Context memory decompiledContext = cfaV1Lib.host.decodeCtx(_ctx);
        uData = decompiledContext;

        sender = decompiledContext.msgSender;
        
        int96 netFlowRate = cfaV1Lib.cfa.getNetFlow(_acceptedToken, address(this));
        (,int96 flowRate,,) = cfaV1Lib.cfa.getFlow(_acceptedToken, sender, address(this));
        _waterTree(flowRate, netFlowRate, sender, false);
        return _ctx;
    }

    function afterAgreementTerminated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId,
        bytes calldata, // _agreementData
        bytes calldata, // _cbdata,
        bytes calldata _ctx
    ) external override onlyHost returns (bytes memory newCtx) {
        // According to the app basic law, we should never revert in a termination callback
        if (_superToken != _acceptedToken || _agreementClass != address(cfaV1Lib.cfa)) {
            return _ctx;
        }
        //TODO:here the user has stopped watering so we need to remove him from the list of waterers
        // We also need to stop watering for all the non winner
        // uData = decompiledContext;

        ISuperfluid.Context memory decompiledContext = cfaV1Lib.host.decodeCtx(_ctx);
        uData = decompiledContext;

        sender = decompiledContext.msgSender;
        
        int96 netFlowRate = cfaV1Lib.cfa.getNetFlow(_acceptedToken, address(this));
        (,int96 flowRate,,) = cfaV1Lib.cfa.getFlow(_acceptedToken, sender, address(this));
        _waterTree(flowRate, netFlowRate, sender, true);
        return _ctx;
    }


    /// @dev Updates the tree growth status. The flow is either created, updated, or deleted, 
    /// depending on the net flow rate.
    /// each time we can iterate through all the gardeners and let them water again, starting with the latest
    /// TODO: How to stop the flow on a condition
    function _waterTree(int96 inFlowRate,int96 inNetFlowRate, address gardener, bool isStopped) internal virtual{
    }
}