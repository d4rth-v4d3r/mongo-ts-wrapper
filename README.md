This packages provides the following classes to use in Typescript (under the hood we use the native mongo javascript client):

```javascript
import { Collection, Container, Model } from "mongo-ts-wrapper";
```

Simply instance your mongo context with:

```javascript
let repository: Container = new Container("mongodb://localhost:27017/database"); //Use your database uri
```

Write your models with annotations:

```javascript
@Collection("user") //The name of your collection in mongo
class User extends Model<User> {
    name: string;
    password: string;
}

@Collection("roles")
class Role extends Model<Role> {
    name: string;
    type: string;
}
```

Add your models to your repository:

```javascript
await repository.addModels([User, Role]);  //This is a promise, be careful!
```

And use your models wherever you need:

```javascript
let result = await User.insertOne({email: "john.doe@mail.com", password: "123"});  //This is a promise

if(result.result.ok)
  doSomethingCool();

let user = await User.findOne({email: "john.doe@mail.com"})
```

Current implemented methods, completely compatible with native javascript mongo client behaviour:

1.  findOne
2.  findAll
3.  insertOne
4.  insertMany
5.  updateOne //with default upserts
6.  updateMany //with default upserts
7.  remove
8.  distinct
