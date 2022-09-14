// See if Metamask is installed in the browser
web3 = "";

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
		web3 = new Web3(window.ethereum);
		console.log(web3);
		console.log(map["address"]);

	} catch(error) {
		console.log("User rejected request");
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
