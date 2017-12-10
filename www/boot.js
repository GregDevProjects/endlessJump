var Jetman = {}; //CONSTANTS GO HERE
Jetman.Boot = function(game) {};
Jetman.Boot.prototype = {
	create: function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.state.start('load');
	}
	
};