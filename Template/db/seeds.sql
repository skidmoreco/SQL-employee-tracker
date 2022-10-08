INSERT INTO roles (id, title, salary, department)
VALUES (001, "Lead Engineer", "150000, Engineering"),
       (002, "Software Engineer", "120000", "Engineering"),
       (003, "Account Manager", "160000", "Finance"),
       (004, "Accountant", "125000", "Finance"),
       (005, "Legal Team Lead", "250000", "Legal"),
       (006, "Lawyer", "190000", "Legal");

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES (001, Shahid, Hashmi, Software Engineer, "012"),
       (002, Dimitra, Anastaspolous, Lead Engineer, "null"),
       (003, Nick, Mason, Account Manager, "013"),
       (004, Lindsey, Allen, Accountant, "null"),
       (005, Aaron, King, Legal Team Lead, "014"),
       (006, Kelly, Sullivan, Lawyer, "null"), 
