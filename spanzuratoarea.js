const inputSection = document.getElementById("user-input-section");
const photo = document.getElementById("spanzuratoare");
const letters = document.getElementById("letter");
const btn = document.getElementById("buton1");

let cuvinte = ["Rinocer", "Taur", "Floare", "Septembrie", "Masinarie", "Avalansa"];

document.querySelector('.keywords').onclick = function(event) {
    // La fiecare apasare returneaza litera apasata
    let a = event.target.innerHTML;
    let litere = cuvinte[0].split("")
    toUpper = function(litere) {
        return litere.toUpperCase()
    }
    // Transformare litere cuvant, s-ar putea sa nu avem nevoie de el mai incolo
    litere = litere.map(toUpper)
    if(litere.includes(a)) {
        console.log("Ieii")
    }
}

// Alegere cuvant random
let cuvantAles = cuvinte[Math.floor(Math.random() * cuvinte.length)];
cuvantAles = cuvantAles.toUpperCase();



//Aparitiile literelor de pe poz.0 si length-1
function writeWord(cuvantAles){
    let litera;
    cuvantAles.split('').forEach((l,i) =>{
    
        if(i == 0 || i == cuvantAles.length-1) {
            litera.textContent = l;
        }
    else 
        litera.k = l;
        letters.appendChild(litera);
    });
};


// Inlocuire litera cu span ce contine ( _ ) 
arataLitera = cuvantAles.replace(/./g, '<span class="dash">_</span>');

// Afisare
inputSection.innerHTML = arataLitera;

document.addEventListener('DOMContentLoaded', onLoad); //resetare pagina la fiecare deschidere in browser
 
 let maxGreseli = 6;

 function onLoad(){
    onReset();
    btn.addEventListener('click', onReset);//refresh pagina la apasare pe buton
}

//Resetare desen la refresh pagina
function onReset(){
    photo.querySelectorAll('[id]')
        .forEach(x => x.style.display="none");
}

