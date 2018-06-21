import "jest";

import * as _ from "lodash";

import { Collection, Container, Model } from "../src/mongo";

const unit = "**Unit**";
const testing = "**Testing**";
const mongo = "**Mongo**";

@Collection(unit)
class Unit extends Model<Unit> {
    name: string;
}

@Collection(testing)
class Testing extends Model<Testing> {
    name: string;
    date: Date;
}

@Collection(mongo)
class Mongo extends Model<Testing> {
    name: string;
    date: Date;
    code: number;
}

test("Testing for decorators to identify a class", async () => {
    expect(Unit.collection).toBe(unit);
    expect(Testing.collection).toBe(testing);
});

test("Test the mongodb container developed by juky", async () => {
    let repository: Container = new Container("mongodb://localhost:27017/npm");
    try {
        await repository.addModels([Unit, Testing]);

        let dummy: Testing = { name: "asdfasdfafdas", date: new Date() };

        let result = await Testing.insertOne(dummy);

        expect(result.result.ok).toBe(1);
    } catch (reason) {
        fail(reason.message);
    } finally {
        await repository.close();
    }
});

test("Test the mongodb container upserts developed by juky", async () => {
    let repository: Container = new Container("mongodb://localhost:27017/npm");
    try {
        await repository.addModels([Mongo]);

        let result = await Mongo.remove({}); //Remove all documents
        expect(result.result.ok).toBe(1);

        let dummyArray: Array<Mongo> = [
            { name: "object0", date: new Date(), code: 5 },
            { name: "object1", date: new Date(), code: 6 }
        ];
        let dummy: Mongo = { name: "object2", date: new Date(), code: 7 };

        result = await Mongo.insertMany(dummyArray);
        expect(result.result.ok).toBe(1);

        let finalResult = await Mongo.updateMany(_.head(dummyArray), {
            $set: { name: "objectX" }
        });

        expect(finalResult.result.ok).toBe(1);

        finalResult = await Mongo.updateOne(dummy, { $set: dummy });

        expect(finalResult.result.ok).toBe(1);

        let objects = await Mongo.findAll({});
        expect(objects).toHaveLength(3);
    } catch (reason) {
        fail(reason.message);
    } finally {
        await repository.close();
    }
});
