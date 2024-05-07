const userComments = require('~/models/UserComments');

const UserCommentController = {
    createUserComment: async (req, res) => {
        try{
            const { comments } = req.body;
            console.log("Comment: " + comments)
            const newComment = new userComments({ comments: comments});
            await newComment.save();
            res.status(200).send(newComment);
        }
        catch(err){
            console.log(err);
        }
    },
    getUserComments: async (req, res) => {
        try{
            const comments = await userComments.find();
            res.status(200).send(comments);
        }
        catch(err){
            console.log(err);
        }
    },
}

module.exports = UserCommentController;