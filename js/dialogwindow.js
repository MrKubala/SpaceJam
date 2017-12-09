function getAlertTitle(title) {
   let comTitleFrame = new BABYLON.GUI.Rectangle();
   comTitleFrame.width = "1000px";
   comTitleFrame.height = "60px";
   comTitleFrame.cornerRadius = 6;
   comTitleFrame.color = "#ff2848";
   comTitleFrame.thickness = 4;
   comTitleFrame.background = "#401d06";

   let comTitle = new BABYLON.GUI.TextBlock();
   comTitle.fontFamily = "xirod";
   comTitle.text = title;
   comTitle.color = "white";
   comTitle.fontSize = 32;
   comTitleFrame.addControl(comTitle);

   return comTitleFrame;
}

function getAlertDescription(description) {
   let comDescriptionFrame = new BABYLON.GUI.Rectangle();
   comDescriptionFrame.paddingTop = 30;
   comDescriptionFrame.width = "1200px";
   comDescriptionFrame.height = "300px";
   comDescriptionFrame.cornerRadius = 6;
   comDescriptionFrame.color = "#24676d";
   comDescriptionFrame.thickness = 4;
   comDescriptionFrame.background = "#000000";

   let comDescription = new BABYLON.GUI.TextBlock();
   comDescription.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   comDescription.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   comDescription.fontFamily = "xirod";
   comDescription.textWrapping = true;
   comDescription.paddingTop = 10;
   comDescription.paddingBottom = 10;
   comDescription.paddingLeft = 10;
   comDescription.paddingRight = 10;
   comDescription.text = description;
   comDescription.color = "white";
   comDescription.fontSize = 24;
   comDescriptionFrame.addControl(comDescription);

   return comDescriptionFrame;
}

function getOptionButton(optionId, optionObj) {
   let optionFrame = new BABYLON.GUI.Rectangle();
   optionFrame.paddingTop = 10;
   optionFrame.width = "1200px";
   optionFrame.height = "70px";
   optionFrame.cornerRadius = 6;
   optionFrame.color = "#256d3f";
   optionFrame.thickness = 4;
   optionFrame.background = "#000000";

   let optionButton = new BABYLON.GUI.Button.CreateSimpleButton(optionId, optionObj.text);
   optionButton.fontFamily = "xirod";
   optionButton.color = "white";
   optionButton.thickness = 0;
   optionFrame.addControl(optionButton);

   return optionFrame;
}

function showEventWindow() {
   // GUI
   let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

   // Background
   let image = new BABYLON.GUI.Image("window_background", "assets/futureui1.png");
   image.width = 0.95;
   image.height = 0.95;
   advancedTexture.addControl(image);


   let panel = new BABYLON.GUI.StackPanel();
   panel.top = 60;
   // panel.background = "#ffffff";
   panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   advancedTexture.addControl(panel);

   let randomEvent = COMS.event.eventVariations[Math.floor(Math.random()*COMS.event.eventVariations.length)];

   panel.addControl(getAlertTitle(COMS.event.title));
   panel.addControl(getAlertDescription(randomEvent.description));
   panel.addControl(getOptionButton('option0', randomEvent.options[0]));
   panel.addControl(getOptionButton('option1', randomEvent.options[1]));
   panel.addControl(getOptionButton('option2', randomEvent.options[2]));
}