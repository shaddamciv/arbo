import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Watered,
  Winner,
  WithdrawWinnings
} from "../generated/Tree/Tree"
import { ARBO, Gardeners } from "../generated/schema"

export function handleWatered(event: Watered): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ARBO.load(event.params.tokenId.toString())
  let gardener = Gardeners.load(event.params.gardener.toHexString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new  ARBO(event.params.tokenId.toString())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }
  if (!gardener) {
    gardener = new  Gardeners(event.params.gardener.toHexString())
  }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count.plus(BigInt.fromI32(1))

  // Entity fields can be set based on event parameters
  entity.owner = event.address
  entity.totalGrowth = entity.totalGrowth.plus(event.params.amountWatered)

  gardener.amount = gardener.amount.plus(event.params.amountWatered)
  gardener.address = event.params.gardener
  gardener.save()

  if (gardener) {
    let gardeners = entity.gardeners
    gardeners.push(gardener.id)
    entity.gardeners = gardeners
  }
  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleWinner(event: Winner): void {
    // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ARBO.load(event.params.tokenId.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new  ARBO(event.params.tokenId.toString())
  }
  // Entity fields can be set based on event parameters
  entity.owner = event.params.gardener
  entity.winner = event.params.gardener
  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleWithdrawWinnings(event: WithdrawWinnings): void {}
