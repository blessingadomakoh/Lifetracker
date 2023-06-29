const bycrypt = require("bycrypt");
const db = require("../db/");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
    static login = async (username, password) => {
        // check that username exists in database
        const emailExists = this.fetchUserByEmail(email);

        if (!emailExists) throw UnauthorizedError;
    };


    static register = async (first_name, last_name, email, password) => {
        // handle email exists in database
        if (this.fetchUserByEmail(email)) throw BadRequestError;
    };


    // search database for given user and returns if exists
    static fetchUserByEmail = async (email) => {
        const sqlQueryFindUser = `
        SELECT * FROM users
        WHERE email = $1`

    }

    // query the user from db
    // const userResult = await db.
};
