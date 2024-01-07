"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("./handlers/user");
var notes_1 = require("./handlers/notes");
var router = (0, express_1.Router)();
router.get('/user/:id', user_1.getUser);
router.post('/user', user_1.createNewUser);
router.get('/notes', notes_1.getDiaryEntries);
exports.default = router;
//# sourceMappingURL=router.js.map