let canvas = document.getElementById("renderCanvas"); // Get the canvas element
let engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let player;
let scene;
let map;
let asteroidField = [];
let foodList = [];

let isLevelFinished = false;
let isLevelPlaying = false;

window.addEventListener("resize", function () { // Watch for browser/canvas resize events
   engine.resize();
});

let fadeInSound = function (deltaTime, sound, maxVolume = 0.1, volumeDelta = 0.01) {
   if (sound.getVolume() < maxVolume) {
      sound.setVolume(sound.getVolume() + (volumeDelta * deltaTime));
   }
   else {
      sound.setVolume(maxVolume);
   }
};

function loadSounds() {
   SOUNDS.music = new BABYLON.Sound("Music", "assets/bensound-scifi.mp3", scene,
           function () {
              // Sound has been downloaded & decoded
              SOUNDS.music.setVolume(0);
              SOUNDS.music.play();
           }, {loop: true});

   SOUNDS.spaceAmbient = new BABYLON.Sound("spaceAmbient", "assets/sounds/ambience-space-00.wav", scene,
           function () {
              // Sound has been downloaded & decoded
              SOUNDS.spaceAmbient.setVolume(0);
              SOUNDS.spaceAmbient.play();
           }, {loop: true});
   SOUNDS.gameOverSong = new BABYLON.Sound("gameOverSong", "assets/sounds/game-over-song.mp3", scene,
           function () {
              SOUNDS.gameOverSong.setVolume(0.6);
           }, {});
   SOUNDS.shipExplosion = new BABYLON.Sound("spaceAmbient", "assets/sounds/ship-destruction.wav", scene,
           function () {
              SOUNDS.shipExplosion.setVolume(0.5);
           }, {});
   SOUNDS.wilhelScream = new BABYLON.Sound("spaceAmbient", "assets/sounds/wilhelm-Scream.mp3", scene,
           function () {
              SOUNDS.wilhelScream.setVolume(0.8);
           }, {});
   SOUNDS.menuSelect = new BABYLON.Sound("spaceAmbient", "assets/sounds/menu-select-00.wav", scene,
           function () {
              SOUNDS.menuSelect.setVolume(0.2);
           }, {});
}

function initializeActors(mapsize, scrollSpeed, asteroidDensity, foodDensity) {
   player = new Player(1, scene);
   map = new Map(scene, scrollSpeed, mapsize);
   for (let i = mapsize - 20; i >= 200; i -= asteroidDensity) {
      let asteroidMeshInstance = MESH_REPO.rock1.createInstance('rock' + i);
      asteroidField.push(new Asteroid(scene, asteroidMeshInstance, map.scaling.x, i + 5));
   }
   for (let i = mapsize - 20; i >= 200; i -= foodDensity) {
      let stationMeshInstance = MESH_REPO.station.createInstance('station' + i);
      MESH_REPO.station._children.forEach(function (mesh, index) {
         let meshInstance = mesh.createInstance("meshInstance" + " " + i + " " + index);
         meshInstance.parent = stationMeshInstance;
      });
      stationMeshInstance.isVisible = false;
      foodList.push(new Food(scene, stationMeshInstance, map.scaling.x, i ));
   }
}

let createScene = function () {
   // Create the scene space
   scene = new BABYLON.Scene(engine);
   scene.debugLayer.show();
   loadSounds();

   scene.assetsManager = new BABYLON.AssetsManager(scene);
   let shipMeshTask = scene.assetsManager.addMeshTask("ship mesh task", "", "assets/models/ship/", "VulcanDKyrClass.obj");
   let rock1MeshTask = scene.assetsManager.addMeshTask("rock1 mesh task", "", "assets/models/rock1/", "Rock1.obj");
   let stationMeshTask = scene.assetsManager.addMeshTask("station mesh task", "", "assets/models/station/", "station1.obj");

   shipMeshTask.onSuccess = function (task) {
      MESH_REPO.ship = BABYLON.MeshBuilder.CreateBox("shipAnchor", {height: 1, width: 2.9, depth: 3.5}, scene);
      MESH_REPO.ship.isVisible = false;
      task.loadedMeshes.forEach(function (mesh) {
         mesh.setParent(MESH_REPO.ship);
      });
      MESH_REPO.ship.rotation.y = Math.PI;
   };
   rock1MeshTask.onSuccess = function (task) {
      task.loadedMeshes[0].dispose();
      MESH_REPO.rock1 = task.loadedMeshes[1];
      MESH_REPO.rock1.isVisible = false;
      MESH_REPO.rock1.scaling.x = 0.1;
      MESH_REPO.rock1.scaling.y = 0.5;
      MESH_REPO.rock1.scaling.z = 0.2;
   };
   stationMeshTask.onSuccess = function (task) {
      MESH_REPO.station = BABYLON.MeshBuilder.CreateBox("stationAnchor", {height: 1, width: 1, depth: 1}, scene);
      MESH_REPO.station.isVisible = false;
      task.loadedMeshes.forEach(function (mesh) {
         mesh.scaling.x = 0.1;
         mesh.scaling.y = 0.1;
         mesh.scaling.z = 0.1;
         mesh.isVisible = false;
         mesh.setParent(MESH_REPO.station);
      });
   };

   // Add lights to the scene
   let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
   let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
   // Add a camera to the scene and attach it to the canvas
   let camera = new BABYLON.FreeCamera("UniversalCamera", new BABYLON.Vector3(0, 7, -20), scene);

   scene.actionManager = new BABYLON.ActionManager(scene);
   scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
      INPUT[evt.sourceEvent.key.toLowerCase()] = true;
   }));
   scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
      INPUT[evt.sourceEvent.key.toLowerCase()] = false;
   }));

   // showEventWindow();

   return scene;
};


function main() {
   createScene(); //Call the createScene function
   scene.assetsManager.load();
   scene.assetsManager.onFinish = function (tasks) {
      initializeActors(COMMONS.mapvalues.mapsize, COMMONS.mapvalues.scrollspeed, COMMONS.mapvalues.asteroiddensity, COMMONS.mapvalues.fooddensity);
      render();
   }
}

function updateAsteroids(deltaTime) {
   asteroidField.forEach(function (asteroid, index) {
      asteroid.update(deltaTime);
      if (asteroid.isAlive === false) {
         asteroid.meshInstance.dispose();
         asteroid.dispose();
         asteroidField.splice(index, 1);
      }
   });
}

function updateFood(deltaTime) {
   foodList.forEach(function (food, index) {
      food.update(deltaTime);
      if (food.isAlive === false) {
         food.dispose();
         foodList.splice(index, 1);
      }
   });
}

function render() {
   let firstFrame = true;
   engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
      let deltaTime = engine.getDeltaTime() / 1000;

      if(COMMONS.gameStatus === 0){
         showIntroWindow();
         COMMONS.gameStatus = 1;
      } else if (isLevelPlaying) {

         fadeInSound(deltaTime, SOUNDS.music, 0.05);
         fadeInSound(deltaTime, SOUNDS.spaceAmbient, 0.3, 0.1);

         player.update(deltaTime);
         map.update(deltaTime);
         if (player.isAlive) {
            if (!firstFrame) {
               updateAsteroids(deltaTime);
               updateFood(deltaTime);
            } else {
               firstFrame = false;
            }
         }
         if (isLevelFinished) {
            player.dispose();
            map.skybox.dispose();
            map.dispose();
            foodList.forEach(function (food, index) {
               food.dispose();
            });
            asteroidField.forEach(function (asteroid, index) {
               asteroid.dispose();
            });
            
            showEventWindow();
            COMMONS.mapvalues.scrollspeed += 5;
            COMMONS.mapvalues.asteroiddensity -= 5;
            COMMONS.mapvalues.fooddensity += 10;
            initializeActors(COMMONS.mapvalues.mapsize, COMMONS.mapvalues.scrollspeed, COMMONS.mapvalues.asteroiddensity, COMMONS.mapvalues.fooddensity);
            isLevelFinished = false;
         }

      }

      scene.render();
   });
}
