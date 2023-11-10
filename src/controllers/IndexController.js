"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const path_1 = __importDefault(require("path"));
class IndexController {
    constructor(expressInstance) {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const name = "John";
            const admin = false;
            const items = ["pizza", "almonds", "sugar", "tomatoes", "Bananas"];
            res.render('index/index', { name, admin, items });
            // res.sendFile(path.join(__dirname,'..','views','index','index.html'));
        });
        this.js = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.sendFile(path_1.default.join(__dirname, '..', 'views', 'index', 'index.js'));
            // res.sendFile('./index/index.js')
        });
        this.css = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.sendFile(path_1.default.join(__dirname, '..', 'views', 'index', 'index.css'));
        });
    }
}
exports.IndexController = IndexController;
//# sourceMappingURL=IndexController.js.map