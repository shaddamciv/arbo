// See if Metamask is installed in the browser
web3 = "";
let web3jsSf;
let metaMaskSigner;
let ARBO = "0xaa19610D44b7EF574FAeEcA5e1a77d4bb7d8b8C2";
let userAddress = "";
let oldData = {};
let _gmlinMainRoom = false;

(async function() {
	const ws = await connectToServer();
	ws.onmessage = (webSocketMessage) => {
		const messageBody = JSON.parse(webSocketMessage.data);
		console.log("messageBody -- ", messageBody, JSON.stringify(oldData) !== JSON.stringify(messageBody))
		// GMS_API.send_async_event_social("test");

		if((JSON.stringify(oldData) !== JSON.stringify(messageBody)) && _gmlinMainRoom) {
			setGardener(messageBody);
			oldData = messageBody;
		}
			
};
async function connectToServer() {
	// const ws = new WebSocket('ws://localhost:8080');
	const ws = new WebSocket(`wss://savearbo.xyz/ws`);

	return new Promise((resolve, reject) => {
			const timer = setInterval(() => {
					if(ws.readyState === 1) {
							clearInterval(timer)
							resolve(ws);
					}
			}, 10);
	});
}
})();

function setGardener(data) {
	var map = {};
	map["id"] = "watered";
	map["data"] = "";
	if(localforage){
		localforage.setItem('arbo_lf', data).then(function (value) {
		// Do other things once the value has been saved.
		// console.log(value, "set in db",JSON.parse(data).data.arbos[0]);
		map["data"] = JSON.stringify(data.data);

		GMS_API.send_async_event_social(map);

		}).catch(function(err) {
		// This code runs if there were any errors
		console.log(err);
		});
	}

}
async function claimNFT(tokenID) {
 let minABI = [ { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "contract ISuperfluid", "name": "host", "type": "address" }, { "internalType": "contract ISuperToken", "name": "acceptedToken", "type": "address" }, { "internalType": "address", "name": "_winner", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "InvalidAgreement", "type": "error" }, { "inputs": [], "name": "InvalidToken", "type": "error" }, { "inputs": [], "name": "Unauthorized", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" } ], "name": "ReceiverChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "gardener", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "int96", "name": "amountWatered", "type": "int96" }, { "indexed": false, "internalType": "uint256", "name": "totalGrowth", "type": "uint256" }, { "indexed": false, "internalType": "uint8", "name": "maxGrowth", "type": "uint8" }, { "indexed": false, "internalType": "int96", "name": "totalFlowRate", "type": "int96" } ], "name": "Watered", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "gardener", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountWon", "type": "uint256" } ], "name": "Winner", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountWon", "type": "uint256" } ], "name": "WithdrawWinnings", "type": "event" }, { "inputs": [], "name": "_collectFees", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "_receiver", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "_superToken", "type": "address" }, { "internalType": "address", "name": "_agreementClass", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "_ctx", "type": "bytes" } ], "name": "afterAgreementCreated", "outputs": [ { "internalType": "bytes", "name": "newCtx", "type": "bytes" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "_superToken", "type": "address" }, { "internalType": "address", "name": "_agreementClass", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "_ctx", "type": "bytes" } ], "name": "afterAgreementTerminated", "outputs": [ { "internalType": "bytes", "name": "newCtx", "type": "bytes" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "_superToken", "type": "address" }, { "internalType": "address", "name": "_agreementClass", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "_ctx", "type": "bytes" } ], "name": "afterAgreementUpdated", "outputs": [ { "internalType": "bytes", "name": "newCtx", "type": "bytes" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "beforeAgreementCreated", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "beforeAgreementTerminated", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "beforeAgreementUpdated", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cfaV1Lib", "outputs": [ { "internalType": "contract ISuperfluid", "name": "host", "type": "address" }, { "internalType": "contract IConstantFlowAgreementV1", "name": "cfa", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "int96", "name": "a", "type": "int96" } ], "name": "flowCap", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBoost", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "onERC721Received", "outputs": [ { "internalType": "bytes4", "name": "", "type": "bytes4" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint8", "name": "maxGrowth", "type": "uint8" } ], "name": "plantATree", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "prevBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "sender", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "trees", "outputs": [ { "internalType": "uint8", "name": "currentGrowth", "type": "uint8" }, { "internalType": "uint8", "name": "maxGrowth", "type": "uint8" }, { "internalType": "uint8", "name": "isWon", "type": "uint8" }, { "internalType": "uint256", "name": "amountWon", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "uData", "outputs": [ { "internalType": "uint8", "name": "appLevel", "type": "uint8" }, { "internalType": "uint8", "name": "callType", "type": "uint8" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "address", "name": "msgSender", "type": "address" }, { "internalType": "bytes4", "name": "agreementSelector", "type": "bytes4" }, { "internalType": "bytes", "name": "userData", "type": "bytes" }, { "internalType": "uint256", "name": "appAllowanceGranted", "type": "uint256" }, { "internalType": "uint256", "name": "appAllowanceWanted", "type": "uint256" }, { "internalType": "int256", "name": "appAllowanceUsed", "type": "int256" }, { "internalType": "address", "name": "appAddress", "type": "address" }, { "internalType": "contract ISuperfluidToken", "name": "appAllowanceToken", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "winner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "withdrawFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
	var map = {};
	map["id"] = "claimNFT";

	let contract = new web3.eth.Contract(minABI, ARBO);
	console.log(contract);

	try {
    await contract.methods.transferFrom(ARBO, userAddress, ethers.BigNumber.from(tokenID)).send({
			from:userAddress
		});
	} catch(error) {
		console.log(error);
	}

	GMS_API.send_async_event_social(map);
}

async function withdrawFundsFromNFT(tokenID) {
  let minABI = [ { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "contract ISuperfluid", "name": "host", "type": "address" }, { "internalType": "contract ISuperToken", "name": "acceptedToken", "type": "address" }, { "internalType": "address", "name": "_winner", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "InvalidAgreement", "type": "error" }, { "inputs": [], "name": "InvalidToken", "type": "error" }, { "inputs": [], "name": "Unauthorized", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" } ], "name": "ReceiverChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "gardener", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "int96", "name": "amountWatered", "type": "int96" }, { "indexed": false, "internalType": "uint256", "name": "totalGrowth", "type": "uint256" }, { "indexed": false, "internalType": "uint8", "name": "maxGrowth", "type": "uint8" }, { "indexed": false, "internalType": "int96", "name": "totalFlowRate", "type": "int96" } ], "name": "Watered", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "gardener", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountWon", "type": "uint256" } ], "name": "Winner", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountWon", "type": "uint256" } ], "name": "WithdrawWinnings", "type": "event" }, { "inputs": [], "name": "_collectFees", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "_receiver", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "_superToken", "type": "address" }, { "internalType": "address", "name": "_agreementClass", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "_ctx", "type": "bytes" } ], "name": "afterAgreementCreated", "outputs": [ { "internalType": "bytes", "name": "newCtx", "type": "bytes" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "_superToken", "type": "address" }, { "internalType": "address", "name": "_agreementClass", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "_ctx", "type": "bytes" } ], "name": "afterAgreementTerminated", "outputs": [ { "internalType": "bytes", "name": "newCtx", "type": "bytes" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "_superToken", "type": "address" }, { "internalType": "address", "name": "_agreementClass", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "_ctx", "type": "bytes" } ], "name": "afterAgreementUpdated", "outputs": [ { "internalType": "bytes", "name": "newCtx", "type": "bytes" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "beforeAgreementCreated", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "beforeAgreementTerminated", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "beforeAgreementUpdated", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cfaV1Lib", "outputs": [ { "internalType": "contract ISuperfluid", "name": "host", "type": "address" }, { "internalType": "contract IConstantFlowAgreementV1", "name": "cfa", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "int96", "name": "a", "type": "int96" } ], "name": "flowCap", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBoost", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "onERC721Received", "outputs": [ { "internalType": "bytes4", "name": "", "type": "bytes4" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint8", "name": "maxGrowth", "type": "uint8" } ], "name": "plantATree", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "prevBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "sender", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "trees", "outputs": [ { "internalType": "uint8", "name": "currentGrowth", "type": "uint8" }, { "internalType": "uint8", "name": "maxGrowth", "type": "uint8" }, { "internalType": "uint8", "name": "isWon", "type": "uint8" }, { "internalType": "uint256", "name": "amountWon", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "uData", "outputs": [ { "internalType": "uint8", "name": "appLevel", "type": "uint8" }, { "internalType": "uint8", "name": "callType", "type": "uint8" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "address", "name": "msgSender", "type": "address" }, { "internalType": "bytes4", "name": "agreementSelector", "type": "bytes4" }, { "internalType": "bytes", "name": "userData", "type": "bytes" }, { "internalType": "uint256", "name": "appAllowanceGranted", "type": "uint256" }, { "internalType": "uint256", "name": "appAllowanceWanted", "type": "uint256" }, { "internalType": "int256", "name": "appAllowanceUsed", "type": "int256" }, { "internalType": "address", "name": "appAddress", "type": "address" }, { "internalType": "contract ISuperfluidToken", "name": "appAllowanceToken", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "winner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "withdrawFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
	var map = {};
	map["id"] = "withdrawFundsFromNFT";

	let contract = new web3.eth.Contract(minABI, ARBO);
	console.log(contract);

	try {
    await contract.methods.withdrawFunds(ethers.BigNumber.from(tokenID)).send({
			from:userAddress
		});
	} catch(error) {
		console.log(error);
	}

	GMS_API.send_async_event_social(map);
}

async function plantATree() {
  let minABI = [ { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "contract ISuperfluid", "name": "host", "type": "address" }, { "internalType": "contract ISuperToken", "name": "acceptedToken", "type": "address" }, { "internalType": "address", "name": "_winner", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "InvalidAgreement", "type": "error" }, { "inputs": [], "name": "InvalidToken", "type": "error" }, { "inputs": [], "name": "Unauthorized", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" } ], "name": "ReceiverChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "gardener", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "int96", "name": "amountWatered", "type": "int96" }, { "indexed": false, "internalType": "uint256", "name": "totalGrowth", "type": "uint256" }, { "indexed": false, "internalType": "uint8", "name": "maxGrowth", "type": "uint8" }, { "indexed": false, "internalType": "int96", "name": "totalFlowRate", "type": "int96" } ], "name": "Watered", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "gardener", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountWon", "type": "uint256" } ], "name": "Winner", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountWon", "type": "uint256" } ], "name": "WithdrawWinnings", "type": "event" }, { "inputs": [], "name": "_collectFees", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "_receiver", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "_superToken", "type": "address" }, { "internalType": "address", "name": "_agreementClass", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "_ctx", "type": "bytes" } ], "name": "afterAgreementCreated", "outputs": [ { "internalType": "bytes", "name": "newCtx", "type": "bytes" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "_superToken", "type": "address" }, { "internalType": "address", "name": "_agreementClass", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "_ctx", "type": "bytes" } ], "name": "afterAgreementTerminated", "outputs": [ { "internalType": "bytes", "name": "newCtx", "type": "bytes" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "_superToken", "type": "address" }, { "internalType": "address", "name": "_agreementClass", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "_ctx", "type": "bytes" } ], "name": "afterAgreementUpdated", "outputs": [ { "internalType": "bytes", "name": "newCtx", "type": "bytes" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "beforeAgreementCreated", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "beforeAgreementTerminated", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract ISuperToken", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "beforeAgreementUpdated", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cfaV1Lib", "outputs": [ { "internalType": "contract ISuperfluid", "name": "host", "type": "address" }, { "internalType": "contract IConstantFlowAgreementV1", "name": "cfa", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "int96", "name": "a", "type": "int96" } ], "name": "flowCap", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBoost", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "onERC721Received", "outputs": [ { "internalType": "bytes4", "name": "", "type": "bytes4" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint8", "name": "maxGrowth", "type": "uint8" } ], "name": "plantATree", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "prevBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "sender", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "trees", "outputs": [ { "internalType": "uint8", "name": "currentGrowth", "type": "uint8" }, { "internalType": "uint8", "name": "maxGrowth", "type": "uint8" }, { "internalType": "uint8", "name": "isWon", "type": "uint8" }, { "internalType": "uint256", "name": "amountWon", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "uData", "outputs": [ { "internalType": "uint8", "name": "appLevel", "type": "uint8" }, { "internalType": "uint8", "name": "callType", "type": "uint8" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "address", "name": "msgSender", "type": "address" }, { "internalType": "bytes4", "name": "agreementSelector", "type": "bytes4" }, { "internalType": "bytes", "name": "userData", "type": "bytes" }, { "internalType": "uint256", "name": "appAllowanceGranted", "type": "uint256" }, { "internalType": "uint256", "name": "appAllowanceWanted", "type": "uint256" }, { "internalType": "int256", "name": "appAllowanceUsed", "type": "int256" }, { "internalType": "address", "name": "appAddress", "type": "address" }, { "internalType": "contract ISuperfluidToken", "name": "appAllowanceToken", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "winner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "withdrawFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
	var map = {};
	map["id"] = "plantATree";

	let contract = new web3.eth.Contract(minABI, ARBO);
	console.log(contract);

	try {

    await contract.methods.plantATree(100).send({
			from:userAddress
		});

	} catch(error) {
		console.log(error);
	}

	GMS_API.send_async_event_social(map);
}


function getGardeners() {
	var map = {};
	localforage.getItem('arbo_lf', data).then(function (value) {
    // Do other things once the value has been saved.
    console.log(value, "set in db");
		map["arbo"] = data;
		GMS_API.send_async_event_social(map);

}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
});
}

function inMainRoom() {
	_gmlinMainRoom = true;
}

function checkMetaConnection() {
	if (typeof window.ethereum !== 'undefined') {
		return 1;
	} else {
		return 0;
	}
}

// Ask user to connect wallet to site and get address
async function getMetamaskAccount() {
	var map = {};
	map["id"] = "getWalletAddress";
	map["address"]="0";

	try {
	  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		map["address"] = accounts[0];
		userAddress = accounts[0];
		web3 = new Web3(window.ethereum);
		console.log(web3);
		console.log(map["address"]);

	  web3jsSf = await sdkCore.Framework.create({
			chainId: 80001, //note, you can also use provider.getChainId() to get the active chainId
			provider: web3
		});
		const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
	  metaMaskSigner = web3jsSf.createSigner({ web3Provider: metamaskProvider });
		console.log(web3jsSf, metaMaskSigner);

		
	} catch(error) {
		console.log("User rejected request", error);
	}
	GMS_API.send_async_event_social(map);
}

async function setupFlow() {
	var map = {};
	map["id"] = "setupFlow";

	try{
		const fdaix = await web3jsSf.loadSuperToken("fDAIx");

		const approveOp = fdaix.approve({ receiver: ARBO, amount: "100000000" });

		const flowOp = fdaix.createFlow({
			sender: userAddress,
			receiver: ARBO,
			superToken: fdaix.address,
			flowRate: 100
		});

		const batchCall = web3jsSf.batchCall([approveOp, flowOp]);
		const txn = await batchCall.exec(metaMaskSigner);
	} catch(error) {
		console.log(error);
	}

	GMS_API.send_async_event_social(map);
}

async function stopFlow() {
	var map = {};
	map["id"] = "stopFlow";

	try{
		const fdaix = await web3jsSf.loadSuperToken("fDAIx");


		const deleteFlowOp = fdaix.deleteFlow({
			sender: userAddress,
			receiver: ARBO,
			superToken: fdaix.address,
		});

		const batchCall = web3jsSf.batchCall([deleteFlowOp]);
		const txn = await batchCall.exec(metaMaskSigner);
	} catch(error) {
		console.log(error);
	}

	GMS_API.send_async_event_social(map);
}

async function getTokenBalance(wallet_address, token_address) {

	// Default structure of ERC20 smart contract
	let minABI = [
	  // balanceOf
	  {
	    "constant":true,
	    "inputs":[{"name":"_owner","type":"address"}],
	    "name":"balanceOf",
	    "outputs":[{"name":"balance","type":"uint256"}],
	    "type":"function"
	  },
	  // decimals
	  {
	    "constant":true,
	    "inputs":[],
	    "name":"decimals",
	    "outputs":[{"name":"","type":"uint8"}],
	    "type":"function"
	  }
	];

	var map = {};
	map["id"] = "getTokenBalance";
	map["balance"]="-1";

	let contract = new web3.eth.Contract(minABI, token_address);
	console.log(contract);

	try {

		const balance = await contract.methods.balanceOf(wallet_address).call();
		const decimalPlaces = await contract.methods.decimals().call(); // 8
		let newBalance = 0;
		
		if (decimalPlaces) {
			newBalance = balance / (10 ** decimalPlaces);
		}

		console.log(balance);
		console.log(decimalPlaces);
		console.log(newBalance);

		map["balance"] = newBalance;

	} catch(error) {
		console.log(error);
	}

	GMS_API.send_async_event_social(map);
}

















