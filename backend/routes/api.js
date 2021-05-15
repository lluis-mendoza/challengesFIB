var User = require('../models/user');
var Challenge = require('../models/challenge');

module.exports = function(app, express){

    var apiRouter = express.Router();
    apiRouter.route('/users')
        .post(async (req, res) => {
            var user = new User();

            user.name = req.body.name;

            await user.save((err) =>{
                if (err){
                    if (err.code == 11000) return res.json({success: false, message: 'A user with that name already exists'});
                    else return res.send(err);
                }
                res.json({message: 'User created!'});
            });
        })
        .get(async (req, res) => {
            const users = await User.find();

            res.send(users);
        })
        .delete(async (req, res) => {
            await User.deleteMany({},function(err, users){
                if (err) res.send(err);

                res.json({message: 'All the users has been removed'});
            });
    });
    apiRouter.route('/users/:user_name')
        .get(async (req, res)=>{
            await User.findOne({name: req.params.user_name}, (err, user)=>{
                if (err) res.send(err);

                res.json(user);
            });
        })
        .put(async (req, res)=>{
            console.log(req.params.user_name);
            await User.findOne({name: req.params.user_name}, (err, user)=>{
                if (err) res.send(err);
                if (user){
                    if (req.body.numWins) user.numWins = req.body.numWins;
                    else ++user.numWins;
                    user.save(function(err){
                        if (err) res.send(err);
        
                        res.json({message: 'User updated!'});
                    });
                }

            });
        })
        .delete(async (req, res) =>{
            console.log("deleting");
            await User.deleteOne({name: req.params.user_name}, function(err){
                if (err) return res.send(err);
                res.json({message: 'User removed!'});
            });
        });
    apiRouter.route('/challenges')
        .post(async (req, res) => {
            var challenge = new Challenge();
            challenge.name = "test";
            challenge.code = 123;

            await challenge.save((err) =>{
                if (err){
                    return res.send(err);
                }
                res.json({message: 'Challenge created!'});
            });
        })
        .get(async (req, res) => {
            const challenge = await Challenge.find();

            res.send(challenge);
        })
        .delete(async (req, res) => {
            await Challenge.deleteMany({},function(err, challenge){
                if (err) res.send(err);

                res.json({message: 'All challenges has been removed'});
            });
        });
        apiRouter.route('/challenges/:challenge_id')
            .get((req, res)=>{
                Challenge.findById(req.params.challenge_id, (err, user)=>{
                    if (err) res.send(err);
        
                    res.json(user);
                });
            })
            .put((req, res)=>{
                Challenge.findById(req.params.challenge_id, (err, challenge) => {
                    if (err) res.send(err);
                    
                    if (!challenge){
                        if (req.body.name) challenge.name = req.body.name;
                        if (req.body.code) challenge.code = req.body.code;

                        challenge.save(function(err){
                            if (err) res.send(err);

                            res.json({message: 'Challenge updated!'});
                        })
                    }
                    else return res.json({success: false, message: 'A user with that username already exists'}); 
                });
            })
            .delete((req, res) =>{
                Challenge.findByIdAndDelete(req.params.challenge_id, (err, challenge) =>{
                    if (err) return res.send(err);
        
                    res.json({message:'Challenge deleted!'});
                });
            });
    return apiRouter;

}