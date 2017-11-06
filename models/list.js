const mongoose = require('mongoose');

const scoreboardSchema = mongoose.Schema({
    name: {
        type: String
    },
    score: {
        type: Number,
        required: true
    },
    bestScore: {
        type: Number,
        required: true
    },
    lastPosition: {
        type: Array,
        required: true
    }
},{ collection: 'scoreboard'});

const scoreboard = module.exports = mongoose.model('scoreboard',scoreboardSchema);


module.exports.getAllPlayers = function(callback){
    scoreboard.find(callback);
};
module.exports.getPlayer = function(id,callback){
    scoreboard.findOne(id,callback);
};
module.exports.savePlayer = function(progress,callback){
    progress.save(callback);
};
module.exports.addPlayerProgress = function(id,body,callback){
    scoreboard.updateOne(id,body,callback);
};
// module.exports.deleteListById = function(id, callback){
//     var query = {_id: id};
//     scoreboard.remove(query, callback);
// };
