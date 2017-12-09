Player = function (size, scene) {
   // Call the super class BABYLON.Mesh
   BABYLON.Mesh.call(this, "Player", scene);
   // Creates a our ship
   let vd = BABYLON.VertexData.CreateBox(size);
   // Apply the box shape to our mesh
   vd.applyToMesh(this, false);
   this.scene = scene;

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

Map = function (scene) {
   this.scrollSpeed = 40;
   BABYLON.Mesh.call(this, "Map", scene);
   let vd = BABYLON.VertexData.CreateBox(1);
   //vd.applyToMesh(this, false);
   this.scaling.y = 0.1;
   this.scaling.x = 20;
   this.scaling.z = 2420;
   this.position.x = 0;
   this.position.y = 0;
   this.position.z = this.scaling.z/2 - 20;

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

Asteroid = function (scene, mapSize, posZ) {
   BABYLON.Mesh.call(this, "Asteroid " + posZ, scene);
   let vd = BABYLON.VertexData.CreateBox(1);
   vd.applyToMesh(this, false);
   let posX = Math.floor(Math.random() * mapSize) - mapSize/2;
   this.isAlive = true;
   this.isVisible = true;
   this.position = new BABYLON.Vector3(posX, this.position.y/2, posZ);
}

Food = function (scene, mapSize, posZ) {
   BABYLON.Mesh.call(this, "Food " + posZ, scene);
   let vd = BABYLON.VertexData.CreateSphere(0.5);
   vd.applyToMesh(this, false);
   vd.emissiveColor = new BABYLON.Color3(1, 0, 0);
   let posX = Math.floor(Math.random() * mapSize) - mapSize/2;
   this.isAlive = true;
   this.isVisible = true;
   this.position = new BABYLON.Vector3(posX, this.position.y/2, posZ);
}

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
}
Asteroid.prototype.update = function (deltaTime) {
   this.move(deltaTime);
   if(this.position.z - player.position.z < 10 && this.intersectsMesh(player, false)){
      this.dies();
   }
   
}
Asteroid.prototype.clean = function(){
   if(this.position.z < player.position.z - 10){
      this.isAlive = false;
      this.dispose();
   }
}
Food.prototype.clean = function(){
   if(this.position.z < player.position.z - 10){
      this.isAlive = false;
      this.dispose();
   }
}
Food.prototype.update = function (deltaTime) {
   this.move(deltaTime);
   if(this.position.z - player.position.z < 10 && this.intersectsMesh(player, false)){
      this.dies();
   }
};
Asteroid.prototype.move = function (deltaTime) {
   if (this.position.z >= (-map.scaling.z)/2){
      this.position.z -= map.scrollSpeed * deltaTime 
   }
}
Food.prototype.move = function (deltaTime) {
   if (this.position.z >= (-map.scaling.z)/2){
      this.position.z -= map.scrollSpeed * deltaTime
   }
}
Asteroid.prototype.dies = function (){
   COMMONS.stats.ShipHull -= 10;
   if(COMMONS.stats.ShipHull <= 0) {
      player.isAlive = false;
      console.log("Ship is destroyed,game should end here !");
   }
   console.log("Player Health count: " + COMMONS.stats.ShipHull  );
   this.isAlive = false;
}
Food.prototype.dies = function (){
   COMMONS.stats.Food += 1;
   console.log("Food count: " + COMMONS.stats.Food );
   this.isAlive = false;
}
Map.prototype.move = function (deltaTime) {
   if (map.position.z >= (-map.scaling.z)/2){
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
   if ( (!INPUT.d && !INPUT.a)  && Math.abs(player.velocity) < 0.01){
      player.velocity = 0
   }if (player.velocity > 2){
      player.velocity = 2
   }

   if (player.position.x >= -(map.scaling.x/2)){
      player.position.x += player.velocity;
   }else{
      player.position.x = -(map.scaling.x/2);
      player.velocity = 0;
   }
   if(player.position.z >=(map.position.z + map.scaling.z/2)){
      player.velocityz += 1 * deltaTime;
      player.position.z += player.velocityz;
   }
   if (player.position.x <= map.scaling.x/2){
      player.position.x += player.velocity;
   }else{
      player.position.x = map.scaling.x/2;
      player.velocity = 0;
   }
};