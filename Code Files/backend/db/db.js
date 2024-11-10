// db/db.ts
import mongoose from 'mongoose';

const initializeDatabase = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/intern")
        .then(() => {
            console.log(`MongoDB is connected`);
            resolve(); // Resolve the promise if the connection is successful
        })
        .catch((error) => {
            console.error(`MongoDB connection error: ${error}`);
            reject(error); // Reject the promise if there's an error
        });
    });
}

export default initializeDatabase;
