function randomSpriteSpawner(sprite,x,y,width,height){
	this.sprite = sprite;
	this.spriteGroup;
	this.start = function(){

	}

	//set generated sprite to have fireball properties 
	this.setFireBall = function(direction){
	    this.spriteGroup = game.add.group();
		this.spriteGroup.enableBody = true;
		this.spriteGroup.allowGravity = false;

		//game.add.sprite(game, this.x, this.y, 'fireball');

		     //   test =  game.add.sprite( 80, 4600, 'fireball');
		     //   test.anchor.set(.5, 1)
       // test.animations.add('burn',null,45,true);
       //  test.animations.play('burn');


	}
}