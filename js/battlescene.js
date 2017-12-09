Player = function (size, scene) {
   // Call the super class BABYLON.Mesh
   BABYLON.Mesh.call(this, "Player", scene);

   this.isAlive = true;

   // Its position is in (0,0,0)
   this.position.x = 0;
   this.position.z = 0;
   this.position.y = size / 2;

   // Movement attributes
   this.speed = 10;
   this.acceleration = 0.1;
   this.velocity = 0;
   this.moveLeft = false;
   this.moveRight = false;
   this.velocityz = 0;
};

Map = function (scene, scrollSpeed, mapSize) {
   this.scrollSpeed = scrollSpeed;
   BABYLON.Mesh.call(this, "Map", scene);
   let vd = BABYLON.VertexData.CreateBox(1);
   //vd.applyToMesh(this, false);
   this.scaling.y = 0.1;
   this.scaling.x = 20;
   this.scaling.z = mapSize;
   this.position.x = 0;
   this.position.y = 0;
   this.position.z = this.scaling.z / 2 - 20;

   // The box creation
   this.skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);

   // The sky creation
   var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
   skyboxMaterial.backFaceCulling = false;
   skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
   skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
   skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/skybox", scene);
   skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

   // box + sky = skybox !
   this.skybox.material = skyboxMaterial;

};

Asteroid = function (scene, meshInstance, mapSize, posZ) {
   BABYLON.Mesh.call(this, "Asteroid " + posZ, scene);
   let posX = Math.floor(Math.random() * mapSize) - mapSize / 2;
   this.isAlive = true;
   this.meshInstance = meshInstance;
   this.position = new BABYLON.Vector3(posX, this.position.y / 2, posZ);
   this.meshInstance.position = this.position;

   this.angularSpeed = {
      x: Math.random(),
      y: Math.random(),
      z: Math.random()
   }
};

Food = function (scene, meshInstance, mapSize, posZ) {
   BABYLON.Mesh.call(this, "Food " + posZ, scene);
   let posX = Math.floor(Math.random() * mapSize) - mapSize / 2;
   this.isAlive = true;
   this.meshInstance = meshInstance;
   this.position = new BABYLON.Vector3(posX, this.position.y / 2, posZ);
   this.meshInstance.position = this.position;
   this.delta = Math.random() * 100;
};

Player.prototype = Object.create(BABYLON.Mesh.prototype);
Player.prototype.constructor = Player;
Map.prototype = Object.create(BABYLON.Mesh.prototype);
Map.prototype.constructor = Map;
Asteroid.prototype = Object.create(BABYLON.Mesh.prototype);
Asteroid.prototype.constructor = Asteroid;
Food.prototype = Object.create(BABYLON.Mesh.prototype);
Food.prototype.constructor = Food;

Player.prototype.update = function (deltaTime) {
   this.move(deltaTime);
};
Map.prototype.update = function (deltaTime) {
   this.move(deltaTime);
   this.skybox.rotation.x += 0.004 * deltaTime;
};
Asteroid.prototype.update = function (deltaTime) {
   this.move(deltaTime);
   if (this.position.z - player.position.z < 5 && this.meshInstance.intersectsMesh(MESH_REPO.ship, true)) {
      this.dies();
   }
};
Asteroid.prototype.clean = function () {
   if (this.position.z < player.position.z - 10) {
      this.isAlive = false;
      this.dispose();
   }
};
Food.prototype.clean = function () {
   if (this.position.z < player.position.z - 10) {
      this.isAlive = false;
      this.meshInstance.dispose();
      this.dispose();
   }
}
Food.prototype.update = function (deltaTime) {
   this.move(deltaTime);
   if (this.position.z - player.position.z < 10 && this.meshInstance.intersectsMesh(MESH_REPO.ship, false)) {
      this.dies();
   }
};
Asteroid.prototype.move = function (deltaTime) {
   if (this.position.z >= (-map.scaling.z) / 2) {
      this.position.z -= map.scrollSpeed * deltaTime
   }
   this.meshInstance.rotation.x += this.angularSpeed.x * deltaTime;
   this.meshInstance.rotation.y += this.angularSpeed.y * deltaTime;
   this.meshInstance.rotation.z += this.angularSpeed.z * deltaTime;

   this.meshInstance.position.z = this.position.z;
}
Food.prototype.move = function (deltaTime) {
   this.meshInstance.rotation.y += (Math.PI / 2) * deltaTime;
   this.delta += 2 * deltaTime;
   this.meshInstance.position.y = Math.cos(this.delta / 2);
   if (this.position.z >= (-map.scaling.z) / 2) {
      this.position.z -= map.scrollSpeed * deltaTime
   }
}
Asteroid.prototype.dies = function () {
   SOUNDS.impact.play();
   COMMONS.stats.ShipHull -= 5;
   showStats();

   if (Math.random() * 5 < 1) {
      SOUNDS.wilhelScream.play();
      COMMONS.stats.Population -= Math.floor(Math.random() * 50000);
      showStats();
   } else {
      COMMONS.stats.Population -= Math.floor(Math.random() * 10000);
      showStats();
   }

   if (COMMONS.stats.ShipHull <= 0) {
      player.isAlive = false;
      console.log("Ship is destroyed,game should end here !");
      SOUNDS.music.stop();
      SOUNDS.spaceAmbient.stop();
      SOUNDS.shipExplosion.play();
      SOUNDS.gameOverSong.play();
      isLevelPlaying = false;
      showShipDestroyedWindow();
   }
   console.log("Player Health count: " + COMMONS.stats.ShipHull);
   this.isAlive = false;
}
Food.prototype.dies = function () {
   SOUNDS.pickup.play();
   COMMONS.stats.Food += 1;
   showStats();
   console.log("Food count: " + COMMONS.stats.Food);
   this.meshInstance.dispose();
   this.isAlive = false;
}
Map.prototype.move = function (deltaTime) {
   if (map.position.z >= (-map.scaling.z) / 2) {
      map.position.z -= this.scrollSpeed * deltaTime
   }
}

Player.prototype.move = function (deltaTime) {
   if (INPUT.d) {

      player.velocity += this.acceleration * deltaTime;

   }
   if (INPUT.a) {

      player.velocity -= this.acceleration * deltaTime;

   }
   if (INPUT.space) {
      //player.position.x -= this.speed * deltaTime;
   }
   if ((!INPUT.d && !INPUT.a) && Math.abs(player.velocity) < 0.01) {
      player.velocity = 0
   }
   if (player.velocity > 2) {
      player.velocity = 2
   }

   if (player.position.x >= -(map.scaling.x / 2)) {
      player.position.x += player.velocity;
   } else {
      player.position.x = -(map.scaling.x / 2);
      player.velocity = 0;
   }
   if (player.position.z >= (map.position.z + map.scaling.z / 2)) {
      player.velocityz += 1 * deltaTime;
      player.position.z += player.velocityz;
   }
   if (player.position.x <= map.scaling.x / 2) {
      player.position.x += player.velocity;
   } else {
      player.position.x = map.scaling.x / 2;
      player.velocity = 0;
   }
   if (player.position.z >= map.scaling.z / 4) {
      isLevelFinished = true;
      isLevelPlaying = false;
   }
   MESH_REPO.ship.position.x = player.position.x;
   MESH_REPO.ship.position.z = player.position.z;
};