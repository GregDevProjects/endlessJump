Jetman.SpikeEnemyTypes = {
	RIGHT_TO_LEFT:1,
	LEFT_TO_RIGHT:2,
	FOLLOW:3
};

Jetman.SpikeEnemies = {

	init: function(map,game){
		this.game = game;
		
		this.group = this.game.add.group();
		this.group.name ='SpikeEnemies';
		this.group.enableBody = true;

		for (var i=0;i<map.objects.spikeEnemy.length;i++) {
			this.group.add(
				new this.SpikedEnemy(
					this.nameToEnum(map.objects.spikeEnemy[i].name),
					map.objects.spikeEnemy[i].x,
					map.objects.spikeEnemy[i].y,
					this.game
				)

			);
		}	

	},	

	SpikedEnemy: function(SpikeEnemyType,x,y,game){
		this.game = game;
		this.sprite =this.game.add.sprite(x, y, 'spikeEnemy'); 
		this.sprite.moveSpeed = 100;
		this.sprite.type = SpikeEnemyType;
		this.spikeEnemyType = SpikeEnemyType;
		
		
		this.sprite.move = function(){

			switch (this.type){
				case Jetman.SpikeEnemyTypes.LEFT_TO_RIGHT:
					this.body.velocity.x = this.moveSpeed;
					return;
				case Jetman.SpikeEnemyTypes.RIGHT_TO_LEFT:
					this.body.velocity.x = -this.moveSpeed;
					return;
				case Jetman.SpikeEnemyTypes.FOLLOW:
					this.rotateEye(game);
					if(this.centerX - 5 <= Jetman.Player.sprite.centerX && this.centerX + 5 >= Jetman.Player.sprite.centerX){
						this.body.velocity.x = 0;
						return;
					}
					if(this.centerX > Jetman.Player.sprite.centerX){
						this.body.velocity.x = -this.moveSpeed;
					} else {
						this.body.velocity.x = this.moveSpeed;
					}
					//if(sprite)
					
					//this.sprite.children[0].rotation = this.sprite.children[0].angleToXY(Jetman.Player.centerX, Jetman.Player.centerY);
					return;
			}

		}

		this.attachEye = function(game){
			this.sprite.eye = this.sprite.addChild(game.make.sprite(15, 45, 'spikeEnemyEye')); 
			this.sprite.eye.anchor.setTo(0.5, 0.5);
		}	

		this.sprite.rotateEye = function(game ){
			//console.log(game.physics.arcade.angleToXY(this, Jetman.Player.sprite.centerX, Jetman.Player.sprite.centerY));
			//this.eye.world.x +=30;
			//this.eye.world.y -=100; 
			this.eye.rotation = game.physics.arcade.angleToXY({x:this.eye.world.x,y:this.eye.world.y}, Jetman.Player.sprite.centerX, Jetman.Player.sprite.centerY);
			this.eye.rotation+=89.5;
			x = this.eye.world.x;
			y = this.eye.world.y;
			//this.	eye.rotation = 1.5;
		}

		this.attachEye(game);


		return this.sprite;
	},

	onPlayerSpikeEnemyOverlap: function(){
		//Jetman.Player.death();
	},

	onSpikedEnemyPlatformOverlap: function(spikeEnemy, platform){
		if(platform.index !==1){
			return;
		}
		if (spikeEnemy.type === Jetman.SpikeEnemyTypes.RIGHT_TO_LEFT ||
			spikeEnemy.type === Jetman.SpikeEnemyTypes.LEFT_TO_RIGHT) {
			spikeEnemy.moveSpeed = -spikeEnemy.moveSpeed;
		}  
		
	},
	
	nameToEnum: function(tileObjName){
		switch(tileObjName){
			case 'rightToLeft': 
				return 1;
			case 'leftToRight':
				return 2;
			case 'follow':
				return 3;
		} 
	}


};