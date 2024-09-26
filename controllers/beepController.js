var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { testLocation, StartTimerBeeper, statusList } from "../services/BeeperService.js";
import { readFromJsonFile, writeUserToJsonFile, editBeeper, DeleteBeeperFromDB } from "../DAL/jsonBeepers.js";
import { v4 as uuidv4 } from "uuid";
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
export const GetSpecificBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBeepers = yield readFromJsonFile();
    const beeperFound = allBeepers.find((b) => req.params.id == b.id);
    if (!beeperFound) {
        res.status(404).json({ massage: "beeper not found" });
        return;
    }
    res.status(200).json(beeperFound);
});
export const UpdateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBeepers = yield readFromJsonFile();
    const beeperFound = allBeepers.find((b) => req.params.id == b.id);
    if (!beeperFound) {
        res.status(404).json({ massage: "beeper not found" });
        return;
    }
    let index = statusList.findIndex((s) => s == beeperFound.status);
    //אם הסטטוס אינו האחרון יש להגדיר את הסטטוס למיקום הבא
    if (index == 4) {
        res.status(400).json({ massage: "the beeper killed" });
        return;
    }
    if (index == 2) {
        if (!testLocation(req.body.latitude, req.body.longitude)) {
            res.status(400).json({ massage: "location not correct" });
            return;
        }
        beeperFound.latitude = req.body.latitude;
        beeperFound.longitude = req.body.longitude;
        editBeeper(beeperFound);
        StartTimerBeeper(beeperFound);
    }
    beeperFound.status = statusList[index + 1];
    editBeeper(beeperFound);
    res.status(200).json({ massage: "the status update" });
});
export const DeleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //בדיקה האם קיים ביפר כזה
    try {
        const allBeepers = yield readFromJsonFile();
        const bipperFound = allBeepers.find((b) => b.id == req.params.id);
        DeleteBeeperFromDB(bipperFound);
        res.send("ok");
    }
    catch (_a) {
        res.status(200).json({ massage: "bipper not found" });
    }
});
export const GetByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBeepers = yield readFromJsonFile();
        const newBeepers = allBeepers.filter((b) => b.status == req.params.status);
        res.status(200).json(newBeepers);
    }
    catch (_a) {
        res.status(200).json({ massage: "Eror with file" });
    }
});
