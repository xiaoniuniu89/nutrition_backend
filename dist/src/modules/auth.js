"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = exports.hashPassword = exports.comparePasswords = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt = __importStar(require("bcrypt"));
var jwt_1 = require("next-auth/jwt");
var SECRET = process.env.NEXTAUTH_SECRET;
// returns true if password matches hash
var comparePasswords = function (password, hash) {
    return bcrypt.compare(password, hash);
};
exports.comparePasswords = comparePasswords;
var hashPassword = function (password) {
    return bcrypt.hash(password, 5);
};
exports.hashPassword = hashPassword;
var createJWT = function (user) {
    var token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
var protect = function (req, res, next) {
    var bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).json({ message: "Not authorized/No header" });
    }
    var _a = bearer.split(" "), token = _a[1];
    if (!token) {
        return res.status(401).json({ message: "Not authorized/No Token" });
    }
    try {
        var payload = (0, jwt_1.getToken)({ req: req, secret: SECRET });
        console.log("PAYLOAD ", payload);
        req.user = payload;
        next();
    }
    catch (e) {
        console.error(e);
        return res.status(401).json({ message: "Not authorized/Invalid Token" });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map