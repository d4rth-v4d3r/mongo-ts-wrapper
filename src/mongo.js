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
const mongodb_1 = require("mongodb");
const _ = require("lodash");
class Model {
    static findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .find(query)
                    .toArray();
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .findOne(query);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static insertOne(document) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .insertOne(document);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static insertMany(documents) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                return self.client
                    .db()
                    .collection(self.collection)
                    .insertMany(documents);
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
}
exports.Model = Model;
class Container {
    constructor(uri) {
        this.uri = uri;
        this.client = new mongodb_1.MongoClient(this.uri);
    }
    addModels(models) {
        return Promise.all(_.map(models, (model) => __awaiter(this, void 0, void 0, function* () {
            model.client = yield this.client.connect();
            return Promise.resolve();
        })));
    }
}
exports.Container = Container;
exports.Collection = (collection) => {
    return (target) => {
        target.collection = collection;
        console.log(`Binding collection ${target}`);
    };
};
//# sourceMappingURL=mongo.js.map