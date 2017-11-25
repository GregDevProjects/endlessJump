//world settings go here 

function setPhysics(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
}

function setBounds(){
	var gameHeight = 1000;
	var gameWidth = 500;
	game.world.setBounds(
			0, //Top left most corner of the world.
			gameHeight, //Top left most corner of the world.
			gameWidth,  //New width of the game world in pixels
			gameHeight //New height of the game world in pixels.
		);
	//might move this
	

}

function showBounds(){
	var world = game.world.bounds;
	var  bounds = new Phaser.Rectangle(world.x, world.y,world.width, world.height);
	var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.beginFill(0x9B4836);
    graphics.drawRect(0, 0, bounds.width, bounds.height);
}
