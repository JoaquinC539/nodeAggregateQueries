"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
require('dotenv').config();
const dbConf_1 = require("./conf/dbConf");
const app_1 = require("./app");
class Index {
    constructor(port) {
        this.port = 3500;
        this.app = new app_1.App();
        this.dbCon = new dbConf_1.DbConf();
        this.port = port;
        this.app = new app_1.App(port);
        this.dbCon = new dbConf_1.DbConf(process.env.DBURI);
    }
    getPort() {
        return Number(this.port);
    }
    connect() {
        this.app.serverCreate(this.getPort())
            .then(() => {
            this.dbCon.connectDB();
        })
            .catch((error) => { console.log(error); });
    }
}
exports.Index = Index;
const index = new Index(Number(process.env.PORT));
index.connect();
//# sourceMappingURL=index.js.map