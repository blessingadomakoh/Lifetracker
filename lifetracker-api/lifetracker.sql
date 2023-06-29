\echo 'You are about to delete the lifetracker database'
\prompt 'Return for yes or ctrl-c to cancel >' res

--dropping database

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;

--connecting to database
\c lifetracker

-- run schema script
\i lifetracker-schema.sql

\echo 'You are about to delete the lifetracker_test database'
\prompt 'Return for yes or ctrl-c to cancel >' res

--dropping database
DROP DATABASE lifetracker_test;
CREATE DATABASE lifetracker_test;

--connecting to database
\c lifetracker_test

-- run schema script
\i lifetracker-schema.sql