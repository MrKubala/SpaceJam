const COMS = {
   event: {
      title: "NADCHODZĄCY KOMUNIAT",
      eventVariations: [
         {
            description: `Odebrano sygnał. W pobliżu wykryto...
...
...
...
...
Co robić wasza ekscelencjo kapitanie-dowódco-naczelny adsf asf asf asdf ?`,
            options: [
               {
                  text: "Wyślij ludzi na planetę pomimo promieniowania aby zdobyli potrzebne minerały",
                  effect: function () {
                     COMMONS.stats.ShipHull += 5;
                     COMMONS.stats.Population -= 100;
                  }
               },
               {
                  text: "Wyślij ludzi na planetę pomimo promieniowania aby zdobyli potrzebne minerały2",
                  effect: function () {
                     COMMONS.stats.ShipHull += 5;
                     COMMONS.stats.Population -= 100;
                  },

               },
               {
                  text: "Wyślij ludzi na planetę pomimo promieniowania aby zdobyli potrzebne minerały3",
                  effect: function () {
                     COMMONS.stats.ShipHull += 5;
                     COMMONS.stats.Population -= 100;
                  }
               }
            ]
         }
      ]
   },
   summary: {
      title: "RAPORT",
      continueButton: "KONTYNUUJ"
   }
};