"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("./handlers/user");
var router = (0, express_1.Router)();
router.get('/user/:id', user_1.getUser);
router.post('/user', user_1.createNewUser);
exports.default = router;
//# sourceMappingURL=router.js.map