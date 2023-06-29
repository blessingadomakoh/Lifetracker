require('dotenv').config();

const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || 'my-secret-key';
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 12;
const IS_TESTING = process.env.NODE_ENV === 'test';

function getDatabaseUri() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (IS_TESTING) {
    return 'lifetracker_test';
  }

  // Combine other environment variables to construct the database URI
  return `postgresql://${    process.env.DATABASE_USER}:${process.env.DATABASE_PASS
    }@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
}

module.exports = {
  PORT,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  IS_TESTING,
  getDatabaseUri,
};
