let timer;

// --- 1. VERIFY ELIGIBILITY ---
function verifyElig() {
    const age = document.getElementById('age').value;
    const edu = document.getElementById('edu').value;
    const gender = document.getElementById('gender').value;
    const msgBox = document.getElementById('elig-msg');
    const pathArea = document.getElementById('pathways-area');
    const pathGrid = document.getElementById('path-grid');

    // Clear previous
    msgBox.innerText = "";
    pathArea.style.display = 'none';
    pathGrid.innerHTML = '';

    if (!age) {
        msgBox.innerText = "Error: Please enter a valid age.";
        return;
    }

    fetch('/api/eligibility', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({age: age, edu: edu, gender: gender})
    })
    .then(r => r.json())
    .then(data => {
        if (data.exams.length === 0) {
            // RED TEXT ERROR (No Alert)
            msgBox.innerText = "NO MATCH FOUND WITH THESE CRITERIA.";
        } else {
            // SUCCESS
            pathArea.style.display = 'block';
            data.exams.forEach(exam => {
                const div = document.createElement('div');
                div.className = 'path-card';
                div.innerHTML = `<div>${exam}</div><div style="font-size:0.7rem; margin-top:5px; color:#555;">CLICK FOR DETAILS</div>`;
                div.onclick = () => showDetails(exam);
                pathGrid.appendChild(div);
            });
            // Scroll to pathways
            pathArea.scrollIntoView({behavior: 'smooth'});
        }
    });
}

// --- 2. SHOW MANUALS ---
function openManual(branch) {
    fetch('/api/get_manual', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({branch: branch})
    })
    .then(r => r.json())
    .then(data => {
        openModal(branch + " PROTOCOLS");
        document.getElementById('m-content').innerHTML = data.content;
    });
}

// --- 3. SHOW EXAM DETAILS ---
function showDetails(exam) {
    fetch('/api/get_details', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({exam: exam})
    })
    .then(r => r.json())
    .then(data => {
        openModal(data.title);
        let html = `<p class="manual-section"><strong>${data.desc}</strong></p>
        <table style="width:100%; border-collapse:collapse; margin-top:20px;">
            <tr style="background:#ccc;"><th style="padding:10px; text-align:left;">PAPER</th><th>DURATION</th><th>QS</th><th>MARKS</th></tr>`;
        
        data.papers.forEach(p => {
            html += `<tr style="border-bottom:1px solid #ddd;">
                <td style="padding:10px;">${p.subject}</td>
                <td style="text-align:center;">${p.duration}</td>
                <td style="text-align:center;">${p.qs}</td>
                <td style="text-align:center;">${p.marks}</td>
            </tr>`;
        });
        html += `</table>`;
        document.getElementById('m-content').innerHTML = html;
    });
}

// --- 4. TESTS ---
function loadTest(type) {
    fetch('/api/get_test', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: type})
    })
    .then(r => r.json())
    .then(data => {
        openModal(type + " SIMULATION");
        const div = document.getElementById('m-content');
        
        if(data.mode === 'list') {
            // OIR & SRT
            let html = "";
            data.data.forEach(item => {
                if(type === 'OIR') {
                    html += `<div style="background:white; padding:15px; margin-bottom:10px; border:1px solid #ccc;">
                        <strong>${item.q}</strong><br>
                        ${item.options.map(o => `<button style="margin:5px; padding:5px 10px;">${o}</button>`).join('')}
                    </div>`;
                } else {
                    html += `<div style="margin-bottom:15px;"><strong>${item}</strong><br><input type="text" style="width:100%; padding:10px; border:1px solid #999;" placeholder="Reaction..."></div>`;
                }
            });
            div.innerHTML = html;
            runTimer(data.time);
        } else {
            // WAT
            runWAT(data.data, 0);
        }
    });
}

function runWAT(words, idx) {
    if(idx >= words.length) {
        document.getElementById('m-content').innerHTML = "<h2>TEST COMPLETE</h2>";
        return;
    }
    document.getElementById('m-content').innerHTML = `<div style="text-align:center; padding-top:100px;">
        <h1 style="font-size:4rem; color:#2F3820;">${words[idx]}</h1>
        <input type="text" placeholder="Type..." style="font-size:1.5rem; padding:10px; width:60%;">
    </div>`;
    runTimer(15, () => runWAT(words, idx+1));
}

// --- UTILS ---
function runTimer(sec, cb) {
    clearInterval(timer);
    let t = sec;
    const el = document.getElementById('m-timer');
    el.innerText = t + "s";
    timer = setInterval(() => {
        t--;
        el.innerText = t + "s";
        if(t <= 0) {
            clearInterval(timer);
            if(cb) cb();
        }
    }, 1000);
}

function openModal(title) {
    document.getElementById('mainModal').style.display = 'block';
    document.getElementById('m-title').innerText = title;
    document.getElementById('m-timer').innerText = "";
    clearInterval(timer);
}

function closeModal() {
    document.getElementById('mainModal').style.display = 'none';
    clearInterval(timer);
}