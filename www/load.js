Jetman.PreLoad = function(game) {};
Jetman.PreLoad.prototype = { 
        preload: function() {
                this.game.load.image('platform', 'img/dirtWall.png');
                this.game.load.image('player', 'img/playerProto.png');
                this.game.load.image('ground', 'img/ground.png');
                this.game.load.image('bg', 'img/debugBg.png');
                this.game.load.image('fuelLow', 'img/low.png');
                this.game.load.image('fuelMed', 'img/med.png'); 
                this.game.load.image('fuelHigh', 'img/high.png');
                this.game.load.image('jetParticle', 'img/jetParticle.png')
                this.game.load.image('deathTiles', 'img/deathTiles.png');
                this.game.load.spritesheet('fuelXl', 'img/xl.png', 50, 25, 4); 
                this.game.load.spritesheet('fireball','img/fireBall.png',116.333,168,7);
                this.game.load.tilemap('mapName', 'tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON);
        },

        create: function() {
                //menu menu goes here
                this.game.state.start('level1');
        }
};