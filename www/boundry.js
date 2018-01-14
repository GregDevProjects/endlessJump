Jetman.Boundry = {
	init: function(map,game){
		this.group = game.add.group();

		for (var i = 0; i < map.objects.boundry.length; i++) {

			this.group.add( new Boundry(
		  		game,
		  		map.objects.boundry[i].x,
			  	map.objects.boundry[i].y
				)
			);
		}


	}

}

//START BOUNDRY
Boundry = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y);
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    game.add.existing(this);
}

Boundry.prototype = Object.create(Phaser.Sprite.prototype);
Boundry.prototype.constructor = Boundry;

Boundry.prototype.update = function() {
    this.game.physics.arcade.collide(this, Jetman.Platforms.platforms);

}
