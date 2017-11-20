//world settings go here 

function setPhysics(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
}

function setBounds(){
	var gameHeight = 1000;
	game.world.setBounds(0, 0 - gameHeight, game.world.bounds.width, game.world.bounds.height + gameHeight);
	//might move this
	game.camera.follow(player.player);
}