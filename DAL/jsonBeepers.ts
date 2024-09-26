import jsonfile from 'jsonfile';
import { Beeper } from '../models/types';

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';


export const writeUserToJsonFile = async (beeper: Beeper): Promise<void> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  beepers.push(beeper);
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};

export const readFromJsonFile = async (): Promise<Beeper[]> => {
  const users: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  return users;
};

export const editBeeper = async (beeper: Beeper): Promise<void> => {
  const users: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  const index = users.findIndex((b) => b.id === beeper.id);
  if (index !== -1) {
    users[index] = beeper;
    await jsonfile.writeFile(DB_FILE_PATH, users);
  }
};
