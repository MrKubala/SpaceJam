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
   },
   shipDestroyed: {
      title: "ARKA ZNISZCZONA",
      description: `Arka zniszczona na skutek twojego dowództwa... 
      
Budowana przez dziesięciolecia ostateczna nadzieja ludzkości mająca zapewnić przerwanie jest zniszczona przez CIEBIE

6 640 100 osób w jednej chwili wyparowało, a wraz z nimi ślad po ludzkiej rasie. Wszystko przez CIEBIE.

Jak się z tym czujesz w swojej kapitańskiej kapsule? Dobrze, że choć nie masz jak popełnić bezbolesnego samobójstwa.
Powinieneś powoli gnić przez kolejne 10 lat. I tak to za mało abyś odpukutował swoje czyny...`
   }
};