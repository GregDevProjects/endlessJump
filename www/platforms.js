//Jetman.Platforms = function(){};
Jetman.Platforms = {

    TileIndexes: {
        PLATFORM: 1,
        LAVA: 2,
        SPIKES: 3
    },

    initGroups: function(game) {
        this.fireball = game.add.group();
        this.fireball.enableBody = true;

    },


    onTileCollision: function(playerObj, platform) {
        //might be better to create seprate layers for this kind of stuff
        switch (platform.index) {
            case Jetman.Platforms.TileIndexes.PLATFORM:
                if (playerObj.body.blocked.down) {
                    Jetman.Player.startAnglingUpright();
                }
                return;
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
        //WASH ME
        this.game = game;

        this.map = game.add.tilemap('mapName');

        this.map.addTilesetImage('fuel', 'platform');
        this.map.addTilesetImage('deathTiles', 'deathTiles');

        this.map.addTilesetImage('invisible', 'invisible');

         this.platforms = this.map.createLayer('platforms');

        this.boundries = this.map.createLayer('invisible');

         this.boundries.enableBody = true;

       // this.boundries.debug = true;

this.game.physics.arcade.enable(this.boundries, Phaser.Physics.ARCADE, true);
        
        this.map.setCollision([1, 2, 3], true, 0);
        this.map.setCollision(4, true, 1);
        this.platforms.resizeWorld();
    }

}