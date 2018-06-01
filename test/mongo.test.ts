import "jest";
import { Collection, Model, Container } from "../src/mongo";

const unit = "**Unit**";
const testing = "**Testing**";

@Collection(unit)
class Unit extends Model<Unit> {
    name: string;
}

@Collection(testing)
class Testing extends Model<Testing> {
    name: string;
    date: Date;
}

test("Testing for decorators to identify a class", async () => {
    expect(Unit.collection).toBe(unit);
    expect(Testing.collection).toBe(testing);
});

test("Test the mongodb container developed by juky", async () => {
    let repository: Container = new Container(
        "mongodb://172.23.186.104:27017/npm"
    );
    await repository.addModels([Unit, Testing]);

    let dummy: Testing = { name: "asdfasdfafdas", date: new Date() };

    let result = await Testing.insertOne(dummy);

    expect(result.result.ok).toBe(1);
});
