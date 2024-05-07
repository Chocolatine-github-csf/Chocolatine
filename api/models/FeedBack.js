
const feedbackSchema = require('../models/schema/feedback');
const mongoose  = require('mongoose');

const FeedBack = mongoose.model('FeedBack', feedbackSchema);
module.exports = FeedBack;