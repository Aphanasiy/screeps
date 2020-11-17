var roles = require('roles')
var util = require('util')

var croles = require("CRole")
var cutil = require("CUtil")


module.exports.loop = 
//var f = 
      function() {
    
    util.payRespectsToDead()
    
    util.stats(roles, 200)
    //*
    util.lifeSupport(Game.spawns["AphaSpawn"], roles.MiniHarvester, 1, roles.Harvester.count() == 0)
    util.lifeSupport(Game.spawns["AphaSpawn"], roles.Harvester, 4, true)
    util.lifeSupport(Game.spawns["AphaSpawn"], roles.ControllerSupplier, 6, roles.ControllerSupplier.count() < roles.Harvester.count() || roles.Harvester.count() == 4)
    util.lifeSupport(Game.spawns["AphaSpawn"], roles.Builder, 4, roles.Builder.count() < roles.ControllerSupplier.count())
    //*/
    util.simpleScheduler()
}