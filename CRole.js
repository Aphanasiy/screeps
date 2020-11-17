

class RoleControl {
    constructor() {
        this.name = "Roleman",
        this.startswith = "R",
        this.body = [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
        this.dependencies = {}
    }
    run(creep) {}
    birth(spawn) { 
        var name = this.startswith + Game.time
        return spawn.spawnCreep(this.body, name)
    }
    count() {
        return _.filter(Game.creeps, (creep) => creep.name.startsWith(this.startswith)).length
    }
}
//*/


class CHarvester extends RoleControl {
    constructor() {
        this.name = "Harvester",
        this.startwith = "H"
    }
    run(creep) {
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
    }
}


class CMiniHarvester extends CHarvester {
    constructor() {
        this.name = "MiniHarvester",
        this.startwith = "MH"
        this.body = [WORK, CARRY, CARRY, MOVE, MOVE]
    }
}


class CUpgrader extends RoleControl {
    constructor() {
        this.name =  "Upgrader"
        this.body = [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE,  MOVE]
        this.startswith = "U"
    }
    run(creep) {
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
    }
}


class CBuilder extends RoleControl {
    constructor() {
        this.name = "Builder"
        this.body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE,  MOVE]
        this.startswith = "B"
    }
    run(creep) {
        if (creep.memory.restore) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (typeof source == 'undefined') {
                var source = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}})
            }
            creep.memory.restore = (creep.store.getFreeCapacity() != 0)
        } else {
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES );
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            creep.memory.restore = (creep.store.getUsedCapacity() == 0);
            //creep.say(creep.restore)
        }
    }
}


module.exports = {

};