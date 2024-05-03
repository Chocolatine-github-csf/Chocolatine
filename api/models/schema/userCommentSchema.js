const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userCommentSchema = new Schema({
    comments: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = userCommentSchema;
