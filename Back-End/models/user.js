const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "pm", "developer"]
    },
    reports: {
        type: Array
    }
}));

function validateReport(req) {
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(10).max(255).required(),
        estimation: Joi.string().min(1).required(),
        spent: Joi.string().min(1).required(),
        id: Joi.string().min(10),
        status: Joi.string()
    };

    return Joi.validate(req, schema);
}

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().valid("admin", "pm", "developer").required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateReport = validateReport;
