let _advancedTexture;

function getCleanAdvancedTextureForUI() {
   if (_advancedTexture !== undefined)
      _advancedTexture.dispose();

   _advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
   return _advancedTexture
}

function getAlertTitle(title, alignLeft = false) {
   let comTitleFrame = new BABYLON.GUI.Rectangle();
   comTitleFrame.width = "1000px";
   comTitleFrame.height = "60px";
   comTitleFrame.cornerRadius = 6;
   comTitleFrame.color = "#ff2848";
   comTitleFrame.thickness = 4;
   comTitleFrame.background = "#401d06";

   let comTitle = new BABYLON.GUI.TextBlock();
   if (alignLeft) {
      comTitle.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      comTitle.left = 20;
   }
   comTitle.fontFamily = "xirod";
   comTitle.text = title;
   comTitle.color = "white";
   comTitle.fontSize = 32;
   comTitleFrame.addControl(comTitle);

   return comTitleFrame;
}

function getAlertDescription(description, height = "500px") {
   let comDescriptionFrame = new BABYLON.GUI.Rectangle();
   comDescriptionFrame.paddingTop = 30;
   comDescriptionFrame.width = "1200px";
   comDescriptionFrame.height = height;
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

function getOptionButton(optionId = 'optionButton', eventOptions) {
   let buttonFrame = new BABYLON.GUI.Rectangle();
   buttonFrame.paddingTop = 10;
   buttonFrame.width = "1200px";
   buttonFrame.height = "70px";
   buttonFrame.cornerRadius = 6;
   buttonFrame.color = "#256d3f";
   buttonFrame.thickness = 4;
   buttonFrame.background = "#000000";

   let button = new BABYLON.GUI.Button.CreateSimpleButton(optionId, eventOptions.text);
   button.fontFamily = "xirod";
   button.color = "white";
   button.thickness = 0;
   buttonFrame.addControl(button);

   button.onPointerUpObservable.add(function () {
      SOUNDS.menuSelect.play();
      showTurnSummaryWindow(eventOptions);
   });

   return buttonFrame;
}

function getContinueButton(functionToCall, optionId = 'continueButton') {
   let buttonFrame = new BABYLON.GUI.Rectangle();
   buttonFrame.paddingTop = 10;
   buttonFrame.width = "1200px";
   buttonFrame.height = "70px";
   buttonFrame.cornerRadius = 6;
   buttonFrame.color = "#256d3f";
   buttonFrame.thickness = 4;
   buttonFrame.background = "#000000";

   let button = new BABYLON.GUI.Button.CreateSimpleButton(optionId, COMS.summary.continueButton);
   button.fontFamily = "xirod";
   button.color = "white";
   button.thickness = 0;
   buttonFrame.addControl(button);

   button.onPointerUpObservable.add(functionToCall);

   return buttonFrame;
}


function showEventWindow() {
   // GUI
   let uiTexture = getCleanAdvancedTextureForUI();

   // Background
   let image = new BABYLON.GUI.Image("window_background", "assets/futureui1.png");
   image.width = 0.95;
   image.height = 0.95;
   uiTexture.addControl(image);


   let panel = new BABYLON.GUI.StackPanel();
   panel.top = 60;
   // panel.background = "#ffffff";
   panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   uiTexture.addControl(panel);

   let randomEvent = COMS.event.eventVariations[Math.floor(Math.random() * COMS.event.eventVariations.length)];

   panel.addControl(getAlertTitle(COMS.event.title));
   panel.addControl(getAlertDescription(randomEvent.description));
   panel.addControl(getOptionButton('option0', randomEvent.options[0]));
   panel.addControl(getOptionButton('option1', randomEvent.options[1]));
   panel.addControl(getOptionButton('option2', randomEvent.options[2]));
}

function showTurnSummaryWindow(eventOption) {
   // GUI
   let uiTexture = getCleanAdvancedTextureForUI();

   // Background
   let image = new BABYLON.GUI.Image("window_background", "assets/futureui1.png");
   image.width = 0.95;
   image.height = 0.95;
   uiTexture.addControl(image);


   let panel = new BABYLON.GUI.StackPanel();
   panel.top = 60;
   // panel.background = "#ffffff";
   panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   uiTexture.addControl(panel);
   eventOption.effect();

   panel.addControl(getAlertTitle(COMS.event.title));
   let foodComm = "Masz " + COMMONS.stats.Food + " ton jedzenia.\n";
   foodComm += "Dla populacji " + COMMONS.stats.Population + " minimalna ilość żywności to " + getFoodDemand() + "t.\n";
   COMMONS.stats.Food -= getFoodDemand();
   if (COMMONS.stats.Food > 0) {
      foodComm += "Tym razem udało ci się wykarmić wszystkich.";
   } else {
      let number = Math.abs(COMMONS.stats.Food);
      foodComm += "Brakło " + number + "t jedzenia. Z głodu umarło " + (number * 20000) + " ludzi.";
      COMMONS.stats.Population -= number * 20000;
   }

   panel.addControl(getAlertDescription(eventOption.effectdescription + "\n\n" + foodComm));
   panel.addControl(getContinueButton(function () {
      SOUNDS.menuSelect.play();
      isLevelPlaying = true;
      _advancedTexture.dispose();
      showStats();
   }));
}

function showShipDestroyedWindow() {
   // GUI
   let uiTexture = getCleanAdvancedTextureForUI();

   // Background
   let blackBackground = new BABYLON.GUI.Rectangle();
   blackBackground.width = 1;
   blackBackground.height = 1;
   blackBackground.cornerRadius = 0;
   blackBackground.thickness = 0;
   blackBackground.background = "#bab9b9";
   uiTexture.addControl(blackBackground);

   let image = new BABYLON.GUI.Image("window_background", "assets/futureui1.png");
   image.width = 0.95;
   image.height = 0.95;
   uiTexture.addControl(image);


   let panel = new BABYLON.GUI.StackPanel();
   panel.top = 60;
   panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   uiTexture.addControl(panel);

   panel.addControl(getAlertTitle(COMS.shipDestroyed.title));
   panel.addControl(getAlertDescription(COMS.shipDestroyed.description));
}

function showIntroWindow() {
   // GUI
   let uiTexture = getCleanAdvancedTextureForUI();

   // Background
   let blackBackground = new BABYLON.GUI.Rectangle();
   blackBackground.width = 1;
   blackBackground.height = 1;
   blackBackground.cornerRadius = 0;
   blackBackground.thickness = 0;
   blackBackground.background = "#bab9b9";
   uiTexture.addControl(blackBackground);

   let image = new BABYLON.GUI.Image("window_background", "assets/futureui1.png");
   image.width = 0.95;
   image.height = 0.95;
   uiTexture.addControl(image);


   let panel = new BABYLON.GUI.StackPanel();
   panel.top = 60;
   panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   uiTexture.addControl(panel);

   panel.addControl(getAlertTitle(COMS.intro.title));
   panel.addControl(getAlertDescription(COMS.intro.description));
   panel.addControl(getContinueButton(function () {
      SOUNDS.menuSelect.play();
      isLevelPlaying = true;
      _advancedTexture.dispose();
      showStats();
   }));
}

function getSanityBasedEnding() {
   if (COMMONS.stats.Sanity >= 0 && COMMONS.stats.Population > 500000) {
      return COMS.destination_good;
   } else if (COMMONS.stats.Sanity < -50) {
      return COMS.destination_mad;
   } else {
      return COMS.destination_bad;
   }
}

function showAtDestinationWindow() {
   // GUI
   let uiTexture = getCleanAdvancedTextureForUI();

   let image = new BABYLON.GUI.Image("window_background", "assets/futureui1.png");
   image.width = 0.95;
   image.height = 0.95;
   uiTexture.addControl(image);

   let panel = new BABYLON.GUI.StackPanel();
   panel.top = 60;
   panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   uiTexture.addControl(panel);

   let ending = getSanityBasedEnding();

   panel.addControl(getAlertTitle(ending.title));
   panel.addControl(getAlertDescription(ending.description));
   let peopleYouKilled = 'Zabiłeś tych ludzi: \n\n' + getStringWithListOfRandomNames(40);
   panel.addControl(getAlertDescription(peopleYouKilled, "400px"));

   setTimeout(showAtDestinationWindow, 3000);
}

function showStats() {
   // GUI
   let uiTexture = getCleanAdvancedTextureForUI();

   let panel = new BABYLON.GUI.StackPanel();
   panel.top = 60;
   panel.left = 60;
   panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
   panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   uiTexture.addControl(panel);

   panel.addControl(getAlertTitle("Stan Poszycia: " + COMMONS.stats.ShipHull, true));
   panel.addControl(getAlertTitle("Populacja: " + COMMONS.stats.Population, true));
   panel.addControl(getAlertTitle("Tony żywności: " + COMMONS.stats.Food, true));
}