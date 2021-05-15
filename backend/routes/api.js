var User = require('../models/user');
var Challenge = require('../models/challenge');
var config = require('../config');
var jwt = require('jsonwebtoken');


var superSecret = config.secret;

module.exports = function(app, express){

    var apiRouter = express.Router();
    /*
    apiRouter.use(function(req, res, next){
        var token = req.body.token||req.query['token']||req.headers['x-access-token'];

        if(token){
            jwt.verify(token, superSecret, function(err, decoded){
                if (err){
                    return res.status(403).send({succes:false, message: 'Token not provided'});
                }
                else{
                        req.decoded = decoded;
                        //Only passing when all is good
                        next();
                }
                
            });
        }
        else{
            return res.status(403).send({succes:false, message: 'Token not provided'});
        }
    });*/
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
    apiRouter.route('/users/:user_name/challenges')
        .get(async (req, res) =>{
            let info = await User.findOne({name: req.params.user_name}).populate("challenges").exec();
            let challenges = [];
            for(let i = 0; i<info.challenges.length; ++i){
                let obj = {};
                obj[i] = info.challenges[i];
                challenges.push(info.challenges[i]);
            }
            res.send(challenges);
        })
    apiRouter.route('/users/:user_name')
        .get(async (req, res)=>{
            await User.findOne({name: req.params.user_name}, async (err, user)=>{
                if (err) res.send(err);
                if(!user){
                    var newUser = new User();
                    newUser.name = req.params.user_name;
                    newUser.save((err) =>{
                        if (err){
                            if (err.code == 11000) return res.json({success: false, message: 'A user with that name already exists'});
                            else return res.send(err);
                        }
                    });
                    return res.json(newUser);
                }         
                return res.json(user);
            });
        })
        .put(async (req, res)=>{
            console.log(req.params.user_name);
            await User.findOne({name: req.params.user_name}, (err, user)=>{
                if (err) res.send(err);
                if (user){
                    
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
    apiRouter.route('/foundChallenge/:challenge_code')
        .post(async (req, res) =>{
            Challenge.findOne({code: req.params.challenge_code}, (err, challenge) =>{
                if (err) res.send(err);

                if (!challenge) return res.send({success: false});
                console.log(req.body.name)
                User.findOne({name: req.body.name}, (err, user)=>{
                    if (err) res.send(err);
                    if (user){
                        if (user.challenges == null || !user.challenges.includes(challenge._id)){
                            user.challenges.push(challenge);
                            user.score += challenge.points;
                            user.save(function(err){
                                if (err) res.send(err);
                            });
                        }

                    }
    
                });
                return res.send({success: true});
            })
        });
    apiRouter.route('/challenges')
        .post(async (req, res) => {
            var challenge = new Challenge();
            challenge.name = req.body.name;
            challenge.code = req.body.code;
            challenge.description = req.body.description;
            challenge.points = req.body.points;
            challenge.image = req.body.image;

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