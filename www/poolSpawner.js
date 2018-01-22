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
        this.game = game;

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

        var indexCounter = 0;
        for (var i = 0; i < map.objects.spikeEnemy.length; i++) {

            this.spawnPoints[indexCounter] = 
                {  
                    x:  map.objects.spikeEnemy[i].x,
                    y: map.objects.spikeEnemy[i].y,
                    type: Jetman.SpikeEnemies.nameToEnum(map.objects.spikeEnemy[i].name), 
                    spawned: false,
                    arrayIndex: indexCounter
                };
            indexCounter++;
            
        }

          for (var i = 0; i < map.objects.walker.length; i++) {

            this.spawnPoints[indexCounter] = 
                {  
                    x:  map.objects.walker[i].x,
                    y: map.objects.walker[i].y,
                    type: Jetman.EnemyTypes.WALKER,
                    spawned: false,
                    arrayIndex: indexCounter
                };
        
            indexCounter++;
        }

	},

    checkSpawn: function(game){
         this.timerCheck--;
         if(this.timerCheck >=0){
            return;
         } else {
            this.timerCheck = 30;
         }

        
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

    spawnObject: function(group, spawnPoint){
        //check if any enemy is alive
        var newWAlker = group.getFirstDead(
            false,
            spawnPoint.x,
            spawnPoint.y                    
        );

        if(newWAlker){
            this.reviveDeadAndMoveToSpawnPoint(spawnPoint, newWAlker);
        } else {
            this.moveFurthestEnemyToSpawnPoint(group, spawnPoint);
        }
                 
    },

    reviveDeadAndMoveToSpawnPoint: function(spawnPoint, objToRevive){
        objToRevive.arrayIndex = spawnPoint.arrayIndex;
        objToRevive.revive(); 
        objToRevive.button.revive();
        this.spawnPoints[spawnPoint.arrayIndex].spawned = true;       
    },

    moveFurthestEnemyToSpawnPoint: function(group, spawnPoint){
        var objToMove = group.getFurthestFrom(Jetman.Player.sprite);
        this.spawnPoints[spawnPoint.arrayIndex].spawned = true;
        objToMove.x = spawnPoint.x;
        objToMove.y = spawnPoint.y;
        objToMove.arrayIndex = spawnPoint.arrayIndex;        
    },

    respawn: function(spawnPointIndex){
         this.game.time.events.add(Phaser.Timer.SECOND * 10, resetIndex, this);

         function resetIndex(){
            this.spawnPoints[spawnPointIndex].spawned = false;
            
         }
    }

}