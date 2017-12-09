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
         },
         {
            description: `Rozschodzą się pogłoski ze załoga staktu planuje bunt.
Powinnismy zając sie tym jak najszybiciej.`,
            
            options: [
               {
                  text: "Wygłoś przemówienie motywujące do współpracy w tych ciężkich czasach.",
                  effect: function () {
                     COMMONS.stats.ShipHull -= 20;
                     COMMONS.stats.Population -= 1000;
                     
                  },
                  effectdescription : "Twoje przemówienie okazało się porażką. Co prawda udało ci się powstrzymać bunt ale doszło do zamieszek w których zginęli ludzie. Uszkodzone zostały też niektóre pod zespoły.",
               },
               {
                  text: "Wyślij swoich ludzi by stłamsili bunt w zarodku.",
                  effect: function () {
                     COMMONS.stats.Population -= 500;
                  },
                  effectdescription : "Twoi żołnierze rozgromili buntowników, co prawda zginęło wielu ludzi po obu stronach ale udało ci się unikną większych zamieszek.",
               },
               {
                  text: "Przekup lokalnego handlarza informacji, który z chęcią ujawni ci głównych przywódców buntu.",
                  effect: function () {
                     COMMONS.stats.Food -= 20;
                  },
                  effectdescription : "Zaraz po dostarczeniu umówionej liczby racji żywnościowych, otrzymałeś informacje kto organizuje bunt, twoim agentom udało się pozbyć tych niepożądanych załogantów bez najmniejszych problemów.",
               }
            ]
         },{
            description: `Kapitanie! 
Nasi zwiadowcy odkryli planetę, która wygląda na pokrytą roślinnością. 
            
Czy mamy wysłać statki zwiadowcze, by spróbowali zdobyć dodatkową żywność ? `,
            
            options: [
               {
                  text: "Tak, wyślijcie naszych najlepszych ludzi, dodatkowe zaopatrzenie może okazać się bezcenne !",
                  effect: function () {
                     COMMONS.stats.Food += 50;
                  },
                  effectdescription : "Operacja okazała się sukcesem. Zwiadowcą udało się pozyskać znaczącą ilość żywności.",
               },
               {
                  text: "Nie, nie wiemy jakie istoty mogą żyć na tej planecie, nie zaryzykuję życia moich zwiadowców.",
                  effect: function () {
                  },
                  effectdescription : "",
               },
               {
                  text: "Niech nasi zwiadowcy skupią się na poszukiwaniu materiałów. Nasz statek mocno ucierpiał i przydała by mu się naprawa. ",
                  effect: function () {
                        COMMONS.stats.ShipHull += 40;
                        COMMONS.stats.Population -= 50;
                  },
                  effectdescription : "Zwiadowcą udało się zdobyć duże ilości rudy, które niezmiernie wspomogą prace nad naprawą statku, ale wydobycie okazało się ciężkim przedsięwzięciem i wielu zwiadowców nie powróciło.",
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