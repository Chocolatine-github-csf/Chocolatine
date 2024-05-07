const mongoose = require('mongoose');
const userCommentSchema = require('./schema/userCommentSchema');

const UserComments = mongoose.model('userComment', userCommentSchema);
module.exports = UserComments;