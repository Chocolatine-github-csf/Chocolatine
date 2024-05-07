const FeedBack = require('~/models/FeedBack');

const FeedBackController = {
    createFeedBack: async (req, res) => {
        try{
            const { feedback, message, messageId } = req.body;
            const feedbackExists = await FeedBack.findOne({ messageId });
            if(feedbackExists){
                console.log("feedback Exists");
                const updatedFeedback = await FeedBack.findOneAndUpdate({ messageId: messageId }, { feedback: feedback }, { new: true });
                res.status(201).send(updatedFeedback);
            }
            else{
                console.log("New FeedBack !");
                const newFeedback = new FeedBack({ feedback, message, messageId });
                await newFeedback.save();
                res.status(200).send(newFeedback);
            }
        }
        catch (err){
            console.log(err);
        }
        
    },
    getAllFeedBacks: async (req, res) => {
        try{
            const feedbacks = await FeedBack.find();
            res.status(200).send(feedbacks);
        }
        catch(err){
            console.log(err);
        }
    },
    getFeedBackByPreset: async (req, res) => {
        try{
            const { preset } = req.params;
            const feedbacks = await FeedBack.find({ preset });
            res.status(200).send(feedbacks);
        }
        catch(err){
            console.log(err);
        }
    },
    getFeedBackByPresetAndPositivity: async (req, res) => {
        try{
            const { preset, feedback } = req.params;
            const feedbacks = await FeedBack.find({ preset, feedback });
            res.status(200).send(feedbacks);
        
        }
        catch(err){
            console.log(err);
        }
    },
}

module.exports = FeedBackController;