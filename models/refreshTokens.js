const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

var RefreshTokens = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshTokens;