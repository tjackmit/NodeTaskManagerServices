import firebase from '../util/firebase.js';
import { decrypt, encrypt } from '../util/encryptDecrypt.js';
import User from '../Models/userModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';


const db = getFirestore(firebase);

const firstNameRegEx = /^([A-Z])\w+/gsi;
const lastNameRegEx = /^([A-Z])\w+/gsi;
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gsi;
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/gsi;
const roleTitleRegEx = /^.{1,64}$/gsi;
const teamIDRegEx = /^([a-z0-9]{5,})$/;
const taskIDRegEx = /^([a-z0-9]{5,})$/;
const ISO8601RegEx = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d$/;

const userNotFoundMessage = 'user not found';
const nameInvalidMessage = 'name data is invalid.';
const emailInvalidMessage = 'email data is invalid.';
const passwordInvalidMessage = 'password data is invalid.';
const roleTitleInvalidMessage = 'role or title data is invalid.';
const teamIdInvalidMessage = 'team id is invalid.';
const taskIdInvalidMessage = 'task id is invalid.';
const dateTimeInvalidMessage = 'dateTime is invalid.';

const dataValidation = (data, regExString, message, res) => {
    if(!data.match(regExString)) {
        res.status(400).send(message);
        return;
    }
}

export const createUser = async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    // const password = decrypt(req.body.password);
    const password = req.body.password;
    const roleTitle = req.body.roleTitle;
    const team = req.body.team;
    const tasks = req.body.tasks;


    // validate request data

    if(firstName && firstName != '') {
        dataValidation(firstName, firstNameRegEx, nameInvalidMessage, res);
        if (res.status == 400){
            return;
        }
    }
    if(lastName && lastName != '') {
        dataValidation(lastName, lastNameRegEx, nameInvalidMessage, res);
        if (res.status == 400){
            return;
        }
    }
    if(email && email != '') {
        dataValidation(email, emailRegEx, emailInvalidMessage, res);
        if (res.status == 400){
            return;
        }
    }
    if(password && password != '') {
        dataValidation(password, passwordRegEx, passwordInvalidMessage, res);
        if (res.status == 400){
            return;
        }
    }
    if(roleTitle && roleTitle != '') {
        dataValidation(roleTitle, roleTitleRegEx, roleTitleInvalidMessage, res);
        if (res.status == 400){
            return;
        }
    }
    if(team && team.length && team.length > 0) {
        for (let i = 0; i < team.length; i++) {
            let teamId = team[i];
            dataValidation(teamId, teamIDRegEx, teamIdInvalidMessage, res);
            if (res.status == 400){
                return;
            }
        }
    }
    if(tasks && tasks.length && tasks.length > 0) {
        for (let i = 0; i < tasks.length; i++) {
            let taskId = tasks[i];
            dataValidation(taskId, taskIDRegEx, taskIdInvalidMessage, res);
            if (res.status == 400){
                return;
            }
        }
    }

    const data = req.body;

    try {      
      await addDoc(collection(db, 'Users'), data);
      res.status(200).send('user created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getDocs(collection(db, 'Users'));
        const userArray = [];

        if (users.empty) {
        res.status(400).send('No users found');
        } else {
        users.forEach((doc) => {
            const deletedOn = doc.data().deletedOn;
            if (!deletedOn || deletedOn == '') {
                const user = new User(
                doc.id,
                doc.data().firstName,
                doc.data().lastName,
                doc.data().email,
                doc.data().password,
                doc.data().roleTitle,
                doc.data().team,
                doc.data().tasks,
                doc.data().createdOn,
                doc.data().modifiedOn,
                doc.data().deletedOn,
                );
                userArray.push(user);
            }
        });

        res.status(200).send(userArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getUserById = async (req, res, next) => {
    const id = req.params.userId;

    if (id == null) {
        res.status(400).send(error.message);
    }

    try {
        const user = doc(db, 'Users', id);
        const data = await getDoc(user);
        if (data.exists()) {
        res.status(200).send(data.data());
        } else {
        res.status(404).send(userNotFoundMessage);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const updateUserById = async (req, res, next) => {
    const id = req.params.userId;

    const user = doc(db, 'Users', id);
    const userData = await getDoc(user);
    if (!userData.exists()) {
        res.status(404).send(userNotFoundMessage);
        return;
    }

    const data = req.body;

    try {
    const user = doc(db, 'Users', id);
    await updateDoc(user, data);
    res.status(200).send('user has been updated successfully');
    } catch (error) {
    res.status(400).send(error.message);
    }
};

export const softDeleteUserById = async (req, res, next) => {
    const id = req.params.userId;
    const deletedOn = req.body.deletedOn;

    const user = doc(db, 'Users', id);
    const userData = await getDoc(user);
    if (!userData.exists()) {
        res.status(404).send(userNotFoundMessage);
        return;
    }
    if(!deletedOn || deletedOn == '') {
        res.status(400).send(dateTimeInvalidMessage);
        return;
    } else {
        dataValidation(deletedOn, ISO8601RegEx, dateTimeInvalidMessage, res);
        if (res.status == 400){
            return;
        }
    }

    const data = req.body;

    try {
        await updateDoc(user, data);
        res.status(200).send('user has been soft deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const HardDeleteUserById = async (req, res, next) => {
    const id = req.params.userId;

    const user = doc(db, 'Users', id);
    const userData = await getDoc(user);
    if (!userData.exists()) {
        res.status(404).send(userNotFoundMessage);
        return;
    }

    try {
      await deleteDoc(doc(db, 'Users', id));
      res.status(200).send('user has been hard deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};
