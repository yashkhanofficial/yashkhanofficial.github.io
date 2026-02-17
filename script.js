/* Project: Yash Khan Elite Portfolio - JavaScript Logic
   Features: Telegram Silent Tracker, Typewriter Effect, Hardware Detection
*/

// --- 1. CONFIGURATION (Apnar deya details) ---
const TELEGRAM_BOT_TOKEN = '8417349416:AAELDlI_n0uuMJkD9zr4g_T-9w3AGUIWMEQ';
const TELEGRAM_CHAT_ID = '7950771882';

// --- 2. TYPEWRITER EFFECT ---
const textArray = [
    "CYBER SECURITY STRATEGIST", 
    "OFFENSIVE PENETRATION TESTER", 
    "WHITE HAT HACKER", 
    "DIGITAL FORENSICS EXPERT"
];
let textIndex = 0;
let charIndex = 0;
let isErasing = false;
const typeSpeed = 100;
const eraseSpeed = 50;
const delayBetweenWords = 2000;

function typeEffect() {
    const typewriterElement = document.getElementById("typewriter");
    if (!typewriterElement) return;

    const currentWord = textArray[textIndex];
    
    if (isErasing) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingDelay = isErasing ? eraseSpeed : typeSpeed;

    if (!isErasing && charIndex === currentWord.length) {
        typingDelay = delayBetweenWords;
        isErasing = true;
    } else if (isErasing && charIndex === 0) {
        isErasing = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingDelay = 500;
    }

    setTimeout(typeEffect, typingDelay);
}

// --- 3. SILENT TRACKER & SECURITY SCAN ---
async function runSilentTracker() {
    const scanStatus = document.getElementById('scan-status');
    const userDetails = document.getElementById('user-details');

    try {
        // Fetch IP and Location Data
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();

        // Get Battery Information
        let batteryInfo = "Access Denied";
        if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            batteryInfo = `${Math.round(battery.level * 100)}% (${battery.charging ? 'Charging' : 'Discharging'})`;
        }

        // Gather Device Intel
        const intel = {
            ip: ipData.ip || "Unknown",
            city: ipData.city || "Unknown",
            country: ipData.country_name || "Unknown",
            isp: ipData.org || "Unknown",
            os: navigator.platform,
            browser: navigator.userAgent.split(' ').pop(),
            screen: `${window.screen.width}x${window.screen.height}`,
            cores: navigator.hardwareConcurrency || "N/A",
            time: new Date().toLocaleString()
        };

        // UI Update (Trust Building)
        if (scanStatus && userDetails) {
            scanStatus.innerHTML = "⚠️ SECURITY VULNERABILITY DETECTED: DATA EXPOSED";
            scanStatus.style.color = "#ff003c";
            userDetails.innerHTML = `
                <span style="color: #fff;">[+] IP_ADDRESS:</span> ${intel.ip}<br>
                <span style="color: #fff;">[+] LOCATION:</span> ${intel.city}, ${intel.country}<br>
                <span style="color: #fff;">[+] ISP_PROVIDER:</span> ${intel.isp}<br>
                <span style="color: #fff;">[+] BATTERY_LEVEL:</span> ${batteryInfo}<br>
                <span style="color: #fff;">[+] HARDWARE_CORES:</span> ${intel.cores}<br>
                <span style="color: #fff;">[+] SYSTEM_STATUS:</span> VULNERABLE
            `;
        }

        // Prepare Telegram Payload
        const telegramMsg = `
🎯 **New Visitor Tracked!**
-----------------------------
👤 **Identity:** ${intel.ip}
📍 **Location:** ${intel.city}, ${intel.country}
🏢 **ISP:** ${intel.isp}
🔋 **Battery:** ${batteryInfo}
💻 **OS:** ${intel.os}
🖥️ **Screen:** ${intel.screen}
⚙️ **Cores:** ${intel.cores}
🕒 **Time:** ${intel.time}
🌐 **Browser:** ${navigator.userAgent}
-----------------------------
🚀 *Sent from Yash Khan's Portfolio*
`;

        // Send Data to Telegram Bot
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMsg,
                parse_mode: 'Markdown'
            })
        });

    } catch (err) {
        if (scanStatus) scanStatus.innerHTML = "Error: Connection Encrypted or Tracker Blocked.";
        console.error("Tracker Error:", err);
    }
}

// --- 4. PARTICLES.JS CONFIGURATION ---
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ff41" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#00ff41", 
                    "opacity": 0.2, 
                    "width": 1 
                },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
}

// --- 5. INITIALIZE ALL FUNCTIONS ---
window.onload = () => {
    initParticles();
    typeEffect();
    // 3 second delay for "Scanning" feel
    setTimeout(runSilentTracker, 2000);
};

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
