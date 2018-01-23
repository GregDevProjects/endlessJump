Jetman.PreLoad = function(game) {};
Jetman.PreLoad.prototype = { 
        preload: function() {
                this.game.load.image('player', 'img/playerProto_m.png');

                this.game.load.image('bg_fg', 'img/cave_512_fg.png');
                this.game.load.image('bg_bg', 'img/cave_512_bg.png');

                this.game.load.image('bg_1', 'img/bg/cave_1.png');
                this.game.load.image('bg_2', 'img/bg/cave_2.png');
                this.game.load.image('bg_3', 'img/bg/cave_3.png');
                this.game.load.image('bg_4', 'img/bg/cave_4.png');

                this.game.load.image('fuelLow', 'img/low_m.png');
                this.game.load.image('fuelMed', 'img/med.png'); 
                this.game.load.image('fuelHigh', 'img/high.png');

                this.game.load.image('jetParticle', 'img/jetParticle.png')

                this.game.load.image('spikeEnemy', 'img/spikeEnemy.png');
                this.game.load.image('spikeEnemyEye', 'img/spikeEnemyEye.png');
                this.game.load.image('button', 'img/button.png');
                this.game.load.image('invisible', 'img/invisible.png');
                this.game.load.image('walker', 'img/walker.png');

                this.game.load.image('jumper', 'img/jumper.png');

      
                this.game.load.image('caveTiles', 'img/platform_caves_all.png');

                this.game.load.spritesheet('jumpPadUp', 'img/jumpPadUp.png',30, 60, 3); 

                this.game.load.spritesheet('fuelXl', 'img/xl.png', 50, 25, 4); 
                this.game.load.spritesheet('fireball','img/fireBall.png',116.333,168,7);
                
                this.game.load.tilemap('mapName', 'tilemaps/test3.json', null, Phaser.Tilemap.TILED_JSON);

                this.game.load.spritesheet('kaboom', 'img/explosion.png', 96, 96);
        },

        create: function() {
                //menu menu goes here
                this.game.state.start('level1');
        }
};