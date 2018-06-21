"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const _ = require("lodash");
const mongo_1 = require("../src/mongo");
const unit = "**Unit**";
const testing = "**Testing**";
const mongo = "**Mongo**";
let Unit = class Unit extends mongo_1.Model {
};
Unit = __decorate([
    mongo_1.Collection(unit)
], Unit);
let Testing = class Testing extends mongo_1.Model {
};
Testing = __decorate([
    mongo_1.Collection(testing)
], Testing);
let Mongo = class Mongo extends mongo_1.Model {
};
Mongo = __decorate([
    mongo_1.Collection(mongo)
], Mongo);
test("Testing for decorators to identify a class", () => __awaiter(this, void 0, void 0, function* () {
    expect(Unit.collection).toBe(unit);
    expect(Testing.collection).toBe(testing);
}));
test("Test the mongodb container developed by juky", () => __awaiter(this, void 0, void 0, function* () {
    let repository = new mongo_1.Container("mongodb://localhost:27017/npm");
    try {
        yield repository.addModels([Unit, Testing]);
        let dummy = { name: "asdfasdfafdas", date: new Date() };
        let result = yield Testing.insertOne(dummy);
        expect(result.result.ok).toBe(1);
    }
    catch (reason) {
        fail(reason.message);
    }
    finally {
        yield repository.close();
    }
}));
test("Test the mongodb container upserts developed by juky", () => __awaiter(this, void 0, void 0, function* () {
    let repository = new mongo_1.Container("mongodb://localhost:27017/npm");
    try {
        yield repository.addModels([Mongo]);
        let result = yield Mongo.remove({}); //Remove all documents
        expect(result.result.ok).toBe(1);
        let dummyArray = [
            { name: "object0", date: new Date(), code: 5 },
            { name: "object1", date: new Date(), code: 6 }
        ];
        let dummy = { name: "object2", date: new Date(), code: 7 };
        result = yield Mongo.insertMany(dummyArray);
        expect(result.result.ok).toBe(1);
        let finalResult = yield Mongo.updateMany(_.head(dummyArray), {
            $set: { name: "objectX" }
        });
        expect(finalResult.result.ok).toBe(1);
        finalResult = yield Mongo.updateOne(dummy, { $set: dummy });
        expect(finalResult.result.ok).toBe(1);
        let objects = yield Mongo.findAll({});
        expect(objects).toHaveLength(3);
    }
    catch (reason) {
        fail(reason.message);
    }
    finally {
        yield repository.close();
    }
}));
//# sourceMappingURL=mongo.test.js.map