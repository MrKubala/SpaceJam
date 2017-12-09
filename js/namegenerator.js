let names = ["Eladia", "Zandra", "Ferdinand", "Afton", "Winnifred", "Sherron", "Pearline", "Windy", "Siu", "Astrid", "Long", "Fiona", "Martina", "Kristyn", "Darla", "Gabrielle", "Marquita", "Wm", "Yuonne", "Julienne", "Elden", "Le", "Faith", "Lorelei", "Jacalyn", "Sherlene", "Noah", "Lanny", "Rachael", "Sherell", "Scot", "Refugia", "Shasta", "Leona", "Pedro", "Dallas", "Bobbye", "Delia", "Zulema", "Tera", "Florentina", "Cassaundra", "Latina", "Renae", "Bernardina", "Carline", "Fredda", "Pinkie", "Luke", "Lelah"];
let surnames = ["Goffman", "Zajac", "Stauffer", "Rishikof", "Ceder", "Schopenhauer", "Macnaughton", "Dumornay", "Froelicher", "Myerson", "Longworth", "Kugel", "Santeusanio", "Tanase", "Glashow", "Upton", "Mattis", "Alexander", "Schwedock", "Belasco", "Flake", "Edwards", "Gine", "Weitz", "Corsano", "Deas", "Soberman", "Croson", "Pankey", "Stretch", "Roach", "Jain", "Roy", "Thisted", "Venzo", "Wettlaufer", "Reimann", "Calverley", "Litin", "Bradley", "Shier", "Addison", "Quon", "Arakelian", "Venanzoni", "Temes", "Kishi", "Hiemstra", "Brooke", "Penny", "Mcconkey", "Raphael", "Mccallum", "Piccarreta", "Lovitz", "Bolick", "Sutton", "Lehman", "Haley", "Lamki", "Gilbert", "Mauro", "Malis", "Feagin", "Greenfeld", "Ellenberger", "Zander" - "star", "Scannell", "Baboian", "Leonardi", "Deoliveira", "Basterfield", "Hehir", "Ragusa", "Weissberg", "Kyprianou", "Godschalx", "Watt", "Koivumaki", "Eide", "Berzuini", "Ruskin", "Sarkar", "Saban", "Corkery", "Shimotomai", "Dionysius", "Tivegna", "Laino", "Scardovi", "Sheffels", "Swartz", "Holmberg", "Bedard", "Zane", "Moravcsik"];

function getRandomName() {
   let name = names[Math.floor(Math.random() * names.length)];
   let surname = surnames[Math.floor(Math.random() * surnames.length)];

   return name + ' ' + surname;
}

function getStringWithListOfRandomNames(amount) {
   let names = [];
   for (let i = 0; i < amount; i++) {
      names.push(getRandomName());
   }
   return names.join(",  ");
}