const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    hId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    }
}, { timestamps: true });

var Hospitals = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospitals;

