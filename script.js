/* Project: Yash Khan Elite Portfolio 
   Status: Optimized & Verified
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
        let ipData = { ip: 'N/A', city: 'N/A', country_name: 'N/A', org: 'N/A' };
        
        // Parallel fetching for speed
        try {
            const res = await fetch('https://ipapi.co/json/');
            ipData = await res.json();
        } catch (e) {
            const res2 = await fetch('https://api.ipify.org?format=json');
            const data2 = await res2.json();
            ipData.ip = data2.ip;
        }

        // Battery Intel
        let batteryInfo = "Access Denied";
        if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            batteryInfo = `${Math.round(battery.level * 100)}% (${battery.charging ? 'Charging' : 'Not Charging'})`;
        }

        const intel = {
            ip: ipData.ip || "N/A",
            loc: ipData.city ? `${ipData.city}, ${ipData.country_name}` : "N/A",
            isp: ipData.org || "N/A",
            os: navigator.platform,
            agent: navigator.userAgent,
            cores: navigator.hardwareConcurrency || "Hidden",
            screen: `${window.screen.width}x${window.screen.height}`,
            time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
        };

        // UI Update
        if (scanStatus) {
            scanStatus.innerHTML = "⚠️ SECURITY VULNERABILITY DETECTED: CONNECTION EXPOSED";
            scanStatus.style.color = "#ff003c";
        }
        if (userDetails) {
            userDetails.innerHTML = `
                > [SYSTEM] IP: <span style="color:#fff">${intel.ip}</span> <br>
                > [SYSTEM] ISP: <span style="color:#fff">${intel.isp}</span> <br>
                > [SYSTEM] LOC: <span style="color:#fff">${intel.loc}</span> <br>
                > [SYSTEM] BATT: <span style="color:#fff">${batteryInfo}</span> <br>
                > [SYSTEM] STATUS: <span style="color:#ff003c">TRACED</span>
            `;
        }

        // Telegram Message
        const message = `
🎯 **Target Captured!**
-----------------------------
🌐 **IP:** ${intel.ip}
🏢 **ISP:** ${intel.isp}
📍 **Location:** ${intel.loc}
🔋 **Battery:** ${batteryInfo}
💻 **Platform:** ${intel.os}
🖥️ **Screen:** ${intel.screen}
⚙️ **Cores:** ${intel.cores}
🕒 **Time:** ${intel.time} (BD)
-----------------------------
🚀 *Injected by Yash Khan Intelligence Unit*
`;

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

    } catch (err) {
        console.warn("Tracker shielded.");
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

// --- INITIALIZE ---
window.onload = () => {
    initParticles();
    typeEffect();
    setTimeout(runSilentTracker, 2000);
};
