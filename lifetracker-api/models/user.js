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

    static createNutrition = async ({name, category, calories, image_url, user_id}) => {
        try {
            const query = `
                INSERT INTO nutrition (name, category, calories, image_url, user_id) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *`;
    
            const result = await db.query(query, [name, category, calories, image_url, user_id]);
            return result.rows[0];
        } catch (error) {
            console.error("Error creating nutrition record: ", error);
            throw new BadRequestError("Error creating nutrition record.");
        }
    };
    
    static fetchNutritionById = async (id) => {
        try {
            const query = `SELECT * FROM nutrition WHERE id = $1`;
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching nutrition record: ", error);
            throw new BadRequestError("Error fetching nutrition record.");
        }
    };

    static updateNutrition = async ({id, name, category, calories, image_url}) => {
        try {
            const query = `
                UPDATE nutrition 
                SET name = $1, category = $2, calories = $3, image_url = $4 
                WHERE id = $5 
                RETURNING *`;
    
            const result = await db.query(query, [name, category, calories, image_url, id]);
            return result.rows[0];
        } catch (error) {
            console.error("Error updating nutrition record: ", error);
            throw new BadRequestError("Error updating nutrition record.");
        }
    };

    static deleteNutrition = async (id) => {
        try {
            const query = `DELETE FROM nutrition WHERE id = $1 RETURNING *`;
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error("Error deleting nutrition record: ", error);
            throw new BadRequestError("Error deleting nutrition record.");
        }
    }; 
    
    static getAllNutrition = async (user_id) => {
        try {
            const query = `SELECT * FROM nutrition WHERE user_id = $1`;
            const result = await db.query(query, [user_id]);
            return result.rows;
        } catch (error) {
            console.error("Error fetching all nutrition records: ", error);
            throw new BadRequestError("Error fetching all nutrition records.");
        }
    };
    
    
    
};

module.exports = User;


