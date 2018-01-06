Jetman.PreLoad = function(game) {};
Jetman.PreLoad.prototype = { 
        preload: function() {
                this.game.load.image('platform', 'img/fuel_m.png');
                this.game.load.image('player', 'img/playerProto_m.png');
                this.game.load.image('ground', 'img/ground.png');
                this.game.load.image('bg', 'img/cave.png');

                this.game.load.image('fuelLow', 'img/low_m.png');
                this.game.load.image('fuelMed', 'img/med.png'); 
                this.game.load.image('fuelHigh', 'img/high.png');

                this.game.load.image('jetParticle', 'img/jetParticle.png')
                this.game.load.image('deathTiles', 'img/deathTiles_m.png');
                this.game.load.image('spikeEnemy', 'img/spikeEnemy.png');
                this.game.load.image('spikeEnemyEye', 'img/spikeEnemyEye.png');
                this.game.load.image('button', 'img/button.png');
                this.game.load.image('invisible', 'img/invisible.png');
                this.game.load.image('walker', 'img/walker.png');

                this.game.load.image('rockPlatforms', 'img/platform_rock.png')
                this.game.load.spritesheet('jumpPadUp', 'img/jumpPadUp.png',30, 30, 17); 

                this.game.load.spritesheet('fuelXl', 'img/xl.png', 50, 25, 4); 
                this.game.load.spritesheet('fireball','img/fireBall.png',116.333,168,7);

                this.game.load.spritesheet('water','img/ocean_spriteSheet.png',30,30,16);
                
                this.game.load.tilemap('mapName', 'tilemaps/test3.json', null, Phaser.Tilemap.TILED_JSON);
        },

        create: function() {
                //this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
                //menu menu goes here
                this.game.state.start('level1');
        }
};