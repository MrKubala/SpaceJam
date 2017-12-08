Player = function (size, scene) {
   // Call the super class BABYLON.Mesh
   BABYLON.Mesh.call(this, "BattleScene", scene);
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
      if (player.position.x <= map.scaling.x/2 - 2){
         player.position.x += this.speed * deltaTime;
      }      
   }
   if (INPUT.a) {
      if (player.position.x >= -(map.scaling.x/2) + 2){
         player.position.x -= this.speed * deltaTime;
      }
   }
   if (INPUT.space) {
      //player.position.x -= this.speed * deltaTime;
   }
   /*if (INPUT.w) {
      player.position.z += this.speed * deltaTime;
   }
   if (INPUT.s) {
      player.position.z -= this.speed * deltaTime;
   }*/
};