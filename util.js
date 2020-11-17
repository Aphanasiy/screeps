/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util');
 * mod.thing == 'a thing'; // true
 */

var roles = require("roles")

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
    //console.log(role.name + " can be born: " + rules)
    if (!rules) {
        return
    }
    var citizens = _.filter(Game.creeps, (creep) => creep.name.startsWith(role.startswith))
    if (citizens.length < amount) {
        //console.log("Oh...")
        var name = role.startswith + Game.time
        if (spawn.spawnCreep(role.body, name, role.init) == OK && !spawn.memory.birthday) {
            console.log("Unit " + name + " is born")
            spawn.memory.birthday = true;
        }
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
    //unitsCount
};