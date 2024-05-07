const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    feedback: {
        type: Boolean,
        required: true,
    },
    messageId:{
        type: String,
        required: true,
    }
});

module.exports = feedbackSchema;