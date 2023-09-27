"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const path_1 = __importDefault(require("path"));
class IndexController {
    constructor(expressInstance) {
        this.express = expressInstance;
    }
    index(req, res) {
        const name = "John";
        const admin = false;
        const items = ["pizza", "almonds", "sugar", "tomatoes", "Bananas"];
        res.render('index/index', { name, admin, items });
        // res.sendFile(path.join(__dirname,'..','views','index','index.html'));
    }
    js(req, res) {
        res.sendFile(path_1.default.join(__dirname, '..', 'views', 'index', 'index.js'));
        // res.sendFile('./index/index.js')
    }
    css(req, res) {
        res.sendFile(path_1.default.join(__dirname, '..', 'views', 'index', 'index.css'));
    }
}
exports.IndexController = IndexController;
