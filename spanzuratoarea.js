const inputSection = document.getElementById("user-input-section");
const photo = document.getElementById("spanzuratoare");
const paragraf = document.getElementById("paragraf");
const btn = document.getElementById("buton1");
let cuvinte = ["Rinocer", "Taur", "Floare", "Septembrie", "Masinarie", "Avalansa"];
let cuvUsoare = []
let ghicite = 0;
let mesaj = document.getElementById("mesaj");
let maxGreseli = 6;
let letters = document.querySelectorAll('.letter');
let hint = document.getElementById("hint");
let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");

// Alegere cuvânt random
let cuvantAles = cuvinte[Math.floor(Math.random() * cuvinte.length)];
cuvantAles = cuvantAles.toUpperCase();

paragraf.textContent = `Ai 6 încercări pentru a câștiga!`;

// Functionalitate buton Refresh
btn.addEventListener("click", () => {
  window.location.reload();
});

letters.forEach((letter, index) => {
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
          if (ghicite === cuvantAles.length - 1) {
            for (let j = 0; j < cuvantAles.length; j++) {
              if (spans[j].textContent === "_") {
                spans[j].textContent = cuvantAles[j];
                ghicite++;
              }
            }
            mesaj.textContent = "Felicitări! Ai câștigat!!!";
            mesaj.style.display = "block";
            letters.forEach((element, elementIndex) => {
              if (elementIndex !== index) {
                element.setAttribute("disabled", true);
              }
            });
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

      if (maxGreseli === 0) {
        mesaj.textContent = `Ai pierdut! Cuvantul era ${cuvantAles}`;
        letters.forEach((element, elementIndex) => {
          if (elementIndex !== index) {
            element.setAttribute("disabled", true);
          }
        });
        mesaj.style.display = "block";
        onReset();
        photo.querySelectorAll('[id]').forEach(x => x.style.display = "block");
      }

      document.querySelector("#id" + maxGreseli).style.display = 'block';
    }
  });
});



// Inlocuire litera cu span ce conține ( _ ) 
let arataLitera = "";
for (let i = 0; i < cuvantAles.length; i++) {
  if (cuvantAles[i] === " ") {
    arataLitera += " "; // Adaugă spațiu în cazul în care litera este un spațiu
  } else {
    arataLitera += `<span class="dash" id="letter${i + 1}">_</span>`; // Generează elementul <span> pentru fiecare literă
  }
}

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


// let hintsMap = {
//   "RINOCER": "Are un corn mare si ascutit",
//   "TAUR": "Animal și zodie",
//   "FLOARE": "Ceva pe care se pune albina",
//   "SEPTEMBRIE": "Prima luna din toamna",
//   "MASINARIE": "Totalitatea pieselor care alcatuiesc mecanismul unei masini",
//   "AVALANSA": "Cantitate de zapada ce aluneca de pe munte si este un eveniment nedorit"
// };



let litereAfișate = [];
let spans = inputSection.getElementsByClassName("dash"); // Mutare aici pentru a asigura inițializarea corectă

let hintLetterIndices = []; // Adăugăm un array pentru a stoca indicii literelor corespunzătoare hint-ului

hint.onclick = function() {
  let availableLetters = cuvantAles.split('').filter(litera => !litereAfișate.includes(litera));
  if (availableLetters.length > 0) {
    let randomIndex = Math.floor(Math.random() * availableLetters.length);
    hintLetter = availableLetters[randomIndex]; // Inițializăm variabila aici cu valoarea aleasă


    // Verificăm dacă litera se repetă în cuvânt
    hintLetterIndices = [];
    for (let i = 0; i < cuvantAles.length; i++) {
      if (cuvantAles[i] === hintLetter) {
        hintLetterIndices.push(i);
      }
    }

    // Afișăm litera în locul potrivit în interfață pentru fiecare index
    hintLetterIndices.forEach(index => {
      let hintSpan = document.getElementById("letter" + (index + 1));
      hintSpan.textContent = hintLetter;
    });

    hint.setAttribute('disabled', true);
    litereAfișate.push(hintLetter);

    // Dezactivăm butonul corespunzător hint-ului
    // hintButton.setAttribute('disabled', true);

     // Verificăm dacă este ultima literă de ghicit
     if (ghicite === cuvantAles.length - hintLetterIndices.length) {
      for (let j = 0; j < cuvantAles.length; j++) {
        if (spans[j].textContent === "_") {
          spans[j].textContent = cuvantAles[j];
          ghicite++;
        }
      }
      mesaj.textContent = "Felicitări! Ai câștigat!!!";
      mesaj.style.display = "block";
      letters.forEach(element => {
        element.setAttribute("disabled", true);
      });
      onReset();
    }
  }
};

