import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import type { ArboContext } from './sources/ARBO/types';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigDecimal: any;
    BigInt: bigint;
    Bytes: any;
};
export declare type ARBO = {
    id: Scalars['ID'];
    count: Scalars['BigInt'];
    owner: Scalars['Bytes'];
    gardeners: Array<Gardeners>;
    totalGrowth: Scalars['BigInt'];
    winner: Scalars['Bytes'];
};
export declare type ARBOgardenersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Gardeners_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Gardeners_filter>;
};
export declare type ARBO_filter = {
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
export declare type ARBO_orderBy = 'id' | 'count' | 'owner' | 'gardeners' | 'totalGrowth' | 'winner';
export declare type BlockChangedFilter = {
    number_gte: Scalars['Int'];
};
export declare type Block_height = {
    hash?: InputMaybe<Scalars['Bytes']>;
    number?: InputMaybe<Scalars['Int']>;
    number_gte?: InputMaybe<Scalars['Int']>;
};
export declare type Gardeners = {
    id: Scalars['ID'];
    address: Scalars['Bytes'];
    amount: Scalars['BigInt'];
};
export declare type Gardeners_filter = {
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
export declare type Gardeners_orderBy = 'id' | 'address' | 'amount';
/** Defines the order direction, either ascending or descending */
export declare type OrderDirection = 'asc' | 'desc';
export declare type Query = {
    arbo?: Maybe<ARBO>;
    arbos: Array<ARBO>;
    gardeners: Array<Gardeners>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
};
export declare type QueryarboArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryarbosArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<ARBO_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ARBO_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QuerygardenersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Gardeners_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Gardeners_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type Query_metaArgs = {
    block?: InputMaybe<Block_height>;
};
export declare type Subscription = {
    arbo?: Maybe<ARBO>;
    arbos: Array<ARBO>;
    gardeners: Array<Gardeners>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
};
export declare type SubscriptionarboArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionarbosArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<ARBO_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ARBO_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptiongardenersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Gardeners_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Gardeners_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type Subscription_metaArgs = {
    block?: InputMaybe<Block_height>;
};
export declare type _Block_ = {
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>;
    /** The block number */
    number: Scalars['Int'];
    /** Integer representation of the timestamp stored in blocks for the chain */
    timestamp?: Maybe<Scalars['Int']>;
};
/** The type for the top-level _meta field */
export declare type _Meta_ = {
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
export declare type _SubgraphErrorPolicy_ = 
/** Data will be returned even if the subgraph has indexing errors */
'allow'
/** If the subgraph has indexing errors, data will be omitted. The default. */
 | 'deny';
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    ARBO: ResolverTypeWrapper<ARBO>;
    ARBO_filter: ARBO_filter;
    ARBO_orderBy: ARBO_orderBy;
    BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
    BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
    BlockChangedFilter: BlockChangedFilter;
    Block_height: Block_height;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
    Float: ResolverTypeWrapper<Scalars['Float']>;
    Gardeners: ResolverTypeWrapper<Gardeners>;
    Gardeners_filter: Gardeners_filter;
    Gardeners_orderBy: Gardeners_orderBy;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    OrderDirection: OrderDirection;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Subscription: ResolverTypeWrapper<{}>;
    _Block_: ResolverTypeWrapper<_Block_>;
    _Meta_: ResolverTypeWrapper<_Meta_>;
    _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    ARBO: ARBO;
    ARBO_filter: ARBO_filter;
    BigDecimal: Scalars['BigDecimal'];
    BigInt: Scalars['BigInt'];
    BlockChangedFilter: BlockChangedFilter;
    Block_height: Block_height;
    Boolean: Scalars['Boolean'];
    Bytes: Scalars['Bytes'];
    Float: Scalars['Float'];
    Gardeners: Gardeners;
    Gardeners_filter: Gardeners_filter;
    ID: Scalars['ID'];
    Int: Scalars['Int'];
    Query: {};
    String: Scalars['String'];
    Subscription: {};
    _Block_: _Block_;
    _Meta_: _Meta_;
}>;
export declare type entityDirectiveArgs = {};
export declare type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export declare type subgraphIdDirectiveArgs = {
    id: Scalars['String'];
};
export declare type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export declare type derivedFromDirectiveArgs = {
    field: Scalars['String'];
};
export declare type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export declare type ARBOResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ARBO'] = ResolversParentTypes['ARBO']> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    count?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    gardeners?: Resolver<Array<ResolversTypes['Gardeners']>, ParentType, ContextType, RequireFields<ARBOgardenersArgs, 'skip' | 'first'>>;
    totalGrowth?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    winner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
    name: 'BigDecimal';
}
export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
    name: 'BigInt';
}
export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
    name: 'Bytes';
}
export declare type GardenersResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Gardeners'] = ResolversParentTypes['Gardeners']> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    arbo?: Resolver<Maybe<ResolversTypes['ARBO']>, ParentType, ContextType, RequireFields<QueryarboArgs, 'id' | 'subgraphError'>>;
    arbos?: Resolver<Array<ResolversTypes['ARBO']>, ParentType, ContextType, RequireFields<QueryarbosArgs, 'skip' | 'first' | 'subgraphError'>>;
    gardeners?: Resolver<Array<ResolversTypes['Gardeners']>, ParentType, ContextType, RequireFields<QuerygardenersArgs, 'skip' | 'first' | 'subgraphError'>>;
    _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;
export declare type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
    arbo?: SubscriptionResolver<Maybe<ResolversTypes['ARBO']>, "arbo", ParentType, ContextType, RequireFields<SubscriptionarboArgs, 'id' | 'subgraphError'>>;
    arbos?: SubscriptionResolver<Array<ResolversTypes['ARBO']>, "arbos", ParentType, ContextType, RequireFields<SubscriptionarbosArgs, 'skip' | 'first' | 'subgraphError'>>;
    gardeners?: SubscriptionResolver<Array<ResolversTypes['Gardeners']>, "gardeners", ParentType, ContextType, RequireFields<SubscriptiongardenersArgs, 'skip' | 'first' | 'subgraphError'>>;
    _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;
export declare type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
    hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
    number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
    block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
    deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type Resolvers<ContextType = MeshContext> = ResolversObject<{
    ARBO?: ARBOResolvers<ContextType>;
    BigDecimal?: GraphQLScalarType;
    BigInt?: GraphQLScalarType;
    Bytes?: GraphQLScalarType;
    Gardeners?: GardenersResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Subscription?: SubscriptionResolvers<ContextType>;
    _Block_?: _Block_Resolvers<ContextType>;
    _Meta_?: _Meta_Resolvers<ContextType>;
}>;
export declare type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
    entity?: entityDirectiveResolver<any, any, ContextType>;
    subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
    derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;
export declare type MeshContext = ArboContext & BaseMeshContext;
export declare const rawServeConfig: YamlConfig.Config['serve'];
export declare function getMeshOptions(): Promise<GetMeshOptions>;
export declare function createBuiltMeshHTTPHandler(): import("@whatwg-node/server").ServerAdapter<unknown, import("itty-router").Router<Request, {}>>;
export declare function getBuiltGraphClient(): Promise<MeshInstance<MeshContext>>;
export declare const execute: ExecuteMeshFn;
export declare const subscribe: SubscribeMeshFn;
export declare function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext): {
    ExampleQuery(variables?: Exact<{
        [key: string]: never;
    }>, options?: TOperationContext): AsyncIterable<ExampleQueryQuery>;
};
export declare type ExampleQueryQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type ExampleQueryQuery = {
    arbos: Array<Pick<ARBO, 'id' | 'owner'>>;
};
export declare const ExampleQueryDocument: DocumentNode<ExampleQueryQuery, Exact<{
    [key: string]: never;
}>>;
export declare type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>;
export declare function getSdk<C, E>(requester: Requester<C, E>): {
    ExampleQuery(variables?: ExampleQueryQueryVariables, options?: C): AsyncIterable<ExampleQueryQuery>;
};
export declare type Sdk = ReturnType<typeof getSdk>;
