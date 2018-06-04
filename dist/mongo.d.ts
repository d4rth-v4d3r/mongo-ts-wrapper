import { MongoClient, FilterQuery, InsertOneWriteOpResult, InsertWriteOpResult } from "mongodb";
export declare class Model<T extends Model<T>> {
    static client: MongoClient;
    static collection: string;
    _id?: string;
    static findAll<T extends Model<T>>(this: new () => T, query: FilterQuery<T>): Promise<Array<T>>;
    static findOne<T extends Model<T>>(this: new () => T, query: FilterQuery<T>): Promise<T>;
    static insertOne<T extends Model<T>>(this: new () => T, document: T): Promise<InsertOneWriteOpResult>;
    static insertMany<T extends Model<T>>(this: new () => T, documents: Array<T>): Promise<InsertWriteOpResult>;
}
export declare class Container {
    private uri;
    private client;
    constructor(uri: string, logLevel?: string);
    addModels(models: Array<typeof Model>): Promise<any>;
    close(): Promise<any>;
}
export declare const Collection: (collection: string) => (target: typeof Model) => void;
