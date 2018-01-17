Jetman.EnemyTypes = {
	SPIKED_RIGHT_TO_LEFT: 1,
	SPIKED_LEFT_TO_RIGHT: 2,
	SPIKED_FOLLOW: 3,
	WALKER: 4
}

Jetman.RenderQuantity = {
	WALKER: 5,
	SPIKED_RIGHT_TO_LEFT: 3,
	SPIKED_LEFT_TO_RIGHT: 3,
	SPIKED_FOLLOW: 2
}


Jetman.PoolSpawner = {
	initGroup: function(group, quantity, type, game){
        for (var i = 0; i <  quantity; i++) {

        	if(type === 4){
	            group.add(
	            	new Walker(
                		game
            		)
        		);
        	} else {
        		group.add( 
        			new SpikedEnemy(
        					type,
        					game
        				)
        		
        			)
        	}

        }
	},

	createObjects: function(game){


        //too much repetition here, I'll go crazy if I have to do this for every obj 

		this.walkerGroup = game.add.group();
		this.spikedLeftToRightGroup = game.add.group();
		this.spikedRightToLeftGroup = game.add.group();
		this.spikedFollowGroup = game.add.group();

		this.initGroup(this.walkerGroup,Jetman.RenderQuantity.WALKER, Jetman.EnemyTypes.WALKER, game  );
		this.initGroup(this.spikedLeftToRightGroup,Jetman.RenderQuantity.SPIKED_LEFT_TO_RIGHT, Jetman.EnemyTypes.SPIKED_LEFT_TO_RIGHT, game );
		this.initGroup(this.spikedRightToLeftGroup,Jetman.RenderQuantity.SPIKED_RIGHT_TO_LEFT, Jetman.EnemyTypes.SPIKED_RIGHT_TO_LEFT, game );
		this.initGroup(this.spikedFollowGroup, Jetman.RenderQuantity.SPIKED_FOLLOW, Jetman.EnemyTypes.SPIKED_FOLLOW, game);


		 this.timerCheck = 0;

	},

	initSpawnPoints: function(map){

		this.WALKERS_TO_RENDER = 5;
		this.SPIKED_TO_RENDER = 5;
		this.spawnPoints = [];


        for (var i = 0; i < map.objects.spikeEnemy.length; i++) {

            this.spawnPoints.push(
                {  
                    x:  map.objects.spikeEnemy[i].x,
                    y: map.objects.spikeEnemy[i].y,
                    type: Jetman.SpikeEnemies.nameToEnum(map.objects.spikeEnemy[i].name), 
                    spawned: false
                }
            );
        }

          for (var i = 0; i < map.objects.walker.length; i++) {

            this.spawnPoints.push(
                {  
                    x:  map.objects.walker[i].x,
                    y: map.objects.walker[i].y,
                    type: Jetman.EnemyTypes.WALKER,
                    spawned: false
                }
            );
        }

      //  debugger;

	},

    checkSpawn: function(game){
       // console.log(Jetman.Player.sprite.y - this.walkerGroup.children[0].y);
         this.timerCheck--;
         if(this.timerCheck >=0){
            return;
         } else {
            this.timerCheck = 45;
         }
         //console.log('spawnin');


        //POPULATE FIRST 5 AT START RATHER THAN MOVIN 1 ATA TIME 
        //SET SPAWNED TO FALSE AFTER A DELAY AFTER SPRITE IS KILLED 
        
        for(var i =0; i< this.spawnPoints.length;i++){ 
            var distance = Jetman.Player.sprite.y - this.spawnPoints[i].y;
            if(distance < 700 && distance > -200  && this.spawnPoints[i].spawned === false){
                

            	this.getTypeAndSpawn(this.spawnPoints[i]);
                

                
            } 
        }

    },

    getTypeAndSpawn: function(spawnPoint){
    	switch (spawnPoint.type){
    		case Jetman.EnemyTypes.SPIKED_RIGHT_TO_LEFT: 
    			this.spawnObject(this.spikedRightToLeftGroup,spawnPoint);
    			break;
    		case Jetman.EnemyTypes.SPIKED_LEFT_TO_RIGHT: 
    			this.spawnObject(this.spikedLeftToRightGroup,spawnPoint);
    			break;
    		case Jetman.EnemyTypes.SPIKED_FOLLOW: 
    			this.spawnObject(this.spikedFollowGroup,spawnPoint);
    			break;
    		case Jetman.EnemyTypes.WALKER: 
    			this.spawnObject(this.walkerGroup,spawnPoint);
    			break;
    	}

    },
    //need a way to tell what spawn point the enemy started at 
    //that way we can set spawned to false after a set time to enable respawning 
    spawnObject: function(group, spawnPoint){
                //revive walker from pool
                var newWAlker = group.getFirstDead(
                    false,
                    spawnPoint.x,
                    spawnPoint.y
                );

                if(newWAlker){
                    //spawn at point
                   newWAlker.revive(); 
                   newWAlker.button.revive();
                   spawnPoint.spawned = true;
                } else {
                    var walkerToKill = group.getFurthestFrom(Jetman.Player.sprite);
                    walkerToKill.kill();
                }
                 
    }

}