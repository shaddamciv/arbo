# ARBO
ARBO a game in which you get back digitally for nurturing the environment. All profits will be used to buy toucan carbon credits
<p align="center">
  <img src="./assets/imgs/arbo.gif"/>
</p>

## Design of the game

<p align="center">
  <img src="./assets/imgs/Arbo_flow_en.png"/>
</p>

## Folder structure
1. hardhat -> Smart contract code
2. ARBO -> The Gamemaker game
3. assets -> Images for the repo 
4. middleware -> Public/Permisonless backend code that allows for maintaining cache information for speedy game processing 

## How the game works 
A tree(NFT token) is planted by the NFT contract [seed time, growth in cm(0), max growth(random, capped)]
A user creates/updates the flow, based on the growth input from oracle [time, growth in cm = multiplier X flowrate(capped)]
#### Gameplay
1. We utilize the concept of prisoner's dilemma.
2. As a user you can water the ARBO with a gnome.
3. Watering and growing the tree entitles you to a gardener fee, If no 10xers and if you have not stopped watering when the tree is grown.
4. "10X watering" is possible, the user who does 10X his/her last watering rate stands a chance to win everyone's flow and the ARBO as a NFT.

5. For redemption for a NFT, fees will be deducted from 10xer

In the case 4 happens all gnomes who are not 10xers lose any and all winnings.

All excess fees and profit will be used for funding the next round and for retiring carbon credits.

As a winner I can redeem the NFT and claim outflow by paying a fee. The fee goes 5% to protocol, 95% to other players.

## Development Phases
Phase 1 -> Keep all code via web3 calls - Hit a snag on the graph, so worked around via websockets + graph clients
Phase 2 -> Deploy on optimism and polygon - Polygon done, next optimism
Phase 3 -> Change to ACL superfluid to improve game UX - Superfluid CFA done, ACL Moved to stretch goal post hack

## Reference Libraries used
1. We used https://github.com/relaycc/relay for the xmtp chat client
2. We used graph-client/javascript-cjs for the graph-relayer module

## Tests
cd hardhat
npx hardhat test test/Tree.ts


## Deployed Address

Polygon V1  - Used for Demo video
https://mumbai.polygonscan.com/address/0xaa19610d44b7ef574faeeca5e1a77d4bb7d8b8c2

Polygon V2
npx hardhat verify --network mumbai 0x24cC5458323Ba7F82E5de48D2D5A4363d586077E "Grow ARBO" "ARBO" 0xCb0Ff4D0cA186f0Fc0301258066Fe3fA258417a6 0xEA34d7113DcE4e7A563dcA021532f66E7328F51D 0x7A6B9B4FF950D92126B1B37abC217d86738C5C65
npx hardhat verify --network mumbai 0xf753e8F555c3E624100337B0438878f375bc0053 0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A 0x7B49420008BcA14782F2700547764AdAdD54F813 0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE 30
npx hardhat verify --network mumbai 0x7A6B9B4FF950D92126B1B37abC217d86738C5C65 0xf753e8F555c3E624100337B0438878f375bc0053 0xCb0Ff4D0cA186f0Fc0301258066Fe3fA258417a6 0xEA34d7113DcE4e7A563dcA021532f66E7328F51D


Optimism
The Grow address is -  0xfca0C8Cf26e8045eb472D7e3015Af73c2B1C03Ba
The daix address is -  0x7d342726B69C28D942ad8BfE6Ac81b972349d524
The winner address is -  0xe97A434341f839079d15543008F98Aad016d5d64
npx hardhat verify --network optimism 0xe97A434341f839079d15543008F98Aad016d5d64 0xfca0C8Cf26e8045eb472D7e3015Af73c2B1C03Ba 0x567c4B141ED61923967cA25Ef4906C8781069a10 0x7d342726B69C28D942ad8BfE6Ac81b972349d524