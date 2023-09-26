"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
// const express=require("express")
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
class App {
    constructor(port) {
        this.express = (0, express_1.default)();
        this.port = 3500;
        this.port = port;
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
        this.express.use(body_parser_1.default.json());
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
