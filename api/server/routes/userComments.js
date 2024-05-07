const express = require('express');
const router = express.Router();


const {requireJwtAuth} = require('../middleware');
const UserCommentController = require('../controllers/UserCommentController');

router.use(requireJwtAuth);

router.post('/', requireJwtAuth, UserCommentController.createUserComment);

router.get('/all', requireJwtAuth, UserCommentController.getUserComments);



module.exports = router;