function showDialogWindow() {
   // GUI
   let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

   let text1 = new BABYLON.GUI.TextBlock();
   text1.text = "Hello world";
   text1.color = "white";
   text1.fontSize = 24;
   advancedTexture.addControl(text1);
}