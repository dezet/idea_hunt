"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setupChai(chai) {
    const chaiHttp = require('chai-http');
    const chaiAsPromised = require("chai-as-promised");
    chai.use(chaiAsPromised);
    chai.use(chaiHttp);
    chai.config.includeStack = true;
    return chai.expect;
}
exports.setupChai = setupChai;
