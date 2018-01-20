function onDeviceReady(){

	var game = new Phaser.Game("100", "100", Phaser.CANVAS, "" );
	game.state.add('boot', Jetman.Boot);
	game.state.add('load', Jetman.PreLoad);
	game.state.add('level1', Jetman.Level1);

	game.state.start('boot');


}

//for web 
window.onload = function() {
  onDeviceReady();
}

// for mobile
//document.addEventListener("deviceready", onDeviceReady, false);

