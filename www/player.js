Jetman.Player = {
    initPlayer: function(game){
        firstrun = true;
        this.game = game;
        var x = Jetman.Platforms.map.objects.playerStart[0].x; 
        var y = Jetman.Platforms.map.objects.playerStart[0].y;
        this.sprite =  this.game.add.sprite(x, y, 'player'); 
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.allowGravity = true;
        this.sprite.body.collideWorldBounds=true;
        this.sprite.body.gravity.y = 300;    
        this.game.camera.follow(this.sprite);
        this.game.camera.targetOffset.y = -game.height/4;

        this.fuel = 100;
       // this.hasFuel = false;
    },

    death: function(){
        this.game.camera.target = null;
        this.game.camera.flash(0xff0000, 500);
        this.sprite.kill();

        var x = Jetman.Platforms.map.objects.playerStart[0].x; 
        var y = Jetman.Platforms.map.objects.playerStart[0].y;
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.body.allowGravity = true;
        this.sprite.body.velocity.set(0);
        this.sprite.revive(x,y);
        this.game.camera.targetOffset.set(0);
        this.game.camera.follow(this.sprite);    
    },

    moveRight: function(){
        this.sprite.body.velocity.x = 50;
    },

    moveLeft: function(){
        this.sprite.body.velocity.x = -50; 
    },

    stop: function(){
        this.sprite.body.velocity.x = 0;
    }

}