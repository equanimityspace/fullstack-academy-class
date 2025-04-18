require("dotenv").config();
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgress://localhost/acme_hr"
);

const init = async () => {
  try {
    await client.connect();
    const SQL = `
            DROP TABLE IF EXISTS departments CASCADE;
            CREATE TABLE departments(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(100)
            );
            INSERT INTO departments(name) VALUES ('HR');
            INSERT INTO departments(name) VALUES ('R&D');
            INSERT INTO departments(name) VALUES ('Finance');
            INSERT INTO departments(name) VALUES ('Corporate');

            DROP TABLE IF EXISTS employees;
            CREATE TABLE employees(
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              name VARCHAR(100),
              created_at time DEFAULT CURRENT_TIMESTAMP,
              updated_at time DEFAULT CURRENT_TIMESTAMP,
              department_id UUID REFERENCES departments(id) NOT NULL  
            );
            INSERT INTO employees(name, department_id) VALUES ('Ryan', (SELECT id FROM departments WHERE name = 'HR'));
            INSERT INTO employees(name, department_id) VALUES ('Nat', (SELECT id FROM departments WHERE name = 'Corporate'));
            INSERT INTO employees(name, department_id) VALUES ('Cal', (SELECT id FROM departments WHERE name = 'R&D'));
            INSERT INTO employees(name, department_id) VALUES ('John', (SELECT id FROM departments WHERE name = 'Finance'));
        `;
    await client.query(SQL);
    await client.end();
    console.log("table seeded");
  } catch (error) {
    console.error(error);
  }
};

init();
