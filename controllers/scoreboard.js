const express = require('express');
const router = express.Router();
const scoreboard = require('../models/list');

router.get('/', function (req, res) {
    scoreboard.getAllPlayers(function (err,players) {
        if(err){
            res.json({success:false,message:'failed to load list. Error:'+err});
        }
        else{
            res.status(200).send(players);
        }
    });
});
router.get('/:id', function (req, res) {
    var player_id = req.params.id;
    scoreboard.getPlayer({_id: player_id},function (err,player) {
        if(err){
            res.json({success:false,message:'failed to load list. Error:'+err});
        }
        else{
            res.status(200).send(player);
        }
    });
});
router.post('/',function(req,res){
    var newProgress = new scoreboard({
        name: req.body.name,
        score: req.body.score,
        bestScore: req.body.bestScore,
        lastPosition: req.body.lastPosition
    });
    scoreboard.savePlayer(newProgress,function(err, player){
        if(err) {
            res.json({success: false, message: 'Failed to create a new list. Error: ' + err});
        }
        else
            res.status(200).send(player);
    });
});
router.put('/:id',function(req,res){
    var player = req.body;
    var player_id = req.body._id;
    scoreboard.addPlayerProgress({_id: player_id},player,function(err,result){
        if(err){
            res.json({success: false, message: 'Failed to create a new list. Error: ' + err});
        }
        else{
            res.status(200).send(player);
        }
    });
});

router.delete('/:id', function (req,res){
    var id = req.params.id;
    scoreboard.deleteListById(id,function(err,list){
        if(err) {
            res.json({success:false, message: 'Failed to delete the list. Error: ' + err});
        }
        else if(list) {
            res.json({success:true, message: "Deleted successfully"});
        }
        else
            res.json({success:false});
    });
});

module.exports = router;