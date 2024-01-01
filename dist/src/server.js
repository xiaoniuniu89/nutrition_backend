"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./modules/auth");
// import { createNewUser, signin } from "./handlers/user";
var app = (0, express_1.default)();
var consoleUrl = function (req, res, next) {
    console.log(req.method + " " + req.url);
    next();
};
// app.use(consoleUrl);
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", auth_1.protect, router_1.default);
app.get("/", function (req, res) {
    return res.json({
        endpoints: {
            root: "/",
            createUser: "/user",
            signIn: "/signin",
            api: "/api",
        },
    });
});
// app.post("/user", createNewUser);
// app.post("/signin", signin);
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500);
    res.json({ error: err.message });
});
exports.default = app;
//# sourceMappingURL=server.js.map