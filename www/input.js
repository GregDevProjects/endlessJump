Jetman.Input = {
	dragControl: function(game){

		if (!game.input.activePointer.isDown) {
			Jetman.Player.stop();
			return;
		}
		this.moveToPointer(game);
	
	},

	moveToPointer: function(game){

		Jetman.Player.flyToActivePointer()
		this.moveOnGround(game);
	},

	moveOnGround: function(game){
	  var direction = Jetman.swipe.check();

      if (direction!==null && !Jetman.Player.disableFling) {
      	var swipeStartPosition = direction.point;
      	this.flingPlayerOnPointerUp(
      		new Phaser.Point(
      			swipeStartPosition.x,
      			swipeStartPosition.y
      		)
      	);
      }
		
	 },

	flingPlayerOnPointerUp: function(swipeStartPosition){
		Jetman.Player.game.input.onUp.addOnce(function() { 
			var swipeAngle = Phaser.Math.wrapAngle(Phaser.Point.angle(swipeStartPosition, arguments[0].position), true);
			var swipeDistance = Phaser.Point.distance(arguments[0].position, swipeStartPosition)
			var angleDeg = (Math.atan2(swipeStartPosition.y - arguments[0].position.y, swipeStartPosition.x - arguments[0].position.x) * 180 / Math.PI) + 180;
			//apply velocity
			var force =  swipeDistance;
			if(force > 300)
				force = 300;
			Jetman.Player.fling(angleDeg, force);

		});
	}


}


