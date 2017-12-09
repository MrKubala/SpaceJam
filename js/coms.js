const COMS = {
      event: {
         title: `NADCHODZĄCY KOMUNIAT`,
         eventVariations: [
            {
               description: `Rozchodzą się pogłoski ze załoga statku planuje bunt.
               Powinniśmy zając się tym jak najszybciej.`,
               
               options: [
                  {
                     text: `Wygłoś przemówienie motywujące do współpracy w tych ciężkich czasach.`,
                     effect: function () {
                        COMMONS.stats.ShipHull -= 20;
                        COMMONS.stats.Population -= 100000;
                        COMMONS.stats.Sanity -=10;
                     },
                     effectdescription : `Twoje przemówienie okazało się porażką. Co prawda udało ci się powstrzymać bunt ale doszło do zamieszek w których zginęli ludzie. Uszkodzone zostały też niektóre pod zespoły.
                     
                     Efekty:
                     Poszycie - 20
                     Populacja - 100000
                     `,
                  },
                  {
                     text: `Wyślij swoich ludzi by stłamsili bunt w zarodku.`,
                     effect: function () {
                        COMMONS.stats.Population -= 5000;
                        COMMONS.stats.Sanity -=5;
                     },
                     effectdescription : `Twoi żołnierze rozgromili buntowników, co prawda zginęło wielu ludzi po obu stronach ale udało ci się unikną większych zamieszek.
                     
                     Efekty:
                     Populacja - 5000
                     `,
                  },
                  {
                     text: `Przekup lokalnego handlarza informacji, który z chęcią ujawni ci głównych przywódców buntu.`,
                     effect: function () {
                        COMMONS.stats.Food -= 20;
                        COMMONS.stats.Sanity +=5;
                     },
                     effectdescription : `Zaraz po dostarczeniu umówionej liczby racji żywnościowych, otrzymałeś informacje kto organizuje bunt, twoim agentom udało się pozbyć tych niepożądanych załogantów bez najmniejszych problemów.
                     
                     Efekty:
                     Tony Żywności - 20
                     `,
                  }
               ]
            },
            {
               description: `Kapitanie! 
   Nasi zwiadowcy odkryli planetę, która wygląda na pokrytą roślinnością. 
               
   Czy mamy wysłać statki zwiadowcze, by spróbowali zdobyć dodatkową żywność ? `,
               
               options: [
                  {
                     text: `Tak, wyślijcie naszych najlepszych ludzi, dodatkowe zaopatrzenie może okazać się bezcenne !`,
                     effect: function () {
                        COMMONS.stats.Food += 50;
                        COMMONS.stats.Sanity +=5;
                     },
                     effectdescription : `Operacja okazała się sukcesem. Zwiadowcą udało się pozyskać znaczącą ilość żywności.
                                       
                     Efekty:
                     Tony Żywności + 50
                     `,
                  },
                  {
                     text: `Nie, nie wiemy jakie istoty mogą żyć na tej planecie, nie zaryzykuję życia moich zwiadowców.`,
                     effect: function () {
                           COMMONS.stats.Sanity -=10;
                     },
                     effectdescription : `Twoja depresja się pogłębia.`,
                  },
                  {
                     text: `Niech nasi zwiadowcy skupią się na poszukiwaniu materiałów. Nasz statek mocno ucierpiał i przydała by mu się naprawa. `,
                     effect: function () {
                           COMMONS.stats.ShipHull += 40;
                           COMMONS.stats.Population -= 50;
                     },
                     effectdescription : `Zwiadowcą udało się zdobyć duże ilości rudy, które niezmiernie wspomogą prace nad naprawą statku, ale wydobycie okazało się ciężkim przedsięwzięciem i wielu zwiadowców nie powróciło.
                                                         
                     Efekty:
                     Poszycie + 40
                     Populacja - 50`
                  }
               ]
            },
            {
               description: `Kapitanie !
   
   W jednej z sekcji statku wybuchła groźna epidemia. Musimy zareagować szybko póki zagrożenie jeszcze się nie rozprzestrzeniło.`,
               
               options: [
                  {
                     text: `Odetnijcie sekcję nie możemy pozwolić by ta choroba dalej się rozprzestrzeniała !`,
                     effect: function () {
                        COMMONS.stats.Population -= 300000;
                        COMMONS.stats.Sanity -=30;
                     },
                     effectdescription : `Jednym ruchem udało ci się powstrzymać epidemię. Niestety wielu pasażerów zapłaciło za to wysoką cenę.
   
                     Efekty:
                     Populacja - 300 000`,
                  },
                  {
                     text: `Wyślijcie zapasy żywności i medykamentów musimy pomóc tym biedakom jak tylko się da.`,
                     effect: function () {
                           COMMONS.stats.Population -= 10000;
                           COMMONS.stats.Food -= 50;
                           COMMONS.stats.Sanity +=20;
                     },
                     effectdescription : `Udało ci się zatrzymać zarazę, ale kosztowało to dużą ilość zapasów.
                     
                     Efekty:
                     Populacja - 10 000
                     Tony Żywności - 50
                     `,
                  },
                  {
                     text: `Wypuście całe powietrze z zarażonego sektora oraz zwołajcie naszych najlepszy uzdatniaczy pożywienia, nic nie może się zmarnować!`,
                     effect: function () {
                           COMMONS.stats.Population -= 300000;
                           COMMONS.stats.Food += 50;
                           COMMONS.stats.Sanity -=50;
                     },
                     effectdescription : `Twój plan został wprowadzony w życie, ale twoi podkomendni nie wyglądają na zachwyconych.
                     
                     Efekty:
                     Populacja - 300 000
                     Tony Żywności + 50`,
                  }
               ]
            },
            {
               description: `Podczas rozmowy z jednym ze swoich poruczników dowiadujesz się o nowej religii, która powstała w jednym z sektorów. 
           
   Jej wyznawcy wieżą podobno w ogromną kałamarnicę pływającom przez przestrzeń kosmiczną.
               `,
               
               options: [
                  {
                     text: `Kolejna głupota którą nie warto zawracać sobie głowy.`,
                     effect: function () {
                           COMMONS.stats.Sanity +=5;
                     },
                    effectdescription : ``
                  },
                  {
                     text: `Trzeba pozbyć się tych szarlatanów jak najszybciej. Natychmiast aresztujcie członków tego kultu.`,
                     effect: function () {
                           COMMONS.stats.Population -= 10000;
                           COMMONS.stats.Sanity -=5;
                     },
                     effectdescription : `Kult został wytempiony
                     
                     Efekty:
                     Populacja - 1000`,
                  },
                  {
                     text: `Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn !`,
                     effect: function () {
                           COMMONS.stats.Population -= 1;
                           COMMONS.stats.Sanity -=20;
                     },
                     effectdescription : `...`,
                  }
               ]
            },
            {
               description: `Na mostku panuje ponury nastrój, jeden z twoich podkomendnych proponuje urządzanie imprezy w celu wzmocnienia morale`,
               
               options: [
                  {
                     text: `Świetny pomysł !`,
                     effect: function () {
                           COMMONS.stats.Sanity +=5;
                           OMMONS.stats.Food -= 20
                     },
                    effectdescription : `Impreza była świetna, morale znacznie się podniosły ale, zmarnowaliśmy tez duzo surowców
                    
                    Efekty:
                    Tony Żywności - 20`
                  },
                  {
                     text: `Wzmocnienie naszego morale jest niezwykle ważne, ale musimy oszczędzać żywność, trzeba znaleźć inny sposób.`,
                     effect: function () {
                           COMMONS.stats.Sanity -=10;
                     },
                     effectdescription : `Ponury nastrój pogłębia się.`,
                  },
                  {
                     text: `To że pojawiają się takie propozycje jest oburzające, wszyscy powinni wrócić do pracy.`,
                     effect: function () {
                           COMMONS.stats.Food += 20;
                           COMMONS.stats.ShipHull +=20;
                           COMMONS.stats.Sanity -=5;
                     },
                     effectdescription : `Zagonienie ludzi do pracy zaowocowało dodatkowym prowiantem i przyspieszeniem napraw, ale ludzie są niezadowoleni.
                     
                     Efekty:
                     Poszycie + 20
                     Tony Żywności + 20`,
                  }
               ]
            }
         ]
      },
   
      summary: {
         title: `RAPORT`,
         continueButton: `KONTYNUUJ`
      },
      shipDestroyed: {
         title: `ARKA ZNISZCZONA`,
         description: `Arka zniszczona na skutek twojego dowództwa... 
         
   Budowana przez dziesięciolecia ostateczna nadzieja ludzkości mająca zapewnić przerwanie jest zniszczona przez CIEBIE
   
   600 000 osób w jednej chwili wyparowało, a wraz z nimi ślad po ludzkiej rasie. Wszystko przez CIEBIE.
   
   Jak się z tym czujesz w swojej kapitańskiej kapsule? Dobrze, że choć nie masz jak popełnić bezbolesnego samobójstwa.
   Powinieneś powoli gnić przez kolejne 10 lat. I tak to za mało abyś odpukutował swoje czyny...`
      },
      intro: {
         title: `POCZATEK PODROZY`,
         description: `
   Ziemia została zniszczona przez chmurę meteorytów, teraz jedyna pozostałą grupą ludzi jest ta zebrana na Arce, 600 000 osób zawieszonych w przestrzeni, cel podróży życia, Słońce 2.0 niedawno odkryta gwiazda, z potencjalnym nowym domem. 
         
   Czy wystarczy im jedzenia ? Jedyna szansa w zbieraniu pozostałosci z wczesniejszych prób kolonizacji kosmosu.
         
   Dzielni pionierzy wyruszają w podróż, natomiast nienawistne meteory pozostają w pogoni.`
         
      }
   };