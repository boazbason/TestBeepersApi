var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonBeepers.js";
import { v4 as uuidv4 } from "uuid";
const statusList = ["manufactured", "assembled", "shipped", "deployed", "detonatede"];
export const GetBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBeepers = yield readFromJsonFile();
        res.status(200).json(allBeepers);
    }
    catch (_a) {
        res.status(200).json({ massage: "Eror with file" });
    }
});
export const AddBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBeep = {
            id: uuidv4(),
            name: req.body.name,
            status: "manufactured",
            created_at: new Date()
        };
        writeUserToJsonFile(newBeep);
        res.status(201).json(newBeep);
    }
    catch (_a) {
        res.status(404).json({ massage: "Eror with a req" });
    }
});
export const DeleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
export const UpdateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
