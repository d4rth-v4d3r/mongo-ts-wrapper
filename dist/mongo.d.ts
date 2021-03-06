import { CollectionInsertOneOptions, CommonOptions, FilterQuery, FindOneOptions, IndexOptions, InsertOneWriteOpResult, InsertWriteOpResult, MongoClient, MongoClientOptions, ObjectID, ReplaceOneOptions, UpdateWriteOpResult, WriteOpResult, FindOneAndReplaceOption, FindAndModifyWriteOpResultObject, CollectionAggregationOptions, AggregationCursor } from "mongodb";
export declare class Model<T extends Model<T>> {
    static client: MongoClient;
    static collection: string;
    _id?: ObjectID;
    static drop(options?: any): Promise<any>;
    static createIndex<T extends Model<T>>(this: new () => T, fieldOrSpec: any, options?: IndexOptions): Promise<string>;
    static dropIndex<T extends Model<T>>(this: new () => T, indexName: string, options?: CommonOptions & {
        maxTimeMS?: number;
    }): Promise<string>;
    static findAll<T extends Model<T>>(this: new () => T, query: FilterQuery<T>, options?: FindOneOptions): Promise<Array<T>>;
    static findOne<T extends Model<T>>(this: new () => T, query: FilterQuery<T>, options?: FindOneOptions): Promise<T>;
    static insertOne<T extends Model<T>>(this: new () => T, document: T, options?: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult>;
    static insertMany<T extends Model<T>>(this: new () => T, documents: Array<FilterQuery<T> | T>, options?: CollectionInsertOneOptions): Promise<InsertWriteOpResult>;
    static updateOne<T extends Model<T>>(this: new () => T, query: FilterQuery<T>, newUpdateValues: Object, options?: ReplaceOneOptions): Promise<UpdateWriteOpResult>;
    static findOneAndUpdate<T extends Model<T>>(this: new () => T, query: FilterQuery<T>, newUpdateValues: Object, options?: FindOneAndReplaceOption): Promise<FindAndModifyWriteOpResultObject>;
    static aggregate<T extends Model<T>>(this: new () => T, pipeline: Object[], options: CollectionAggregationOptions): Promise<AggregationCursor>;
    static updateMany<T extends Model<T>>(this: new () => T, query: FilterQuery<T>, newUpdateValues: Object, options?: ReplaceOneOptions): Promise<UpdateWriteOpResult>;
    static remove<T extends Model<T>>(this: new () => T, document: FilterQuery<T>, options?: CommonOptions): Promise<WriteOpResult>;
    static distinct<T extends Model<T>>(this: new () => T, key: string, document: FilterQuery<T>, options?: object): Promise<WriteOpResult>;
}
export declare class Container {
    private uri;
    private options;
    private client;
    constructor(uri: string, options?: MongoClientOptions);
    addModels(models: Array<typeof Model>): Promise<any>;
    close(): Promise<any>;
    drop(): Promise<any>;
}
export declare const Collection: (collection: string) => (target: typeof Model) => void;
