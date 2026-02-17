// Typewriter Effect
const text = "Discovering Vulnerabilities. Securing the Future. Defending Bangladesh.";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    }
}

window.onload = () => {
    typeWriter();
    // Initialize Particles from previous code...
};

// Particles.js Config (Shortened for brevity)
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 100 },
        "color": { "value": "#00ff41" },
        "line_linked": { "enable": true, "color": "#00ff41" }
    }
});
