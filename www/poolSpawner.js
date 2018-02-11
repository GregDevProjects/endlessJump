Jetman.PoolSpawner = {

	createObjects: function(game){
        this.game = game;

        this.allEnemies = [
            Jetman.Walker,
            Jetman.FollowSpike,
            Jetman.LeftToRightSpike,
            Jetman.RightToLeftSpike,
            Jetman.JumpPadUp,
            Jetman.JumpPadRight,
            Jetman.JumpPadLeft,
            Jetman.Turret

        ];

        for(var i in this.allEnemies){
            var anEnemy = this.allEnemies[i];
            var group = this[anEnemy.TYPE_ID] = game.add.group();
            for(var z = 0; z < anEnemy.QUANTITY; z++){
                if(anEnemy.TYPE_ID !== 1){
                    //spiked enemies, jumppads 
                    group.add(new anEnemy.SPRITE(this.game, anEnemy.TYPE_ID));   
                }

                 else if(anEnemy.TYPE_ID === 1){
                    //walkers
                    group.add(new anEnemy.SPRITE(this.game));
                }
                
            }

        }

		 this.timerCheck = 0;

	},
    //loop through the spawn points of each enemy as defined in the JSON map file
    //add them to this.spawnPoints[]
	initSpawnPoints: function(map){
		this.spawnPoints = [];
         var indexCounter = 0;
        for (var i in this.allEnemies){
            var anEnemyType = this.allEnemies[i];
            for (var z = 0; z < map.objects[anEnemyType.TYPE_ID].length; z++) {

                this.spawnPoints[indexCounter] = 
                {  
                    x:  map.objects[anEnemyType.TYPE_ID][z].x,
                    y: map.objects[anEnemyType.TYPE_ID][z].y,
                    type: anEnemyType.TYPE_ID, 
                    spawned: false,
                    arrayIndex: indexCounter
                };
                indexCounter++;

            }   
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
                
                var aSpawnPoint = this.spawnPoints[i];
            	// this.getTypeAndSpawn(this.spawnPoints[i]);

                this.spawnObject(this[aSpawnPoint.type],aSpawnPoint);

                
            } 
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
        if("button" in objToRevive){
            objToRevive.button.revive();
        }

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