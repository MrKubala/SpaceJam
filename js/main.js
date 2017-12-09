let canvas = document.getElementById("renderCanvas"); // Get the canvas element
let engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let player;
let scene;
let map;
let asteroidField = [];

window.addEventListener("resize", function () { // Watch for browser/canvas resize events
   engine.resize();
});

let fadeInMusic = function (deltaTime) {
   let maxVolume = 0.1;
   if (SOUNDS.music.getVolume() < maxVolume) {
      SOUNDS.music.setVolume(SOUNDS.music.getVolume() + (0.01 * deltaTime));
   }
   else {
      SOUNDS.music.setVolume(maxVolume);
   }
};

function loadSounds() {
   SOUNDS.music = new BABYLON.Sound("Music", "assets/bensound-scifi.mp3", scene,
           function () {
              // Sound has been downloaded & decoded
              SOUNDS.music.setVolume(0);
              SOUNDS.music.play();
           }, {loop: true});

   SOUNDS.spaceAmbient = new BABYLON.Sound("spaceAmbient", "assets/sounds/ambience-space-00.wav", scene, null, {});
   SOUNDS.menuSelect = new BABYLON.Sound("spaceAmbient", "assets/sounds/menu-select-00.wav", scene, null, {});
}

let createScene = function () {
   // Create the scene space
   scene = new BABYLON.Scene(engine);
   scene.debugLayer.show();
   loadSounds();

   // Add lights to the scene
   let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
   let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

   player = new Player(1, scene);
   map = new Map(scene);
   for (let i = 2400; i = i - 10; i <= 0) {
      asteroidField.push(new Asteroid(scene, map.scaling.x, i));
   }
   // Add a camera to the scene and attach it to the canvas
   let camera = new BABYLON.FreeCamera("UniversalCamera", new BABYLON.Vector3(0, player.position.z + 7, -20), scene);
   camera.maxZ = 2000;

   scene.actionManager = new BABYLON.ActionManager(scene);
   scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
      INPUT[evt.sourceEvent.key.toLowerCase()] = true;
   }));
   scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
      INPUT[evt.sourceEvent.key.toLowerCase()] = false;
   }));

   //showDialogWindow();

   return scene;
};


function main() {
   createScene(); //Call the createScene function

   engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
      let deltaTime = engine.getDeltaTime() / 1000;
      fadeInMusic(deltaTime);
      player.update(deltaTime);
      map.update(deltaTime);
      for (a of asteroidField) {
         a.update(deltaTime);
      }
      scene.render();
   });
}
