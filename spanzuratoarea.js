const inputSection = document.getElementById("user-input-section");
const photo = document.getElementById("spanzuratoare");
const paragarf = document.getElementById("paragraf");
const btn = document.getElementById("buton1");

let cuvinte = ["Rinocer", "Taur", "Floare", "Septembrie", "Masinarie", "Avalansa"];

let ghicite = 0;

let maxGreseli = 6;

let letters = document.querySelectorAll('#letter');

paragarf.textContent = `Ai 6 incercari pentru a castiga!`;

letters.forEach(letter => {
    letter.addEventListener('click', function(event) {
      let litere = this.textContent.toUpperCase();
      // Verificați dacă litera apăsată există în cuvântul generat
      if (cuvantAles.includes(litere)) {
        // Afișați litera în locul corespunzător în interfața utilizatorului
        let spans = inputSection.getElementsByClassName("dash");
        for (let i = 0; i < cuvantAles.length; i++) {
          if (cuvantAles[i] === litere) {
            spans[i].textContent = litere;
            ghicite++;
            if(ghicite == cuvantAles.length){
              window.alert("Felicitari! Ai castigat!!!");
            }
          }
        }
      } else {
        // Incrementați numărul de greșeli și afișați rezultatul în interfața utilizatorului
        maxGreseli--;
        paragarf.textContent = `Ai gresit! Mai ai ${maxGreseli} incercari.`
        if(maxGreseli === 0) {
          window.alert(`Ai pierdut! Cuvantul era ${cuvantAles}`);
          onReset();  
        } 
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

