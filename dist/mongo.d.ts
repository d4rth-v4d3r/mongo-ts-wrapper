import { CollectionInsertOneOptions, CommonOptions, FilterQuery, FindOneOptions, InsertOneWriteOpResult, InsertWriteOpResult, MongoClient, ObjectID, ReplaceOneOptions, UpdateWriteOpResult, WriteOpResult } from "mongodb";
export declare class Model<T extends Model<T>> {
    static client: MongoClient;
    static collection: string;
    _id?: ObjectID;
    static findAll<T extends Model<T>>(this: new () => T, query: FilterQuery<T>, options?: FindOneOptions): Promise<Array<T>>;
    static findOne<T extends Model<T>>(this: new () => T, query: FilterQuery<T>, options?: FindOneOptions): Promise<T>;
    static insertOne<T extends Model<T>>(this: new () => T, document: T, options?: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult>;
    static insertMany<T extends Model<T>>(this: new () => T, documents: Array<FilterQuery<T> | T>, options?: CollectionInsertOneOptions): Promise<InsertWriteOpResult>;
    static updateOne<T extends Model<T>>(this: new () => T, query: FilterQuery<T>, newUpdateValues: Object, options?: ReplaceOneOptions): Promise<UpdateWriteOpResult>;
    static updateMany<T extends Model<T>>(this: new () => T, query: FilterQuery<T>, newUpdateValues: Object, options?: ReplaceOneOptions): Promise<UpdateWriteOpResult>;
    static remove<T extends Model<T>>(this: new () => T, document: FilterQuery<T>, options?: CommonOptions): Promise<WriteOpResult>;
    static distinct<T extends Model<T>>(this: new () => T, key: string, document: FilterQuery<T>, options?: object): Promise<WriteOpResult>;
}
export declare class Container {
    private uri;
    private client;
    constructor(uri: string, logLevel?: string);
    addModels(models: Array<typeof Model>): Promise<any>;
    close(): Promise<any>;
}
export declare const Collection: (collection: string) => (target: typeof Model) => void;
