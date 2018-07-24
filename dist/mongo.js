"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const mongodb_1 = require("mongodb");
class Model {
    static createIndex(fieldOrSpec, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                let collection = self.client.db().collection(self.collection);
                if (options && options.name) {
                    let exists = yield collection.indexExists(options.name);
                    if (exists)
                        return Promise.resolve("");
                    else
                        collection.createIndex(fieldOrSpec, options);
                }
                return collection.createIndex(fieldOrSpec, options);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static dropIndex(indexName, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .dropIndex(indexName, options);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static findAll(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .find(query, options)
                    .toArray();
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static findOne(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .findOne(query, options);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static insertOne(document, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .insertOne(document, options);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static insertMany(documents, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .insertMany(documents, options);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static updateOne(query, newUpdateValues, options = { upsert: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .updateOne(query, newUpdateValues, options);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static updateMany(query, newUpdateValues, options = { upsert: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .updateOne(query, newUpdateValues, options);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static remove(document, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .remove(document, options);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static distinct(key, document, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .distinct(key, document, options);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
}
exports.Model = Model;
class Container {
    constructor(uri, options = { loggerLevel: "error" }) {
        this.uri = uri;
        this.options = options;
    }
    addModels(models) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = yield mongodb_1.MongoClient.connect(this.uri, this.options);
            return Promise.all(_.map(models, model => {
                model.client = this.client;
                return Promise.resolve();
            }));
        });
    }
    close() {
        mongodb_1.Logger.reset();
        return this.client.close(true);
    }
}
exports.Container = Container;
exports.Collection = (collection) => {
    return (target) => {
        target.collection = collection;
    };
};
//# sourceMappingURL=mongo.js.map