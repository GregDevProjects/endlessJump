Jetman.Input = {
	dragControl: function(game){

		if (!game.input.activePointer.isDown) {
			Jetman.Player.stop();
			
			return;
		}
		this.moveToPointer(game);
		return;
	
	},

	moveToPointer: function(game){
		if(Jetman.Particles.isBurstingActive === false){
			Jetman.Player.sprite.body.allowGravity = true;
			this.moveOnGround(game);
			return;
		}
		Jetman.Player.sprite.body.allowGravity = false; 
		game.physics.arcade.moveToPointer(Jetman.Player.sprite, 200, game.input.activePointer, 0);
		
		//game.physics.arcade.moveToPointer, game.physics.arcade, false, 200
	},

	moveOnGround: function(game){
		var playerPositionX = Jetman.Player.sprite.x;
	    var playerMiddle = playerPositionX + Jetman.Player.sprite.width/2;
	    var tapPositionX = game.input.activePointer.x  + game.camera.x;
	    if (playerMiddle - 5 <= tapPositionX && playerMiddle + 5 >= tapPositionX){
	        Jetman.Player.stop();
	        return;
	    }

	    if (tapPositionX >  playerMiddle) {
	        Jetman.Player.moveRight();    
	    } else if (tapPositionX < playerMiddle){
	        Jetman.Player.moveLeft();
	    } 			
	}
}

