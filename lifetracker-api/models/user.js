// const bcrypt = require("bcrypt");
// const db = require("../db");
// const { BadRequestError, UnauthorizedError } = require("../utils/errors");
// const config = require("../config")
// const jwt = require("jsonwebtoken");


// class User {
//     static login = async (email, password) => {
//         try {
//             // Check if the email entered by the user exists in the DB
//             const getUserQuery = `
//                 SELECT * FROM users
//                 WHERE email = $1
//             `;
    
//             // Execute the query using db instead of pool
//             const result = await db.query(getUserQuery, [email]);
    
//             // Store the user data returned from the query
//             const user = result.rows[0];
    
//             if (!user) {
//                 throw new UnauthorizedError("User not found");
//             }
    
//             // Check if the password entered is correct
//             const isPasswordValid = await bcrypt.compare(password, user.password);
    
//             if (!isPasswordValid) {
//                 throw new UnauthorizedError("Invalid password");
//             }
    
//             // optional to remove password before returning user
//             delete user.password;
//             return user;
//         } catch (error) {
//             throw error;
//         }
//     };
    
    


//     static register = async (username, password, first_name, last_name, email) => {
//         // handle email exists in database
//         const user = await this.fetchUserByEmail(email);
//         if (user) throw new BadRequestError("Email already in use."); 

//         //encrypt password
//         try {
//             //generate salt for password encryption
//             const saltRounds = config.BCRYPT_WORK_FACTOR
//             const salt = await bcrypt.genSalt(saltRounds)

//             //hash the password/apply hash and salt to password
//             const hashPassword = await bcrypt.hash(password, salt);

//             //create a user; making it so that new user can be added to table
//             const createdUserQuery = `
//             INSERT INTO users (username, password, first_name, last_name, email)
//             VALUES ($1, $2, $3, $4, $5)
//             RETURNING *`;

//             //ASSIGN PARAMS TO VALUE ARRAY
//             const values = [username, hashPassword, first_name, last_name, email];
//             const result = await db.query(createdUserQuery, values);

//             // created new user in users table
//             const createdUser = result.rows[0];
        
//             return createdUser;
//         } catch (err) {
//             console.error("There was an error registering user", err.message);
//             throw new BadRequestError("Error registering user.");
//         }
        
    
//     };

//     static fetchUserByUsername = async (username) => {
//         const sqlQueryFindUser = `
//             SELECT * FROM users
//             WHERE username = $1`;
            
//         const userResult = await db.query(sqlQueryFindUser, [username]);
//         const user = userResult.rows[0];
//         return user;
//     };
    


//     // search database for given user and returns if exists
//     static fetchUserByEmail = async (email) => {
//         const sqlQueryFindUser = `
//         SELECT * FROM users
//         WHERE email = $1`

//             // query the user from db
//     const userResult = await db.query(sqlQueryFindUser, [email]);

//     //store user data from query
//     const user = userResult.rows[0];
//     return user
        

//     }


// };

// module.exports = User

const bcrypt = require("bcrypt");
const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const config = require("../config");
const jwt = require("jsonwebtoken");

class User {
    static makeJwtToken = (user) => {
        const payload = { userId: user.id, userName: user.name };
        const token = jwt.sign(payload, "secret-key-unique", { expiresIn: "24h" });

        return token;
    }

    static login = async (email, password) => {
        try {
            const getUserQuery = `
                SELECT * FROM users
                WHERE email = $1
            `;
    
            const result = await db.query(getUserQuery, [email]);
            const user = result.rows[0];
    
            if (!user) {
                throw new UnauthorizedError("User not found");
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (!isPasswordValid) {
                throw new UnauthorizedError("Invalid password");
            }
    
            const token = this.makeJwtToken(user);

            delete user.password;
            return { user, token };
        } catch (error) {
            throw error;
        }
    };

    static register = async (username, password, first_name, last_name, email) => {
        const user = await this.fetchUserByEmail(email);
        if (user) throw new BadRequestError("Email already in use."); 

        try {
            const saltRounds = config.BCRYPT_WORK_FACTOR;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashPassword = await bcrypt.hash(password, salt);

            const createdUserQuery = `
                INSERT INTO users (username, password, first_name, last_name, email)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`;

            const values = [username, hashPassword, first_name, last_name, email];
            const result = await db.query(createdUserQuery, values);

            const createdUser = result.rows[0];
            const token = this.makeJwtToken(createdUser);

            return { user: createdUser, token };
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

    static fetchUserByEmail = async (email) => {
        const sqlQueryFindUser = `
            SELECT * FROM users
            WHERE email = $1`;

        const userResult = await db.query(sqlQueryFindUser, [email]);
        const user = userResult.rows[0];
        return user;
    };
};

module.exports = User;


