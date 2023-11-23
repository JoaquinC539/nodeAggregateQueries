"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseSchema = exports.sealed = void 0;
const mongoose_1 = require("mongoose");
function sealed(target, somethingElse) {
    console.log("Target", target);
    console.log("Something", somethingElse);
}
exports.sealed = sealed;
function MongooseSchema(target, type) {
    const collection = target.prototype.collection;
    const schema = new mongoose_1.Schema(Object.assign({ _id: { type: mongoose_1.Schema.Types.Mixed } }, target.prototype.properties));
    target.prototype.model = (0, mongoose_1.model)(target.name, schema, collection);
}
exports.MongooseSchema = MongooseSchema;
//# sourceMappingURL=Decorators.js.map