const inputSection = document.getElementById("user-input-section");
const photo = document.getElementById("spanzuratoare");
const paragraf = document.getElementById("paragraf");
const btn = document.getElementById("buton1");

let cuvinte = ["Rinocer", "Taur", "Floare", "Septembrie", "Masinarie", "Avalansa"];

let ghicite = 0;

let mesaj = document.getElementById("mesaj");

let maxGreseli = 6;

let letters = document.querySelectorAll('#letter');

paragraf.textContent = `Ai 6 incercari pentru a castiga!`;

//Functionalitate buton <Refresh>
btn.addEventListener("click", () => {
  window.location.reload();
})

letters.forEach(letter => {
  letter.addEventListener('click', function(event) {
    //dezactivare litere dupa apasare
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
            onReset();
          }
        }
      }
      } else {
        // Incrementați numărul de greșeli și afișați rezultatul în interfața utilizatorului
        maxGreseli--;
        paragraf.textContent = `Ai gresit! Mai ai ${maxGreseli} incercari.`

        if(maxGreseli === 0) {
          mesaj.textContent = `Ai pierdut! Cuvantul era ${cuvantAles}`;
          letters.forEach(element => {
            element.setAttribute("disabled", true);
          });
          mesaj.style.display = "block";
          onReset()
        } 

        document.querySelector("#id" + maxGreseli).style.display = 'block';
      }
    });
  });


// Alegere cuvant random
let cuvantAles = cuvinte[Math.floor(Math.random() * cuvinte.length)];
cuvantAles = cuvantAles.toUpperCase();



//Aparitiile literelor de pe poz.0 si length-1
// function writeWord(cuvantAles){
//     let litera;
//     cuvantAles.split('').forEach((l,i) =>{
    
//         if(i == 0 || i == cuvantAles.length-1) {
//             litera.textContent = l;
//         }
//     else 
//         litera.k = l;
//         letters.appendChild(litera);
//     });
// };


// Inlocuire litera cu span ce contine ( _ ) 
arataLitera = cuvantAles.replace(/./g, '<span class="dash">_</span>');

// Afisare
inputSection.innerHTML = arataLitera;

document.addEventListener('DOMContentLoaded', onLoad); //resetare pagina la fiecare deschidere in browser
 


 function onLoad(){
    onReset();
    btn.addEventListener('click', onReset);//refresh pagina la apasare pe buton
}

//Resetare desen la refresh pagina
function onReset(){
    photo.querySelectorAll('[id]')
        .forEach(x => x.style.display="none");
}

