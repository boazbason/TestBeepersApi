import e, { Request, Response } from "express";
import { testLocation } from "../services/BeeperService.js";
import { Beeper} from "../models/types.js";
import axios, { AxiosResponse } from 'axios';
import { readFromJsonFile, writeUserToJsonFile, editBeeper} from "../DAL/jsonBeepers.js"
import { log } from "console";
import {middle1} from '../middleWares/middle1.js'
import { v4 as uuidv4 } from "uuid";

const statusList =  ["manufactured",  "assembled", "shipped", "deployed", "detonatede"];


export const GetBeepers = async (req: Request, res: Response): Promise<void> => {
    try{
        const allBeepers = await readFromJsonFile();
        res.status(200).json(allBeepers);
    }
    catch{
        res.status(200).json({massage: "Eror with file"})
    }
}

export const AddBeeper = async (req: Request, res: Response): Promise<void> => {
    try{
        const newBeep: Beeper = {
            id: uuidv4(),
            name: req.body.name,
            status: "manufactured",
            created_at: new Date()
        }
        writeUserToJsonFile(newBeep);
        res.status(201).json(newBeep)
    }
    catch{
        res.status(404).json({massage: "Eror with a req"})
    }
};

export const GetSpecificBeeper = async (req: Request, res: Response): Promise<void> => {
    const allBeepers = await readFromJsonFile();
    const beeperFound = allBeepers.find((b)=>{req.params.id == b.id});
    if(!beeperFound){
        res.status(404).json({massage: "beeper not found"})
        return;
    }
    res.status(200).json(beeperFound);
}

export const UpdateBook = async (req: Request, res: Response): Promise<void> => {
    const allBeepers = await readFromJsonFile();
    const beeperFound = allBeepers.find((b)=>{req.params.id == b.id});
    if(!beeperFound){
        res.status(404).json({massage: "beeper not found"})
        return;
    }
    let index = statusList.findIndex((s)=>{s == beeperFound.status});
    //אם הסטטוס אינו האחרון יש להגדיר את הסטטוס למיקום הבא
    if(index == 4){
        res.status(400).json({massage: "the beeper killed"});
        return
    }
    if(index == 3){
        if(!testLocation(req.body.latitude, req.body.longitude)){
            res.status(400).json({massage: "location not correct"})
            return;
        }
        beeperFound.latitude = req.body.latitude;
        beeperFound.longitude = req.body.longitude;
        editBeeper(beeperFound);
        StartTimerBeeper(beeperFound.id);
    }
    beeperFound.status = statusList[index +1];
    res.status(200).json
}