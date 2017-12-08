function showDialogWindow() {
   // GUI
   let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

   // Background
   let image = new BABYLON.GUI.Image("but", "assets/futureui1.png");
   image.width = 0.95;
   image.height = 0.95;
   advancedTexture.addControl(image);

   let comTitleFrame = new BABYLON.GUI.Rectangle();
   comTitleFrame.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   comTitleFrame.top = 80;
   comTitleFrame.width = "1000px";
   comTitleFrame.height = "60px";
   comTitleFrame.cornerRadius = 6;
   comTitleFrame.color = "#ff2848";
   comTitleFrame.thickness = 4;
   comTitleFrame.background = "#401d06";
   advancedTexture.addControl(comTitleFrame);

   let comTitle = new BABYLON.GUI.TextBlock();
   comTitle.fontFamily = "xirod";
   comTitle.text = "NADCHODZĄCY KOMUNIAT";
   comTitle.color = "white";
   comTitle.fontSize = 32;
   comTitleFrame.addControl(comTitle);

   let comDescriptionFrame = new BABYLON.GUI.Rectangle();
   comDescriptionFrame.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   comDescriptionFrame.top = 150;
   comDescriptionFrame.width = "1200px";
   comDescriptionFrame.height = "300px";
   comDescriptionFrame.cornerRadius = 6;
   comDescriptionFrame.color = "#24676d";
   comDescriptionFrame.thickness = 4;
   comDescriptionFrame.background = "#000000";
   advancedTexture.addControl(comDescriptionFrame);

   let comDescription = new BABYLON.GUI.TextBlock();
   comDescription.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   comDescription.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   comDescription.fontFamily = "xirod";
   comDescription.paddingTop = 10;
   comDescription.paddingBottom = 10;
   comDescription.paddingLeft = 10;
   comDescription.paddingRight = 10;
   comDescription.text = `Odebrano sygnał. W pobliżu wykryto...
   ...
   ...
   Co robić wasza ekscelencjo kapitanie-dowódco-naczelny?`;
   comDescription.color = "white";
   comDescription.fontSize = 24;
   comDescriptionFrame.addControl(comDescription);
}