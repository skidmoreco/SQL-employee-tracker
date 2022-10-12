SELECT
    e.id AS ID,
    e.first_name AS First,
    e.last_name AS Last,
    r.salary AS Salary,
    r.title AS Title,
    d.department_name AS Department

    -- JOIN employee to itself
FROM employee e
LEFT JOIN employee m
    ON e.manager_id = m.id

    -- JOIN roles to employee table
LEFT JOIN roles r
    ON e.role_id = r.title

    -- JOIN department to roles table
LEFT JOIN department d
    ON r.department_id = d.id



    