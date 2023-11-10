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
exports.CsvExportService = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_1 = require("csv");
const path_1 = __importDefault(require("path"));
class CsvExportService {
    constructor() {
    }
    exportCSV(res, columns, data, fileName, formatters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader(`Content-Disposition`, `attachment:filename=${fileName}`);
                const writeCSV = yield this.writeCSV(columns, data, fileName, formatters);
                //     await setTimeout(()=>{
                //          res.status(200).download(writeCSV,fileName,(error)=>{
                //             if(error){
                //                 fs.unlinkSync(writeCSV);
                //                 res.status(500).json(error);
                //             }else{
                //                 fs.unlinkSync(writeCSV);
                //             }
                //         });
                //     },1000);
                // } catch (error) {
                //     res.status(500).json(error)
                // }
                yield res.status(200).download(writeCSV, fileName, (error) => {
                    if (error) {
                        fs_1.default.unlinkSync(writeCSV);
                        res.status(500).json(error);
                    }
                    else {
                        fs_1.default.unlinkSync(writeCSV);
                    }
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
            return;
        });
    }
    writeCSV(columns, data, fileName, formatters) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const stringifier = yield (0, csv_1.stringify)({ header: true, columns });
                const writableStream = yield fs_1.default.createWriteStream(fileName, { encoding: 'utf-8', flags: 'a' });
                stringifier.pipe(writableStream);
                stringifier.on('finish', () => {
                    const pathString = path_1.default.join(__dirname, '..', '..', fileName);
                    resolve(pathString);
                });
                stringifier.on('error', (error) => {
                    console.log(error);
                    reject(error);
                });
                let keys = [];
                if (formatters) {
                    keys = Object.keys(formatters);
                }
                try {
                    if (formatters) {
                        for (let i = 0; i < data.length; i++) {
                            let row = data[i];
                            row = this.modifyRow(row, formatters);
                            if (!stringifier.write(row)) {
                                yield new Promise(resolve => stringifier.once('drain', resolve));
                            }
                            if (i === data.length - 1) {
                                setTimeout(() => {
                                    stringifier.end();
                                }, 500);
                            }
                        }
                    }
                    else {
                        for (let i = 0; i <= data.length; i++) {
                            let row = data[i];
                            if (i !== data.length) {
                                if (!stringifier.write(row)) {
                                    yield new Promise(resolve => stringifier.once('drain', resolve));
                                }
                            }
                            if (i === data.length) {
                                setTimeout(() => {
                                    stringifier.end();
                                }, 500);
                            }
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    modifyRow(row, formatters) {
        let keys = [];
        keys = Object.keys(formatters);
        if (keys.length > 0) {
            const dataKeys = Object.keys(row);
            dataKeys.forEach((ele) => {
                const foundKey = keys.find((key) => key === ele);
                if (foundKey) {
                    const formatter = formatters[foundKey];
                    row[foundKey] = formatter(row[foundKey]);
                }
            });
            return row;
        }
        else {
            return row;
        }
    }
}
exports.CsvExportService = CsvExportService;
//# sourceMappingURL=CsvExportService.js.map