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

Player.prototype = Object.create(BABYLON.Mesh.prototype);
Player.prototype.constructor = Player;


Player.prototype.update = function (deltaTime) {
   this.move(deltaTime);
};

Player.prototype.move = function (deltaTime) {
   if (INPUT.d) {
      player.position.x += this.speed * deltaTime;
   }
   if (INPUT.a) {
      player.position.x -= this.speed * deltaTime;
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