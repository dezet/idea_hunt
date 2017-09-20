"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("mocha");
const chai = require("chai");
const utils_1 = require("./utils/utils");
const expect = utils_1.setupChai(chai);
describe('ControllerFactory', () => {
    describe('getController returns proper controller with dependencies', () => __awaiter(this, void 0, void 0, function* () {
    }));
    describe('getController on non existing controller throws error', () => __awaiter(this, void 0, void 0, function* () {
    }));
});
