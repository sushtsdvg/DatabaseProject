import React, {useState, useEffect} from 'react';
function App() {
  const [employees, setEmployees] = useState(false);
  useEffect(() => {
    getEmployee();
  }, []);
  function getEmployee() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setEmployees(data)
      });
  }
  function createEmployee() {
    let empid = prompt('Enter Employee id');
    let firstname = prompt('Enter Employee Firstname');
    let lastname=prompt('Enter Employee lastname');
    let department=prompt('Enter Employee department');
    let salary=prompt('Enter Employee salary');
    let dateofbirth=prompt("Enter Employee Date of birth");
    let age=prompt('Enter age of the Employee');
    fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({empid,firstname,lastname,department,salary,dateofbirth,age}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getEmployee();
      });
  }
  function deleteEmployee() {
    let empid = prompt('Enter employee id');
    fetch(`http://localhost:3001/employees/${empid}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getEmployee();
      });
  }
  return (
    <div>
      {employees ? employees : 'There is no employee data available'}
      <br />
      <button onClick={createEmployee}>Add Employee</button>
      <br />
      <button onClick={deleteEmployee}>Delete Employee</button>
      <br/>
      <button onClick={getEmployee}>Get Employee</button>
    </div>
  );
}
export default App;