const playButton = document.getElementsByClassName('play')[0];
const resetButton = document.getElementsByClassName('reset')[0];
const lapButton = document.getElementsByClassName('lap')[0];
const laps = document.getElementsByClassName('laps')[0]
const clearButton = document.getElementsByClassName('lap-clear-button')[0];

// Selection de mes class pour le time
const seconde = document.getElementsByClassName('seconde')[0];
const minute = document.getElementsByClassName('minute')[0];
const centiSeconde = document.getElementsByClassName('mseconde')[0];

const bg = document.getElementsByClassName('outer-circle')[0];

let isPlay = false;
let min; 
let sec;
let centiSec;

let secCounter = 0;
let centiCounter = 0;
let minCounter = 0;
let isReset = false;
let lapItem = 0;
// Initalisation des seconde avec setInterval 

// inialisation de 'toggleButton' pour retirer la class 'hidden' 
const toggleButton = () => {
    lapButton.classList.remove("hidden")
    resetButton.classList.remove("hidden")
}

// On appele notre fonction 'toggleButton' ajoutant une condition . 
const play = () => {
    // Si le bouton et clicker tu maffiche Pause sinon tu m'afiche play et tu lance le chronos
    if (!isPlay && !isReset) {
        playButton.innerHTML = "Pause";
        // Attribution de notre animations qui est dans une class
        bg.classList.add("animation-bg");

        min = setInterval(() => {
            minute.innerHTML = `${++minCounter} :`;
        },60*1000);

        // On ajoute a notre variable 'sec' le setIntervalle
        sec = setInterval(() => {
            seconde.innerHTML = `&nbsp;${++secCounter} :`;
            // Si seconde arrive a 60 tu le remet a 0 . 
            if (secCounter === 60) {
                secCounter = 0;

                
            }
            
        }, 1000);


    centiSec = setInterval(() => {
        // SI le miliseconde arrive a 100 tu remet a zero .
        if (centiCounter === 100 ) {
            centiCounter = 0
        }
        centiSeconde.innerHTML = `&nbsp;${++centiCounter} `;
    }, 10);

        isPlay = true;
        isReset = true;
    } else {
        playButton.innerHTML = "Play ";
        // On arrete le temps et l'animation 
        bg.classList.remove("animation-bg");
        clearInterval(sec)
        clearInterval(centiSec)
        clearInterval(min)
        isPlay = false;
        isReset = false;

    }
    toggleButton();

}



const reset = () => {
    isReset = true;
    play();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    seconde.innerHTML = "&nbsp;0 :"
    centiSeconde.innerHTML = '&nbsp;0';
    minute.innerHTML = "0 :"
    

}
// Enregistrement de mon chrono en ajoutant des éléments a notre HTML 
const lap = () => {
    const li = document.createElement('li');
    const number = document.createElement('span');
    const timeStamp = document.createElement('span');

    // Attribution de la class dans mon li 

    li.setAttribute('class','lap-item');
    number.setAttribute("class","number");
    timeStamp.setAttribute("class","time-stamp");

    number.innerHTML =`#${++lapItem} | `;
    timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

    li.append(number,timeStamp)
    laps.append(li)

    clearButton.classList.remove('hidden')
    
    


}

const clearAll = () => {
        laps.innerHTML = ""
        laps.append(clearButton);
        clearButton.classList.add('hidden')
}


// Au click tu active la fonction
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click",lap);
clearButton.addEventListener("click",clearAll);