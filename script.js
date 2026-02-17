// Typewriter for Hero Section
const textArray = ["BUG BOUNTY HUNTER", "CYBER SECURITY EXPERT", "WHITE HAT HACKER"];
let textIndex = 0;
let charIndex = 0;
const speed = 100;

function type() {
    if (charIndex < textArray[textIndex].length) {
        document.getElementById("typewriter").innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, speed);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        let currentText = textArray[textIndex].substring(0, charIndex - 1);
        document.getElementById("typewriter").innerHTML = currentText;
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", type);

// Particle Config
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 120 },
        "color": { "value": "#00ff41" },
        "line_linked": { "enable": true, "color": "#00ff41", "opacity": 0.2 }
    }
});
