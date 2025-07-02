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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
mongoose_1.default.connect('mongodb+srv://suchitnegi:47M7NzCvubjHxogX@100xdev.ijylxgs.mongodb.net/brainly');
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const alreadyAccount = yield db_1.userModel.findOne({ email: email });
    if (alreadyAccount) {
        res.json({
            message: "account already exist"
        });
    }
    bcrypt_1.default.hash(password, 2, function (err, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.userModel.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash
            });
        });
    });
    res.json({ message: "signup is done" });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.userModel.findOne({ email: email });
    console.log("user", user);
    if (!user) {
        res.json({
            message: "user not found"
        });
    }
    let match = false;
    if (user === null || user === void 0 ? void 0 : user.password) {
        match = yield bcrypt_1.default.compare(password, user.password);
    }
    if (!match) {
        res.json({ message: "password incorrect" });
    }
    const token = jsonwebtoken_1.default.sign({
        email: email,
        userId: user === null || user === void 0 ? void 0 : user._id,
    }, 'secret', { expiresIn: '1h' });
    res.json({
        message: "login",
        token: token
    });
}));
app.post("/api/v1/content", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link } = req.body;
    yield db_1.contentModel.create({
        title: title,
        link: link,
        //@ts-ignore
        userId: req.userId,
    });
    res.json({
        message: "content posted"
    });
}));
app.get("/api/v1/content", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield db_1.contentModel.find({ userId: userId }).populate("userId", "firstName lastName");
    res.json({
        message: "content fetched",
        content: content
    });
}));
app.delete("/api/v1/content", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.query.contentId;
    yield db_1.contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "deleted content"
    });
}));
app.post("/api/v1/brainly/share", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const hash = (0, utils_1.randomStringGenerator)(10);
        yield db_1.linkModel.create({
            hash: hash,
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "/share/" + hash
        });
        return;
    }
    else {
        yield db_1.linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        console.log("linked removed");
        // res.json({
        //     message: "removed link"
        // })
        return;
    }
}));
app.delete("/api/v1/content", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.query.contentId;
    yield db_1.contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "deleted content"
    });
}));
function main() {
    app.listen(9090);
    console.log("BE running in 9090");
}
main();
