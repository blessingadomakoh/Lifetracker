const { PORT, SECRET_KEY, BCRYPT_WORK_FACTOR, IS_TESTING, getDatabaseUri } = require('./config');

describe("config.js", () => {

  test("process.env.NODE_ENV is test", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });

  test("IS_TESTING should be true", () => {
    expect(IS_TESTING).toBe(true);
  });

  test("PORT should be exported", () => {
    expect(PORT).toBeDefined();
  });

  test("SECRET_KEY should be exported", () => {
    expect(SECRET_KEY).toBeDefined();
  });

  test("BCRYPT_WORK_FACTOR should be exported", () => {
    expect(BCRYPT_WORK_FACTOR).toBeDefined();
  });

  test("getDatabaseUri should be exported and a function", () => {
    expect(getDatabaseUri).toBeDefined();
    expect(typeof getDatabaseUri).toBe('function');

    if (IS_TESTING) {
      expect(getDatabaseUri()).toBe('lifetracker_test');
    } else if (process.env.DATABASE_URL) {
      expect(getDatabaseUri()).toBe(process.env.DATABASE_URL);
    } else {
      expect(getDatabaseUri()).toContain('postgresql://');
    }
  });

});
