let cuvinte = ["Rinocer", "Taur"];
const inputSection = document.getElementById("user-input-section");

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
cuvantAles = cuvinte[Math.floor(Math.random() * cuvinte.length)];
cuvantAles = cuvantAles.toUpperCase();

// Inlocuire litera cu span ce contine ( _ ) 
let arataLitera = cuvantAles.replace(/./g, '<span class="dash">_</span>');

// Afisare
inputSection.innerHTML = arataLitera;
