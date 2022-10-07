DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DEC(10, 0) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id);
    
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY(id),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id),
    REFERENCES roles(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id);
);
 