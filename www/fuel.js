Jetman.Fuel = {
    
    FuelAmount: {
        SMALL: 100,
        MED: 200,
        LARGE: 300,
        XL: 400
    },

    init: function(map, game) {

        this.group = game.add.group();
        this.group.enableBody = true;

        //       this.fuelXl = game.add.group();
        // this.fuelXl.enableBody = true;

        for (var i = 0; i < map.objects.fuel.length; i++) {
            map.objects.fuel[i].properties = {};
            switch (map.objects.fuel[i].type) {
                case "s":
                    map.objects.fuel[i].properties.velocity = Jetman.Fuel.FuelAmount.SMALL;
                    map.objects.fuel[i].gid = 1;
                    break;
                case "m":
                    map.objects.fuel[i].properties.velocity = Jetman.Fuel.FuelAmount.MED;
                    map.objects.fuel[i].gid = 2;
                    break;
                case "l":
                    map.objects.fuel[i].properties.velocity = Jetman.Fuel.FuelAmount.LARGE;
                    map.objects.fuel[i].gid = 3;
                    break;
                case "xl":
                    map.objects.fuel[i].properties.velocity = Jetman.Fuel.FuelAmount.XL;
                    map.objects.fuel[i].gid = 4;
            }
        }

        map.createFromObjects('fuel', 1, 'fuelLow', 0, true, false, this.group, Phaser.Sprite, false, false);
        map.createFromObjects('fuel', 2, 'fuelMed', 0, true, false, this.group, Phaser.Sprite, false, false);
        map.createFromObjects('fuel', 3, 'fuelHigh', 0, true, false, this.group, Phaser.Sprite, false, false);
        map.createFromObjects('fuel', 4, 'fuelXl', 0, true, false, this.group, Phaser.Sprite, false, false);

        // this.group.callAll('animations.add', 'animations', 'glow', [0,1,2,3], 10, true);
        // this.group.callAll('animations.play', 'animations', 'glow');

    },

    onFuelOverlap: function(playerObj, fuel) {
        if (fuel.key === 'fuelXl') {
            player.player.body.allowGravity = false;
            game.camera.lerp.y = 0.05
            game.camera.targetOffset.y = -game.height / 2;
            particles.startParticleBurstNoTimeout();
        } else {
            Jetman.Player.fuel = fuel.velocity;
        }
    }
};