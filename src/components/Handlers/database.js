// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const myRemindersDB = openDatabase({name: 'MyReminders.db'});
const remindersTableName = 'reminders';
const prioritiesTableName = 'priorities';
const remindersprioritiesTableName = 'reminders_priorities';

module.exports = {
    // declare function that will create the reminders table
    createRemindersTable: async function () {
        // declare a transaction that will execute a SQL statement
        (await myRemindersDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${remindersTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    description TEXT,
                    date TEXT
                );`,
                // arguments needed when using an SQL prepared statement
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log('Reminders table created successfully');
                },
                error => {
                    console.log('Error creating reminders table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row into the reminders table
    addReminder: async function (title, description, date) {
        // declare a transaction that will execute an SQL statement
        (await myRemindersDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `INSERT INTO ${remindersTableName} (title, description, date) VALUES ("${title}", "${description}", "${date}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log(title + " added successfully");
                },
                error => {
                    console.log('Error adding reminder ' + error.message);
                },
            );
        });
    },

    // declare function that will create the priorities table
    createPrioritiesTable: async function () {
        // declare a transaction that will execute a SQL statement
        (await myRemindersDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${prioritiesTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    description TEXT
                );`,
                // arguments needed when using an SQL prepared statement
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log('Priorities table created successfully');
                },
                error => {
                    console.log('Error creating priorities table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row into the reminders table
    addPriority: async function (title, description) {
        // declare a transaction that will execute an SQL statement
        (await myRemindersDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `INSERT INTO ${prioritiesTableName} (title, description) VALUES ("${title}", "${description}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log(title + " added successfully");
                },
                error => {
                    console.log('Error adding priority ' + error.message);
                },
            );
        });
    },

    // declare function that will create the lists table
    createRemindersRrioritiesTableName: async function () {
        // declare a transaction that will execute a SQL statement
        (await myRemindersDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${remindersprioritiesTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    reminders_id INTEGER,
                    priorities_id INTEGER
                );`,
                // arguments needed when using an SQL prepared statement
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log('Reminders priorities table created sucessfully');
                },
                error => {
                    console.log('Error creating reminders priorities table ' + error.message);
                },
            );
        });
    },

     // declare functions that will insert a row into the list items table
     addReminderPriority: async function (reminders_id, priorities_id) {
        // declare a transaction that will execute an SQL statement
        (await myRemindersDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `INSERT INTO ${remindersprioritiesTableName} (reminders_id, priorities_id) VALUES (${reminders_id}, ${priorities_id})`,
                // argument passed when using SQL prepared statements
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log("Reminder Priority added sucessfully");
                },
                error => {
                    console.log('Error adding reminder priority' + error.message);
                },
            );
        });
    },
};