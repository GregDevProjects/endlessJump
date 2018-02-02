Jetman.Input = {
	dragControl: function(game){
		if (!game.input.activePointer.isDown) {
			Jetman.Player.stop();
			return;
		}
		this.moveToPointer(game);
	
	},

	moveToPointer: function(game){
		Jetman.Player.flyToActivePointer();
	},

	flingPlayerOnTap: function(game, arguments){
		var swipeStartPosition = Jetman.Player.sprite.position;

		arguments[0].position.x += game.camera.x;
		arguments[0].position.y += game.camera.y;

		var swipeAngle = Phaser.Math.wrapAngle(Phaser.Point.angle(swipeStartPosition, arguments[0].position), true);
		var swipeDistance = Phaser.Point.distance(arguments[0].position, swipeStartPosition)
		var angleDeg = (Math.atan2(swipeStartPosition.y - arguments[0].position.y, swipeStartPosition.x - arguments[0].position.x) * 180 / Math.PI) + 180;

		var force =  swipeDistance;
		force*=2;
		if(force < 150)
			force = 150
		if(force > 300)
			force = 300;
		Jetman.Player.fling(angleDeg, force);
	
	},

	initFlingOnDown: function(game){
		game.input.onDown.add(function() { 
			Jetman.Input.flingPlayerOnTap(Jetman.Player.game, arguments);
		});	
	}


}


