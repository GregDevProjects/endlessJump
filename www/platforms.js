//Jetman.Platforms = function(){};
Jetman.Platforms = {

    TileIndexes: {
        LAVA: 1,
        SPIKES: 2
    },

    initGroups: function(game) {
        this.fireball = game.add.group();
        this.fireball.enableBody = true;

    },


    onPlatformLayerCollision: function(playerObj, platform) {

        if (playerObj.body.blocked.down) {
            Jetman.Player.resetCombo();
            Jetman.Player.startAnglingUpright();
        }   
        

    },

    onDeathLayerCollision: function(playerObj, deathTile){
      //  debugger;
        switch (deathTile.index) {
            case Jetman.Platforms.TileIndexes.LAVA:
                Jetman.Player.death();
                return;
            case Jetman.Platforms.TileIndexes.SPIKES:
                if (playerObj.body.blocked.up) {
                    Jetman.Player.death();
                }   
        }
    },

    onFireballPlayerOverlap: function(playerObj, fireballObj) {
        Jetman.Player.death();
    },

    onFireballPlatformOverlap: function(fireBallObj, tileCollide) {
        //debugger;
        if (tileCollide.index === 1) {
            fireBallObj.kill();
            //fireBallObj.destroy();
        }

    },
    //init level 1 
    initTileMap: function(game) {
        this.map = game.add.tilemap('mapName');



        this.addTilesetImages(game);
        this.createLayers(game);

        this.boundries.enableBody = true;
         this.death.enableBody = true;

        game.physics.arcade.enable(this.boundries, Phaser.Physics.ARCADE, true);
        
        this.setTileCollisions();

        this.platforms.resizeWorld();
        
    },

    createLayers: function(){
        this.platforms = this.map.createLayer('platforms');  
        this.boundries = this.map.createLayer('invisible');   
        this.death = this.map.createLayer('death'); 
    },

    addTilesetImages: function(){
        this.map.addTilesetImage('deathTiles', 'deathTiles');
        this.map.addTilesetImage('invisible', 'invisible');
        this.map.addTilesetImage( 'platform_rock','rockPlatforms');
    },

    setTileCollisions: function(){
        this.map.setCollisionBetween(4, 10, true, this.platforms);
        this.map.setCollision(5, true, this.boundries);
        this.map.setCollision([1,2], true, this.death);  
    }

}