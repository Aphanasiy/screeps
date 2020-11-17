//*


unitcount = function(s) {
        return _.filter(Game.creeps, (creep) => creep.name.startsWith(s)).length
}

var Harvester = {
    run: function(creep) {
        if (creep.memory.restore) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#F80'}})
            }
            creep.memory.restore = (creep.store.getFreeCapacity() != 0)
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }})
            if (targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }})            }
            var target = creep.pos.findClosestByPath(targets)
            if(creep.transfer(target,  RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#F80'}});
            }
            creep.memory.restore = (creep.store.getUsedCapacity() == 0);
        }
    },
    name: "Harvester",
    body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE,  MOVE],
    startswith: "H",
    count: function() {
        return unitcount(this.startswith)
    }
}


var MiniHarvester = Object.assign({}, Harvester)
    MiniHarvester.name = "MiniHarvester"
    MiniHarvester.body = [WORK, CARRY, CARRY, MOVE, MOVE]
    MiniHarvester.startswith = "MH"


var ControllerSupplier = {
    run: function(creep) {
        if (creep.memory.restore) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#08F'}})
            }
            creep.memory.restore = (creep.store.getFreeCapacity() != 0)
        } else {
            
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#08F'}});
            }
            creep.memory.restore = (creep.store.getUsedCapacity() == 0);
        }
    },
    name: "CSupplier",
    body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE,  MOVE],
    startswith: "CS",
    count: function() {
        return unitcount(this.startswith)
    }

}


var Builder = {
    run: function(creep) {
        
        if (creep.memory.restore) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}})
            }
            creep.memory.restore = (creep.store.getFreeCapacity() != 0)
        } else {
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (target == null) {
                target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
            }
            
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            creep.memory.restore = (creep.store.getUsedCapacity() == 0);
            //creep.say(creep.restore)
        }
    },
    name: "Builder",
    body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE,  MOVE],
    startswith: "B",
    count: function() {
        return unitcount(this.startswith)
    }

}


module.exports = {
    Harvester,
    MiniHarvester,
    ControllerSupplier,
    Builder
};