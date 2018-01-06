Jetman.Text = {
	displayRiseAndFadeOutText: function(x,y, text, game){
		var style = { font: "20px Arial", fill: "#ffffff", align: "center" };
		var myText =  game.add.text(x,y, text, style);
		game.add.tween(myText).to({
			y: y -100
		}, 1000, Phaser.Easing.Linear.None, true);
		game.add.tween(myText).to({
			alpha: 0
		}, 1000, Phaser.Easing.Linear.None, true);
	}
}