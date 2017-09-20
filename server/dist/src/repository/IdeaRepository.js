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
class IdeaRepository {
    constructor(database) {
        this._database = database;
    }
    createMany(t) {
        throw new Error("Method not implemented.");
    }
    create(t) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._database.knex.transaction((trs) => __awaiter(this, void 0, void 0, function* () {
                const ids = yield trs
                    .insert(t)
                    .into('ideas');
                if (ids.length > 0)
                    t.id = ids[0];
                return t;
            }));
        });
    }
    update(pt) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._database.knex.transaction((trs) => __awaiter(this, void 0, void 0, function* () {
                yield trs('ideas').where({ id: pt.id }).update(pt);
                let tmp = yield trs('ideas').select().where({ id: pt.id });
                return tmp[0];
            }));
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._database.knex.transaction((trs) => __awaiter(this, void 0, void 0, function* () {
                return yield trs('ideas').select();
            }));
        });
    }
    find(pt) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._database.knex.transaction((trs) => __awaiter(this, void 0, void 0, function* () {
                const tmpEntity = yield trs('ideas').select().where(pt);
                return tmpEntity.length == 0 ? null : tmpEntity[0];
            }));
        });
    }
    delete(t) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._database.knex.transaction((trs) => __awaiter(this, void 0, void 0, function* () {
                //!! -> smart way to convert 1 to boolean in typescript ;)
                return !!(yield trs('ideas').where({ id: t.id }).del());
            }));
        });
    }
}
exports.IdeaRepository = IdeaRepository;
