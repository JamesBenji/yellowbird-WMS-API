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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseDB = void 0;
/**
 * if a '' path is provided on save,
 * INTENT: create a document in the base collection with firestore auto-id
 * OTHERWISE: create a client-name document in the base collection or nested collection
 */
const firebase_admin_1 = require("firebase-admin");
class FirebaseDB {
    constructor(collectionName) {
        this.basePath = collectionName;
    }
    resolveRef(path) {
        const fullPath = this.basePath ? `${this.basePath}/${path}` : path;
        return (0, firebase_admin_1.firestore)().doc(fullPath);
    }
    save(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ref = path ?
                    this.resolveRef(path) :
                    (0, firebase_admin_1.firestore)().collection(this.basePath).doc();
                yield ref.set(data);
                return ref.id;
            }
            catch (error) {
                throw new Error(`Save failed: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    findById(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ref = this.resolveRef(path);
                const snapshot = yield ref.get();
                return snapshot.exists ? snapshot.data() : null;
            }
            catch (error) {
                throw new Error(`Find failed: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    update(path, partialData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ref = this.resolveRef(path);
                yield ref.update(partialData);
            }
            catch (error) {
                throw new Error(`Update failed: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ref = this.resolveRef(path);
                yield ref.delete();
            }
            catch (error) {
                throw new Error(`Delete failed: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
}
exports.FirebaseDB = FirebaseDB;
