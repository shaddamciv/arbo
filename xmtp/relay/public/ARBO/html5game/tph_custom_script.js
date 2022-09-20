// See if Metamask is installed in the browser
web3 = "";
let web3jsSf;
let metaMaskSigner;
let ARBO = "0xaa19610D44b7EF574FAeEcA5e1a77d4bb7d8b8C2";
let userAddress = "";
let oldData = {};
// function start() {
// 	const ws = new WebSocket(`ws://localhost:8080`);
// 	// const ws = new WebSocket(`ws://ec2-34-226-138-221.compute-1.amazonaws.com:8080`);
	
// 	ws.onmessage = function(event) {
// 		// const data = JSON.parse(event);
// 		setGardener(event.data)
// 	};
// 	ws.onclose = function(){
// 		// Try to reconnect in 5 seconds
// 		setTimeout(function(){start()}, 2000);
// 	};
	
// }
// start()
(async function() {
	const ws = await connectToServer();
	ws.onmessage = (webSocketMessage) => {
		const messageBody = JSON.parse(webSocketMessage.data);
		console.log("messageBody -- ",messageBody, JSON.stringify(oldData) !== JSON.stringify(messageBody))
		if(JSON.stringify(oldData) !== JSON.stringify(messageBody)) {
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

async function postClaimForTokens(wallet_address, epoch_index, epoch, proof, amount) {

	// Default structure of ERC20 smart contract
	let minABI = [{"inputs":[{"internalType":"address","name":"token_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"epoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"},{"internalType":"uint256","name":"_epoch","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"_epoch","type":"uint256"}],"name":"isClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"merkleRootInEpoch","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"},{"internalType":"uint256","name":"_epoch","type":"uint256"}],"name":"setMerkleRootPerEpoch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

	var map = {};
	map["id"] = "postClaimForTokens";

	let contract = new web3.eth.Contract(minABI, "0x47455f503Ee95A2E1E800b4fE5199604499f3316");
	console.log(contract);

	try {

    await contract.methods.claim(epoch_index, wallet_address, amount.toString(), proof, epoch).send({
			from:wallet_address
		});

	} catch(error) {
		console.log(error);
	}

	GMS_API.send_async_event_social(map);
}


















//
