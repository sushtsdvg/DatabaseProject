const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Employee',
  password: 'sush',
  port: 5432,
});
const getEmployee = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM Employee ORDER BY empid ', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const createEmployee = (body) => {
  return new Promise(function(resolve, reject) {
    const { empid,firstname,lastname,department,salary,dateofbirth,age } = body
    pool.query('INSERT INTO Employee (empid,firstname,lastname,department,salary,dateofbirth,age) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *', [empid,firstname,lastname,department,salary,dateofbirth,age], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new employee has been added: ${results.rows[0]}`)
    })
  })
}
const deleteEmployee = () => {
  return new Promise(function(resolve, reject) {
    const empid = parseInt(request.params.empid)
    pool.query('DELETE FROM employee WHERE empid = $1', [empid], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Employee deleted with ID: ${empid}`)
    })
  })
}

module.exports = {
  getEmployee,
  createEmployee,
  deleteEmployee,
}