INSERT INTO department (department_name)
VALUES ("Engineering"),
       ("Finance"), 
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 125000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shahid", "Hashmi", 1, 1),
       ("Dimitra", "Anastaspolous", 1, null),
       ("Nick", 'Mason', 2, 3),
       ("Lindsey", "Allen", 2, null),
       ("Aaron", "King", 3, 5),
       ("Kelly", "Sullivan", 3, null); 
