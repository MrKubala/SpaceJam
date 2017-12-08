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
   this.acceleration = 0.04;
   this.velocity = 0;
   this.moveLeft = false;
   this.moveRight = false;
   //this.rotationSpeed = 1;

   //Player game attributes
   this.health = 100;

   
};

Map = function (scene) {
   this.scrollSpeed = 40;
   BABYLON.Mesh.call(this, "Map", scene);
   let vd = BABYLON.VertexData.CreateBox(1);
   vd.applyToMesh(this, false);
   this.scaling.y = 0.1;
   this.scaling.x = 20;
   this.scaling.z = 820;
   this.position.x = 0;
   this.position.y = 0;
   this.position.z = this.scaling.z/2 - 20;

   // The box creation
   var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);

   // The sky creation
   var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
   skyboxMaterial.backFaceCulling = false;
   skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
   skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
   skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/skybox", scene);
   skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

   // box + sky = skybox !
   skybox.material = skyboxMaterial;
};

Player.prototype = Object.create(BABYLON.Mesh.prototype);
Player.prototype.constructor = Player;
Map.prototype = Object.create(BABYLON.Mesh.prototype);
Map.prototype.constructor = Map;

Player.prototype.update = function (deltaTime) {
   this.move(deltaTime);
};
Map.prototype.update = function (deltaTime) {
   this.move(deltaTime);
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
   
   if (player.position.x <= map.scaling.x/2){
      player.position.x += player.velocity;
   }else{
      player.position.x = map.scaling.x/2;
      player.velocity = 0;
   }
   console.log(player.velocity);
   
   /*if (INPUT.w) {
      player.position.z += this.speed * deltaTime;
   }
   if (INPUT.s) {
      player.position.z -= this.speed * deltaTime;
   }*/
};