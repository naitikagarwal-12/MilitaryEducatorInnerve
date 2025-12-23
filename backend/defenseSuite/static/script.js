let timerInterval;
let currentQuestions = [];
let userAnswers = [];

// --- CORE FUNCTIONS ---
function startTest(type) {
    userAnswers = [];
    fetch('/api/get_test', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: type})
    })
    .then(r => r.json())
    .then(data => {
        openModal(type + " TEST");
        currentQuestions = data.data;
        
        if (data.mode === 'quiz') {
            renderOIR(data.data);
            startTimer(data.time, submitOIR);
        } else if (data.mode === 'slide') {
            renderWAT(data.data, 0, data.time);
        } else if (data.mode === 'input_list') {
            renderSRT(data.data);
            startTimer(data.time, submitSRT);
        }
    });
}

// --- RENDERERS ---
function renderOIR(qs) {
    let html = '';
    qs.forEach((q, i) => {
        html += `<div style="background:white; padding:10px; margin-bottom:10px; border:1px solid #ccc;">
            <strong>Q${i+1}: ${q.q}</strong><br>
            ${q.options.map(o => `<label style="margin-right:10px;"><input type="radio" name="q${i}" value="${o}"> ${o}</label>`).join('')}
        </div>`;
    });
    html += '<button class="btn-block" onclick="submitOIR()">SUBMIT OIR</button>';
    document.getElementById('m-content').innerHTML = html;
}

function renderSRT(qs) {
    let html = '';
    qs.forEach((q, i) => {
        html += `<div style="margin-bottom:15px;">
            <strong>Situation ${i+1}:</strong> ${q}<br>
            <input type="text" id="srt-${i}" style="width:100%; padding:8px; margin-top:5px;" placeholder="Your reaction...">
        </div>`;
    });
    html += '<button class="btn-block" onclick="submitSRT()">SUBMIT SRT</button>';
    document.getElementById('m-content').innerHTML = html;
}

function renderWAT(words, idx, time) {
    if(idx >= words.length) { submitWAT(); return; }
    
    document.getElementById('m-content').innerHTML = `
        <div style="text-align:center; margin-top:40px;">
            <h1 style="font-size:3rem; margin-bottom:20px;">${words[idx]}</h1>
            <input type="text" id="wat-input" style="font-size:1.2rem; padding:10px; width:70%;" autofocus>
            <p style="color:red; font-weight:bold;">Next in: <span id="w-timer">${time}</span>s</p>
        </div>`;
    
    document.getElementById('wat-input').focus();
    
    let t = time;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        t--;
        document.getElementById('w-timer').innerText = t;
        if(t<=0) saveWatAndNext(words, idx, time);
    }, 1000);

    document.getElementById('wat-input').onkeydown = (e) => {
        if(e.key === 'Enter') saveWatAndNext(words, idx, time);
    };
}

function saveWatAndNext(words, idx, time) {
    let val = document.getElementById('wat-input').value;
    userAnswers.push(val || "NO RESPONSE");
    renderWAT(words, idx+1, time);
}

// --- SUBMIT ---
function submitOIR() {
    userAnswers = [];
    currentQuestions.forEach((q, i) => {
        let el = document.querySelector(`input[name="q${i}"]:checked`);
        userAnswers.push(el ? el.value : "");
    });
    sendData('OIR');
}

function submitSRT() {
    userAnswers = [];
    currentQuestions.forEach((q, i) => {
        userAnswers.push(document.getElementById(`srt-${i}`).value);
    });
    sendData('SRT');
}

function submitWAT() { sendData('WAT'); }

function sendData(type) {
    clearInterval(timerInterval);
    fetch('/api/submit_test', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: type, answers: userAnswers})
    })
    .then(r => r.json())
    .then(data => {
        document.getElementById('m-content').innerHTML = `<div style="text-align:center; padding:30px;"><h2>${data.msg}</h2></div>`;
    });
}

// --- REPORT & MANUALS ---
function openManual(branch) {
    fetch('/api/get_manual', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({branch: branch})
    })
    .then(r => r.json())
    .then(data => {
        openModal(branch + " INFO");
        document.getElementById('m-content').innerHTML = `<div style="padding:15px; font-size:1.1rem; line-height:1.6;">${data.content}</div>`;
    });
}

function generateReport() {
    fetch('/api/generate_report')
    .then(r => r.json())
    .then(data => {
        if(data.status === 'error') {
            alert(data.msg);
            return;
        }

        const panel = document.getElementById('final-report-panel');
        panel.style.display = 'block';
        let html = '';

        if(data.oir) {
            html += `<h3>OIR RESULT</h3><p>Score: ${data.oir.score}/5 (Rating: OIR-${data.oir.rating})</p><hr>`;
        }
        
        if(data.wat) {
            html += `<h3>WAT ANALYSIS</h3><table><tr><th>Word</th><th>Response</th><th>OLQ</th></tr>`;
            data.wat.forEach(row => {
                html += `<tr><td>${row.word}</td><td>${row.response}</td><td><b>${row.qualities.join(', ')}</b></td></tr>`;
            });
            html += `</table><hr>`;
        }

        if(data.srt) {
            html += `<h3>SRT ANALYSIS</h3><table><tr><th>Situation</th><th>Response</th><th>OLQ</th></tr>`;
            data.srt.forEach(row => {
                html += `<tr><td>${row.situation.substring(0,20)}...</td><td>${row.response}</td><td><b>${row.qualities.join(', ')}</b></td></tr>`;
            });
            html += `</table>`;
        }

        document.getElementById('report-content').innerHTML = html;
        panel.scrollIntoView({behavior: "smooth"});
    });
}

// --- UTILS ---
function openModal(title) {
    document.getElementById('mainModal').style.display = 'flex';
    document.getElementById('m-title').innerText = title;
}
function closeModal() {
    document.getElementById('mainModal').style.display = 'none';
    clearInterval(timerInterval);
}
function startTimer(sec, cb) {
    clearInterval(timerInterval);
    let t = sec;
    document.getElementById('m-timer').innerText = t + "s";
    timerInterval = setInterval(() => {
        t--;
        document.getElementById('m-timer').innerText = t + "s";
        if(t <= 0) { clearInterval(timerInterval); if(cb) cb(); }
    }, 1000);
}