const mongoose = require('mongoose');

const ConnectDB = async()=>{
    try {
        const {connection} = await mongoose.connect(process.env.DB_URL)
        console.log(`MOngoDB is connected at:${connection.host}`.cyan.underline.bold)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}

module.exports = ConnectDB;

