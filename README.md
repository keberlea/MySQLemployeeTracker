
  # mySQL Employee Tracker
  
  ![badge](https://img.shields.io/badge/License-MIT-yellow.svg)
  

  ## Description
  This code is a Node.js application that allows the user to interact with a MySQL database using the command line interface. It uses the Inquirer package to display a menu with different options, such as viewing all departments, adding a new department, updating an employee role, and more. The user's input is then used to execute corresponding SQL queries on the database, and the results are displayed back to the user using the console.table package. The application requires the dotenv package to access the username and password for the MySQL database from an environment file. The code also requires the mysql2 package to establish a connection to the database, and the db/connection.js file exports the connection object.

  ## Table of Contents
   - [Description](#Description)
   - [Installation](#Installation)
   - [Usage](#Usage)
   - [License](#License)
   - [Contributing](#Contributing)
   - [Tests](#Tests)
   - [Questions](#Questions)

  ## Installation
  Must utilize Node.js and require Inquirer (version 8.2.4)  and MySQL.

  ## Usage
  Start with creating a .env file to update MySQL connection username and password in the following format: <br>

      USER="youruserhere"
      PASSWORD="yourpasswordhere"
  <br>
  Then npm install and npm start to intialize application.
  <br><br>


  [Link to screen recording of functional application](https://drive.google.com/file/d/1djlYROH2pCBwfFgAmXxnMVHKKtyBymqt/view)
  <br><br>

  <b>Screenshots of application functionality:</b><br><br>
  <img src="Assets/first5prompts.png" width="500" />
  <img src="Assets/second5prompts.png" width="500" />
  <img src="Assets/rmvEmpRole.png" width="500" />
  <img src="Assets/rmvDepBudget.png" width="500" />


  ## License 
  
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/https://opensource.org/licenses/MIT)

  This application is covered by the MIT license.
  
  ## Contributing
  Suggestions are always welcomed.

  ## Tests
  not applicable

  ## Questions
  Link to GitHub profile: https://github.com/keberlea
  
  If you have questions you can reach me by email at the following address: alicia.keberle@gmail.com
  