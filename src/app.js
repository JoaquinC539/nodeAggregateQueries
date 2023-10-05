"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
// const express=require("express")
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors = require('cors');
const Routes_1 = require("./routes/Routes");
const Cors_1 = require("./conf/Cors");
class App {
    constructor(port) {
        this.express = (0, express_1.default)();
        this.port = 3500;
        this.routes = new Routes_1.Routes();
        this.cors = new Cors_1.Cors();
        this.port = port;
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
        this.express.use(body_parser_1.default.json());
        this.express.use(cors(this.cors));
        this.express.use("/api", express_1.default.static(path_1.default.join(__dirname, 'public')));
        this.express.use('/api', this.routes.routes);
        this.express.set('view engine', 'ejs');
        this.express.set('views', path_1.default.join(__dirname, 'views'));
    }
    getPort() {
        return Number(this.port);
    }
    serverCreate(port) {
        return new Promise((resolve, reject) => {
            try {
                this.express.listen(port, () => {
                    console.log("Server listenting at localhost:" + port);
                    resolve();
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.App = App;
