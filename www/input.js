function Input(){

	this.keyBoardControlls = function(controlledObject) {
		cursors = game.input.keyboard.createCursorKeys();
		//  Reset the players velocity (movement)
		this.player.body.velocity.x = 0;

		if (cursors.left.isDown) {
		//  Move to the left
		this.moveLeft();

		//player.animations.play('left');
		} else if (cursors.right.isDown) {
		//  Move to the right
		this.moveRight();

		//player.animations.play('right');
		} else {
		//  Stand still
		this.player.animations.stop();
		//player.frame = 4;
		}

		//  Allow the player to jump if they are touching the ground.
		if (cursors.up.isDown && this.player.body.touching.down) {
		this.player.body.velocity.y = -350;
		}
	}

	//requires global pointer + player objects
	this.dragControl = function(){
		if (!game.input.activePointer.isDown) {
			player.stop();
			return;
		}
		var playerPositionX = player.player.x;
	    var playerMiddle = playerPositionX + player.player.width/2;
	    var tapPositionX = game.input.activePointer.x  + game.camera.x;
	    if (playerMiddle - 5 <= tapPositionX && playerMiddle + 5 >= tapPositionX){
	        player.stop();
	        return;
	    }

	    if (tapPositionX >  playerMiddle) {
	        player.moveRight();    
	    } else if (tapPositionX < playerMiddle){
	        player.moveLeft();
	    } 
	}

	this.buttonStyleMove = function(xPosition){
            if(xPosition > width/2){
                console.log('right');
                player.moveRight();
            } else {
                player.moveLeft();
                console.log('left');
            }  
        }
} 