import * as _ from "lodash";

import {
    CollectionInsertOneOptions,
    CommonOptions,
    FilterQuery,
    FindOneOptions,
    IndexOptions,
    InsertOneWriteOpResult,
    InsertWriteOpResult,
    Logger,
    MongoClient,
    MongoClientOptions,
    ObjectID,
    ReplaceOneOptions,
    UpdateWriteOpResult,
    WriteOpResult,
    FindOneAndReplaceOption,
    FindAndModifyWriteOpResultObject,
    CollectionAggregationOptions,
    AggregationCursor
} from "mongodb";

export class Model<T extends Model<T>> {
    public static client: MongoClient;
    public static collection: string;
    public _id?: ObjectID;

    static async drop(options?: any): Promise<any> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .drop(options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async createIndex<T extends Model<T>>(
        this: new () => T,
        fieldOrSpec: any,
        options?: IndexOptions
    ): Promise<string> {
        let self: typeof Model = this as any;

        try {
            let collection = self.client.db().collection(self.collection);

            return collection.createIndex(fieldOrSpec, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async dropIndex<T extends Model<T>>(
        this: new () => T,
        indexName: string,
        options?: CommonOptions & { maxTimeMS?: number }
    ): Promise<string> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .dropIndex(indexName, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async findAll<T extends Model<T>>(
        this: new () => T,
        query: FilterQuery<T>,
        options?: FindOneOptions
    ): Promise<Array<T>> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .find(query, options)
                .toArray();
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async findOne<T extends Model<T>>(
        this: new () => T,
        query: FilterQuery<T>,
        options?: FindOneOptions
    ): Promise<T> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .findOne(query, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async insertOne<T extends Model<T>>(
        this: new () => T,
        document: T,
        options?: CollectionInsertOneOptions
    ): Promise<InsertOneWriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .insertOne(document, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async insertMany<T extends Model<T>>(
        this: new () => T,
        documents: Array<FilterQuery<T> | T>,
        options?: CollectionInsertOneOptions
    ): Promise<InsertWriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .insertMany(documents, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async updateOne<T extends Model<T>>(
        this: new () => T,
        query: FilterQuery<T>,
        newUpdateValues: Object,
        options: ReplaceOneOptions = { upsert: true }
    ): Promise<UpdateWriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .updateOne(query, newUpdateValues, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async findOneAndUpdate<T extends Model<T>>(
        this: new () => T,
        query: FilterQuery<T>,
        newUpdateValues: Object,
        options: FindOneAndReplaceOption = {
            upsert: true,
            returnOriginal: false
        }
    ): Promise<FindAndModifyWriteOpResultObject> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .findOneAndUpdate(query, newUpdateValues, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async aggregate<T extends Model<T>>(
        this: new () => T,
        pipeline: Object[],
        options: CollectionAggregationOptions
    ): Promise<AggregationCursor> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .aggregate(pipeline, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async updateMany<T extends Model<T>>(
        this: new () => T,
        query: FilterQuery<T>,
        newUpdateValues: Object,
        options: ReplaceOneOptions = { upsert: true }
    ): Promise<UpdateWriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .updateOne(query, newUpdateValues, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async remove<T extends Model<T>>(
        this: new () => T,
        document: FilterQuery<T>,
        options?: CommonOptions
    ): Promise<WriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .remove(document, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async distinct<T extends Model<T>>(
        this: new () => T,
        key: string,
        document: FilterQuery<T>,
        options?: object
    ): Promise<WriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .distinct(key, document, options);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }
}

export class Container {
    private client: MongoClient;

    constructor(
        private uri: string,
        private options: MongoClientOptions = { loggerLevel: "error" }
    ) {}

    public async addModels(models: Array<typeof Model>): Promise<any> {
        this.client = await MongoClient.connect(this.uri, this.options);
        return Promise.all(
            _.map(models, model => {
                model.client = this.client;
                return Promise.resolve();
            })
        );
    }

    public close(): Promise<any> {
        Logger.reset();
        return this.client.close(true);
    }

    public async drop(): Promise<any> {
        return this.client.db().dropDatabase();
    }
}

export const Collection = (collection: string) => {
    return (target: typeof Model) => {
        target.collection = collection;
    };
};
