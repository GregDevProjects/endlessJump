function Player() {

    this.construct = function() {
        var x = map.objects.playerStart[0].x; 
        var y =map.objects.playerStart[0].y;
            this.player = game.add.sprite(x, y, 'player'); //initPlayer();
        game.physics.arcade.enable(this.player);
        this.player.body.allowGravity = true;
        this.player.body.collideWorldBounds=true;
        this.player.body.gravity.y = 300;
        
       
    }
    
    this.construct(true);

    this.death = function(){
        game.camera.target = null;
        game.camera.flash(0xff0000, 500);
        this.player.kill();

            var x = map.objects.playerStart[0].x; 
        var y =map.objects.playerStart[0].y;
        this.player.x = x;
        this.player.y = y;
        this.player.body.allowGravity = true;
        this.player.body.velocity.set(0);
        this.player.revive(x,y);
        game.camera.targetOffset.set(0);
         cameraFollowPlayer();


    }

    this.moveRight = function(){
        this.player.body.velocity.x = 150;
    }

    this.moveLeft = function(){
        this.player.body.velocity.x = -150; 
    }

    this.stop = function(){
        this.player.body.velocity.x = 0;
    }
    return this;
}