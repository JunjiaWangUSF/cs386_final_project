import { mongo } from "./credentials.js";
import mongoose from "mongoose"; // Use ES6 import for mongoose

const connString = mongo.connectionString;

const connectDB = function (blnOpen, cb) {
  if (blnOpen) {
    //If true, open database connection
    mongoose.connect(connString).then(
      //Callback functions
      function () {
        //Success
        let conn = mongoose.connection;
        console.log(
          `Database is connected on ${new Date().toLocaleString()}: ${
            conn.host
          }:${conn.port} @ ${conn.name}`
        );
        if (cb) cb(); //Invoking callback function here ,if passed into this function
      },
      function (err) {
        //Error
        console.log("Problem while connecting database " + err);
      }
    );
  } else {
    //Close connection
    mongoose.connection.close().then(
      //Callback functions
      function () {
        //Success
        console.log(
          `MongoDB connection closed on ${new Date().toLocaleString()}`
        );
        if (cb) cb(); //Invoking callback function here ,if passed into this function
      },
      function (err) {
        //Error
        console.log("Problem while closing database " + err);
      }
    );
  }
};

export default connectDB;
