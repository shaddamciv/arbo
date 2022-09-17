
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ArboTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: bigint;
  Bytes: any;
};

export type ARBO = {
  id: Scalars['ID'];
  count: Scalars['BigInt'];
  owner: Scalars['Bytes'];
  gardeners: Array<Gardeners>;
  totalGrowth: Scalars['BigInt'];
  winner: Scalars['Bytes'];
};


export type ARBOgardenersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gardeners_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gardeners_filter>;
};

export type ARBO_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  gardeners?: InputMaybe<Array<Scalars['String']>>;
  gardeners_not?: InputMaybe<Array<Scalars['String']>>;
  gardeners_contains?: InputMaybe<Array<Scalars['String']>>;
  gardeners_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  gardeners_not_contains?: InputMaybe<Array<Scalars['String']>>;
  gardeners_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  gardeners_?: InputMaybe<Gardeners_filter>;
  totalGrowth?: InputMaybe<Scalars['BigInt']>;
  totalGrowth_not?: InputMaybe<Scalars['BigInt']>;
  totalGrowth_gt?: InputMaybe<Scalars['BigInt']>;
  totalGrowth_lt?: InputMaybe<Scalars['BigInt']>;
  totalGrowth_gte?: InputMaybe<Scalars['BigInt']>;
  totalGrowth_lte?: InputMaybe<Scalars['BigInt']>;
  totalGrowth_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalGrowth_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  winner?: InputMaybe<Scalars['Bytes']>;
  winner_not?: InputMaybe<Scalars['Bytes']>;
  winner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  winner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  winner_contains?: InputMaybe<Scalars['Bytes']>;
  winner_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ARBO_orderBy =
  | 'id'
  | 'count'
  | 'owner'
  | 'gardeners'
  | 'totalGrowth'
  | 'winner';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Gardeners = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  amount: Scalars['BigInt'];
};

export type Gardeners_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Gardeners_orderBy =
  | 'id'
  | 'address'
  | 'amount';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  arbo?: Maybe<ARBO>;
  arbos: Array<ARBO>;
  gardeners: Array<Gardeners>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryarboArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryarbosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ARBO_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ARBO_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygardenersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gardeners_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gardeners_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  arbo?: Maybe<ARBO>;
  arbos: Array<ARBO>;
  gardeners: Array<Gardeners>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionarboArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionarbosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ARBO_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ARBO_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongardenersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gardeners_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gardeners_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

}
export type QueryArboSdk = {
  /** undefined **/
  arbo: InContextSdkMethod<ArboTypes.Query['arbo'], ArboTypes.QueryarboArgs, MeshContext>,
  /** undefined **/
  arbos: InContextSdkMethod<ArboTypes.Query['arbos'], ArboTypes.QueryarbosArgs, MeshContext>,
  /** undefined **/
  gardeners: InContextSdkMethod<ArboTypes.Query['gardeners'], ArboTypes.QuerygardenersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<ArboTypes.Query['_meta'], ArboTypes.Query_metaArgs, MeshContext>
};

export type MutationArboSdk = {

};

export type SubscriptionArboSdk = {
  /** undefined **/
  arbo: InContextSdkMethod<ArboTypes.Subscription['arbo'], ArboTypes.SubscriptionarboArgs, MeshContext>,
  /** undefined **/
  arbos: InContextSdkMethod<ArboTypes.Subscription['arbos'], ArboTypes.SubscriptionarbosArgs, MeshContext>,
  /** undefined **/
  gardeners: InContextSdkMethod<ArboTypes.Subscription['gardeners'], ArboTypes.SubscriptiongardenersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<ArboTypes.Subscription['_meta'], ArboTypes.Subscription_metaArgs, MeshContext>
};
export type ArboContext = {
      ["ARBO"]: { Query: QueryArboSdk, Mutation: MutationArboSdk, Subscription: SubscriptionArboSdk },
      
    };