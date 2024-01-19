const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
    licenseName: {
        type: Number,
        required : true,
        trim : true,
    },
    licenseImageUrl : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    }
})

const License = mongoose.model('license', licenseSchema);
module.exports = License;