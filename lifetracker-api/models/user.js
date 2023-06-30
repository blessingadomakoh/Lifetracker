const bcrypt = require("bcrypt");
const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const config = require("../config")

class User {
    static login = async (username, password) => {
        // check that username exists in database
        const usernameExists = await this.fetchUserByUsername(username);
        if (!usernameExists) {
            throw new UnauthorizedError();
        }
    };
    


    static register = async (username, password, first_name, last_name, email) => {
        // handle email exists in database
        const user = await this.fetchUserByEmail(email);
        if (user) throw new BadRequestError("Email already in use."); 

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
            console.error("There was an error registering user", err.message);
            throw new BadRequestError("Error registering user.");
        }
        
    
    };

    static fetchUserByUsername = async (username) => {
        const sqlQueryFindUser = `
            SELECT * FROM users
            WHERE username = $1`;
            
        const userResult = await db.query(sqlQueryFindUser, [username]);
        const user = userResult.rows[0];
        return user;
    };
    


    // search database for given user and returns if exists
    static fetchUserByEmail = async (email) => {
        const sqlQueryFindUser = `
        SELECT * FROM users
        WHERE email = $1`

            // query the user from db
    const userResult = await db.query(sqlQueryFindUser, [email]);

    //store user data from query
    const user = userResult.rows[0];
    return user
        

    }


};

module.exports = User
