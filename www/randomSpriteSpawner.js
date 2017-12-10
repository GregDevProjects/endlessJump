function randomSpriteSpawner(sprite,x,y,width,height, interval){
	this.sprite = sprite;
	this.spriteGroup;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.maxSprites = 20;
	this.spawnReady = true;
	this.interval = interval;

	this.start = function(game){
		// if(fireball.children.length > this.maxSprites + 1){
		// 	return;
		// }
		if(!this.spawnReady){
			return;
		}
		game.time.events.add(this.interval, function(){ this.spawnReady = true; }, this);
		var position = this.getRandomPosition(game);
		this.spawnFireBall(position.x,position.y, game); 
		this.spawnReady = false;
	}

	this.getRandomPosition = function(game){
		var x = game.rnd.integerInRange(this.x, this.x + this.width);
		var y = game.rnd.integerInRange(this.y, this.y + this.height);
		return { x,y };
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

	this.spawnFireBall = function(x,y, game){
	  y+=100;
	  x-=50;
      var test = Jetman.Platforms.fireball.create( x, y, 'fireball');
      game.physics.arcade.enable(test);
      //  test.anchor.set(.5, 1)
      test.animations.add('burn',null,45,true);
      test.animations.play('burn');
      test.scale.y *= -1;
      test.body.offset.y = 30;
      test.body.offset.x = 30
      test.body.width = 50;
      test.body.height = 120;
      test.allowGravity = false;
      test.body.velocity.y = -150;
    }
}