import { Schema,model } from "mongoose"

export function sealed(target:Function,somethingElse:any){
    console.log("Target",target)
    console.log("Something",somethingElse)
}

export function MongooseSchema(target:Function,type:any){
    const collection=target.prototype.collection
    const schema=new Schema({
        _id:{type:Schema.Types.Mixed},
        ...target.prototype.properties
    });
    target.prototype.model=model(target.name,schema,collection);
}