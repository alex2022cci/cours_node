const Mongoose = require('mongoose');

const localDB = 'mongodb://127.0.0.1:27017/roleAuth';

const connectDB = async () => {
    try {
        await Mongoose.connect(localDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    };
/* Le module d'export */
module.exports = connectDB;