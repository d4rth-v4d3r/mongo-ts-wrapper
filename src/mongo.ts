import * as _ from "lodash";

import {
    FilterQuery,
    InsertOneWriteOpResult,
    InsertWriteOpResult,
    Logger,
    MongoClient,
    ObjectID,
    UpdateWriteOpResult,
    WriteOpResult
} from "mongodb";

export class Model<T extends Model<T>> {
    public static client: MongoClient;
    public static collection: string;
    public _id?: ObjectID;

    static async findAll<T extends Model<T>>(
        this: new () => T,
        query: FilterQuery<T>
    ): Promise<Array<T>> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .find(query)
                .toArray();
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async findOne<T extends Model<T>>(
        this: new () => T,
        query: FilterQuery<T>
    ): Promise<T> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .findOne(query);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async insertOne<T extends Model<T>>(
        this: new () => T,
        document: T
    ): Promise<InsertOneWriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .insertOne(document);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async insertMany<T extends Model<T>>(
        this: new () => T,
        documents: Array<T>
    ): Promise<InsertWriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .insertMany(documents);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async updateOne<T extends Model<T>>(
        this: new () => T,
        query: FilterQuery<T>,
        newUpdateValues: Object
    ): Promise<UpdateWriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .updateOne(query, newUpdateValues, { upsert: true });
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async updateMany<T extends Model<T>>(
        this: new () => T,
        query: FilterQuery<T>,
        newUpdateValues: Object
    ): Promise<UpdateWriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .updateOne(query, newUpdateValues, { upsert: true });
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async remove<T extends Model<T>>(
        this: new () => T,
        document: FilterQuery<T>
    ): Promise<WriteOpResult> {
        let self: typeof Model = this as any;

        try {
            return self.client
                .db()
                .collection(self.collection)
                .remove(document);
        } catch (reason) {
            return Promise.reject(reason);
        }
    }
}

export class Container {
    private client: MongoClient;

    constructor(private uri: string, logLevel: string = "debug") {
        this.client = new MongoClient(this.uri);
        Logger.setLevel(logLevel);
        Logger.filter("class", ["Server"]);
    }

    public async addModels(models: Array<typeof Model>): Promise<any> {
        this.client = await this.client.connect();
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
}

export const Collection = (collection: string) => {
    return (target: typeof Model) => {
        target.collection = collection;
        console.log(`Binding collection ${target}`);
    };
};
