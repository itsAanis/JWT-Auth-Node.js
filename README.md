# JWT-Auth-Node.js
## Introduction

A Simple application to demonstrate JWT authorisation  made in Node.js using express and mongoose. heavily commented so that anyone can follow along and make it their own.





## Install all the dependencies or node packages used for development via Terminal

    npm install






## Things to add

- Create a .envfile and add the following as key = value
- dburi = (your database connection string goes here)
-     Replace <password> in the string with your password
- If you want a custom database name (recommended), add the database name between mongodb.net/ and the ? in the string. Example: mongodb.net/BasicFullStackMVC?
-  Save!

 whilst this app comes with everything else it does require you to make a secret this can be done in the terminal.
run node
then type 
  ``` javascript
      require('crypto').randomBytes(64).toString('hex') 
  ```
  
then in the .env file use it as the value for ACCESS_TOKEN_SECRET
