# Northcoders News API

Northcoders News is a back-end API server which serves as a user-interactive news database.

If you wish to clone my project and run it locally, please do the following in order to successfully connect to the databases:
1. You will need to create two .env files:
.env.test
.env.development
2. Into each, add PGDATABASE= with the correct database name for that environment
(see /db/setup.sql for the database names). Double check that these .env files are .gitignored.
3.You'll need to run npm install at this point.
4. Ensure your project seed files are present and the tables you're intending to create have been written when you create your database.
5. (Optional) Inside each of your data folders you're intending to export, create an index.js file and ensure that the index.js file exports an object with values of the data from that folder with their respective keys.