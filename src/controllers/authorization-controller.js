import { userIdOfEntry} from "../models/entry-model.js";
import {selectUserLevelById} from "../models/user-model.js";

const ownerOfEntry = async (userId, entryId, entryTopic) => {
  try {
    const ownerUserId = await userIdOfEntry(entryId, entryTopic);
    if (ownerUserId === userId) {
      return true;
    } else {
      throw new Error("forbidden");
    }
  } catch (error) {
    console.log('Error: ownerOfEntry: ', error.message);
    throw new Error(error.message);
  }
}

const isAdmin = async (userId) => {
  try {
    const userLevel = await selectUserLevelById(userId);

    if (userLevel === 'admin') {
      return true;
    } else {
      throw new Error ('forbidden')
    }
  } catch (error) {
    console.log('Error: isAdmin: ', error.message);
    throw new Error(error.message);
  }
}


export {ownerOfEntry, isAdmin};
