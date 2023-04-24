CREATE DATABASE IF NOT EXISTS dbappmensajes;

USE dbappmensajes;

CREATE TABLE IF NOT EXISTS users(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

SHOW TABLES;

DESCRIBE users;

SELECT * FROM users;

CREATE TABLE IF NOT EXISTS publication(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    publication VARCHAR(255) NOT NULL,
    created_by INT(11) NOT NULL,
    FOREIGN KEY(created_by) REFERENCES users(id)
);

SHOW TABLES;

DESCRIBE publication;

ALTER TABLE publication ADD reply INT(11) not null;