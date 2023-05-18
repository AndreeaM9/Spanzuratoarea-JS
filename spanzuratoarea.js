const inputSection = document.getElementById("user-input-section");
const photo = document.getElementById("spanzuratoare");
const paragraf = document.getElementById("paragraf");
const btn = document.getElementById("buton1");
let cuvinte = ["Rinocer", "Taur", "Floare", "Septembrie", "Masinarie", "Avalansa"];
let ghicite = 0;
let mesaj = document.getElementById("mesaj");
let maxGreseli = 6;
let letters = document.querySelectorAll('.letter');
let hint = document.getElementById("hint");
let arataHint = document.getElementById("indiciu");

// Alegere cuvânt random
let cuvantAles = cuvinte[Math.floor(Math.random() * cuvinte.length)];
cuvantAles = cuvantAles.toUpperCase();

paragraf.textContent = `Ai 6 încercări pentru a câștiga!`;

// Functionalitate buton Refresh
btn.addEventListener("click", () => {
  window.location.reload();
});

letters.forEach(letter => {
  letter.addEventListener('click', function(event) {
    // Dezactivare litere după apăsare
    letter.setAttribute("disabled", true);
    let litere = this.textContent.toUpperCase();

    // Verificați dacă litera apăsată există în cuvântul generat
    if (cuvantAles.includes(litere)) {
      // Afișați litera în locul corespunzător în interfața utilizatorului
      let spans = inputSection.getElementsByClassName("dash");
      let isAlreadyGuessed = false; // Verificare suplimentară pentru a vedea dacă litera a fost deja ghicită
      for (let i = 0; i < cuvantAles.length; i++) {
        if (cuvantAles[i] === litere && spans[i].textContent === "_") {
          spans[i].textContent = litere;
          ghicite++;
          isAlreadyGuessed = true;
          if (ghicite === cuvantAles.length) {
            for (let j = 0; j < cuvantAles.length; j++) {
              spans[j].textContent = cuvantAles[j];
            }
            mesaj.textContent = "Felicitări! Ai câștigat!!!";
            mesaj.style.display = "block";
            arataHint.style.display = "none";
            onReset();
          }
        }
      }
      if (!isAlreadyGuessed) {
        maxGreseli--;
      }
    } else {
      // Incrementați numărul de greșeli și afișați rezultatul în interfața utilizatorului
      maxGreseli--;
      paragraf.textContent = `Ai greșit! Mai ai ${maxGreseli} încercări.`;

      if(maxGreseli === 0) {
        mesaj.textContent = `Ai pierdut! Cuvantul era ${cuvantAles}`;
        arataHint.style.display = "none";
        letters.forEach(element => {
          element.setAttribute("disabled", true);
        });
        mesaj.style.display = "block";
        onReset()
        photo.querySelectorAll('[id]').forEach(x => x.style.display="block");
      } 

      document.querySelector("#id" + maxGreseli).style.display = 'block';
    }
  });
});


// Inlocuire litera cu span ce conține ( _ ) 
const arataLitera = cuvantAles.replace(/./g, '<span class="dash">_</span>');

// Afisare
inputSection.innerHTML = arataLitera;

document.addEventListener('DOMContentLoaded', onLoad); // Resetare pagina la fiecare deschidere în browser

// Resetare desen la refresh pagina
function onReset() {
  photo.querySelectorAll('[id^="id"]').forEach(x => (x.style.display = "none"));
}

function onLoad() {
  onReset();
  btn.addEventListener("click", onReset); // Refresh pagina la apăsare pe buton
}

// hint.onclick = function() {
//   hints = ['Are un corn mare si ascutit', 'Are ceva cu rosu', 'Pe care se pune albina', 'Prima luna din toamna', 'Totalitatea pieselor care alcatuiesc mecanismul unei masini', 'Cantitate de zapada ce aluneca de pe munte si este un eveniment nedorit'];
//   arataHint.innerHTML = "Indiciu: - " + hints[cuvinte.indexOf(cuvantAles.toLowerCase())];
// }

let hintsMap = {
  "RINOCER": "Are un corn mare si ascutit",
  "TAUR": "Are ceva cu rosu",
  "FLOARE": "Pe care se pune albina",
  "SEPTEMBRIE": "Prima luna din toamna",
  "MASINARIE": "Totalitatea pieselor care alcatuiesc mecanismul unei masini",
  "AVALANSA": "Cantitate de zapada ce aluneca de pe munte si este un eveniment nedorit"
};

hint.onclick = function() {
  arataHint.innerHTML = "Indiciu: " + hintsMap[cuvantAles];
}

// Adăugați un eveniment de clic butonului de hint
hint.addEventListener("click", function() {
  // Comutați clasa "hidden" pentru a ascunde/afișa hint-ul
  arataHint.classList.toggle("hidden");
});