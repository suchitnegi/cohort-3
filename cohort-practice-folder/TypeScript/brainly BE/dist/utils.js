"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomStringGenerator = void 0;
const randomStringGenerator = (len) => {
    let fakeString = "oifadshgfljsadgjwarjg23421423t409876";
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += fakeString[Math.floor(Math.random() * fakeString.length)];
    }
    return ans;
};
exports.randomStringGenerator = randomStringGenerator;
