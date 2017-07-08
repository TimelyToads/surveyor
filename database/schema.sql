
psql postgres
DROP DATABASE IF EXISTS surveyordb;
DROP USER IF EXISTS dbuser;
CREATE ROLE dbuser with LOGIN PASSWORD 'password';
ALTER ROLE DBUSER CREATEDB;
\q
psql postgres -U dbuser;
CREATE DATABASE "surveyorDB";

GRANT ALL PRIVILEGES ON DATABASE "surveyorDB" TO dbuser;
\connect "surveyorDB";
\dt

