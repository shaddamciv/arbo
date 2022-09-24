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