const bcrypt = require("bcrypt");
const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const config = require("../config")

class User {
    static login = async (username, password) => {

        // check that username exists in database
        const emailExists = this.fetchUserByEmail(email);
        if (!emailExists) throw new UnauthorizedError;

    };


    static register = async (username, password, first_name, last_name, email) => {
        // handle email exists in database
        // const user = await this.fetchUserByEmail(email);
        // if (user) throw new BadRequestError 

        //encrypt password
        try {
            //generate salt for password encryption
            const saltRounds = config.BCRYPT_WORK_FACTOR
            const salt = await bcrypt.genSalt(saltRounds)

            //hash the password/apply hash and salt to password
            const hashPassword = await bcrypt.hash(password, salt);

            //create a user; making it so that new user can be added to table
            const createdUserQuery = `
            INSERT INTO users (username, password, first_name, last_name, email)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;

            //ASSIGN PARAMS TO VALUE ARRAY
            const values = [username, hashPassword, first_name, last_name, email];
            const result = await db.query(createdUserQuery, values);

            // created new user in users table
            const createdUser = result.rows[0];
        
            return createdUser;
        } catch (err) {
            console.error("There was an error registering user", err)
            throw new BadRequestError(err)
        }
    
    };


    // search database for given user and returns if exists
    static fetchUserByEmail = async (email) => {
        const sqlQueryFindUser = `
        SELECT * FROM users
        WHERE email = $1`

            // query the user from db
    const userResult = await db.query(sqlQueryFindUser, [email]);

    //store user data from query
    const user = result.rows[0];
    return user
        

    }


};

module.exports = User
