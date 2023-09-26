"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
require('dotenv').config();
const dbConf_1 = require("./conf/dbConf");
class Index {
    constructor(port) {
        this.port = 3500;
        this.port = port;
    }
    getPort() {
        return Number(this.port);
    }
    connectDB() {
        const dbCon = new dbConf_1.DbConf(String(process.env.DBURI));
        dbCon.connectDB();
    }
}
exports.Index = Index;
const index = new Index(Number(process.env.PORT));
index.connectDB();
