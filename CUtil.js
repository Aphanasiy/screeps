var roles = require("CRole")

var payRespectsToDead = function() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Paying respects to dead:', name);
        }
    }
}


var stats = function(roles, timeout) {
    if (Game.time % timeout == 0) {
        console.log("=== " + Game.time + " stats ===")
        for (r in roles) {
            console.log("    " + r + ": " + roles[r].count())
        }
        console.log("=== === === === === ===")
    }
}


var lifeSupport = function(spawn, role, amount, rules) {
    if (!rules) {
        return
    }
    var citizens = _.filter(Game.creeps, (creep) => creep.name.startsWith(role.startswith))
    if (citizens.length < amount) {
        //console.log("Oh...")
        role.birth()
    }
}


var simpleScheduler = function() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name]
        for (var r in roles) {
            if (name.startsWith(roles[r].startswith)) {
                roles[r].run(Game.creeps[name])
            }
        }
    }
}

module.exports = {
    payRespectsToDead,
    lifeSupport,
    simpleScheduler,
    stats
};