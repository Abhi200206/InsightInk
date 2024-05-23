"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payload = exports.Post = exports.signinobj = exports.signupobj = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupobj = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
    name: zod_1.default.string().optional(),
});
exports.signinobj = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
exports.Post = zod_1.default.object({
    title: zod_1.default.string(),
    post: zod_1.default.string(),
});
exports.payload = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
    id: zod_1.default.string()
});
