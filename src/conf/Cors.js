"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cors = void 0;
const allowedOrigins = require("./allowedOrigins/allowedOrigins.json");
class Cors {
    constructor() {
        this.allowedOrigins = allowedOrigins.allowedOrigins;
        this.setAllowedOrigins();
    }
    setAllowedOrigins() {
        this.corsOptions = {
            origin: function (origin, callback) {
                if (this.allowedOrigins.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                }
                else {
                    callback(new Error("Not allowed by CORS"));
                }
            }
        };
    }
}
exports.Cors = Cors;
//# sourceMappingURL=Cors.js.map