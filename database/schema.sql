psql postgres
DROP DATABASE IF EXISTS surveyordb;
DROP USER IF EXISTS dbuser;
CREATE ROLE dbuser with LOGIN PASSWORD 'password';
ALTER ROLE DBUSER CREATEDB;
\q
psql postgres -U dbuser;
CREATE DATABASE surveyorDB;
GRANT ALL PRIVILEGES ON DATABASE surveyorDB TO dbuser;
\connect surveyordb;
CREATE TABLE users (id int primary key not null, facebook_id char(50) not null);
CREATE TABLE resumes(id int primary key not null, user_id int REFERENCES users(id), keywords varchar(500) not null);
\dt

