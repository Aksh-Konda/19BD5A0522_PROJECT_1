const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ventilatorSchema = new Schema({
    hId: {
        type: String,
        required: true
    },
    ventilatorId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: ['occupied', 'available', 'in-maintenance']
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

var Ventilators = mongoose.model('Ventilator', ventilatorSchema);

module.exports = Ventilators;



const test = {
    hId : "H1",
    ventilatorId : "H1V5",
    status : "occupied",
    name : "Apollo hospital"
};
