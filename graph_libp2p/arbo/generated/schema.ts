// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ARBO extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("count", Value.fromBigInt(BigInt.zero()));
    this.set("owner", Value.fromBytes(Bytes.empty()));
    this.set("gardeners", Value.fromStringArray(new Array(0)));
    this.set("totalGrowth", Value.fromBigInt(BigInt.zero()));
    this.set("winner", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ARBO entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ARBO must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ARBO", id.toString(), this);
    }
  }

  static load(id: string): ARBO | null {
    return changetype<ARBO | null>(store.get("ARBO", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): BigInt {
    let value = this.get("count");
    return value!.toBigInt();
  }

  set count(value: BigInt) {
    this.set("count", Value.fromBigInt(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get gardeners(): Array<string> {
    let value = this.get("gardeners");
    return value!.toStringArray();
  }

  set gardeners(value: Array<string>) {
    this.set("gardeners", Value.fromStringArray(value));
  }

  get totalGrowth(): BigInt {
    let value = this.get("totalGrowth");
    return value!.toBigInt();
  }

  set totalGrowth(value: BigInt) {
    this.set("totalGrowth", Value.fromBigInt(value));
  }

  get winner(): Bytes {
    let value = this.get("winner");
    return value!.toBytes();
  }

  set winner(value: Bytes) {
    this.set("winner", Value.fromBytes(value));
  }
}

export class Gardeners extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Gardeners entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Gardeners must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Gardeners", id.toString(), this);
    }
  }

  static load(id: string): Gardeners | null {
    return changetype<Gardeners | null>(store.get("Gardeners", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}