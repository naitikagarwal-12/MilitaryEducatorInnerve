from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

CORS(app)  
# --- 1. VERIFIED EXAM DATA (2025/2026) ---
EXAM_DATA = {
    "NDA": {
        "title": "NDA & NA EXAMINATION (UPSC)",
        "desc": "For 12th Pass (PCM for Air Force/Navy). Age: 16.5 - 19.5",
        "papers": [
            {"subject": "Mathematics (Paper I)", "duration": "2.5 Hours", "qs": "120 Qs", "marks": "300"},
            {"subject": "GAT (Paper II - English + GK)", "duration": "2.5 Hours", "qs": "150 Qs", "marks": "600"},
            {"subject": "SSB Interview", "duration": "5 Days", "qs": "--", "marks": "900"}
        ]
    },
    "CDS": {
        "title": "COMBINED DEFENCE SERVICES (UPSC)",
        "desc": "For Graduates. Age: 19-25. IMA/INA/AFA/OTA.",
        "papers": [
            {"subject": "English", "duration": "2 Hours", "qs": "120 Qs", "marks": "100"},
            {"subject": "General Knowledge", "duration": "2 Hours", "qs": "120 Qs", "marks": "100"},
            {"subject": "Elementary Maths (IMA/AFA Only)", "duration": "2 Hours", "qs": "100 Qs", "marks": "100"}
        ]
    },
    "AFCAT": {
        "title": "AIR FORCE COMMON ADMISSION TEST",
        "desc": "For Graduates (60% agg). Age: 20-24 (Flying), 20-26 (Ground).",
        "papers": [
            {"subject": "AFCAT (General Awareness, Verbal, Reasoning, Maths)", "duration": "2 Hours", "qs": "100 Qs", "marks": "300"},
            {"subject": "EKT (Engineering Knowledge Test - Tech Only)", "duration": "45 Mins", "qs": "50 Qs", "marks": "150"}
        ]
    },
    "TGC": {
        "title": "TECHNICAL GRADUATE COURSE (ARMY)",
        "desc": "For Engineers (Men). Age: 20-27. Direct SSB (No Written).",
        "papers": [
             {"subject": "Shortlisting based on Cut-off %", "duration": "--", "qs": "--", "marks": "--"},
             {"subject": "SSB Interview", "duration": "5 Days", "qs": "--", "marks": "900"}
        ]
    },
    "SSC-Tech": {
        "title": "SHORT SERVICE COMMISSION (TECH)",
        "desc": "For Engineers (Men & Women). Age: 20-27. Direct SSB.",
        "papers": [
             {"subject": "Shortlisting based on Cut-off %", "duration": "--", "qs": "--", "marks": "--"},
             {"subject": "SSB Interview", "duration": "5 Days", "qs": "--", "marks": "900"}
        ]
    }
}

# --- 2. DETAILED OFFICER MANUALS ---
MANUALS = {
    "ARMY": """
        <div class='manual-section'>
            <h3>1. INDIAN ARMY OVERVIEW</h3>
            <p><strong>Motto:</strong> "Seva Parmo Dharma" (Service Before Self).<br>
            The Indian Army is the land-based branch and the largest component of the Indian Armed Forces.</p>
            
            <h3>2. ENTRY SCHEMES</h3>
            <ul>
                <li><strong>NDA (National Defence Academy):</strong> For 12th Pass (Age 16.5-19.5). Training at Khadakwasla (3 yrs) + IMA Dehradun (1 yr).</li>
                <li><strong>CDS (Combined Defence Services):</strong> For Graduates. Permanent Commission (IMA) & Short Service (OTA Chennai).</li>
                <li><strong>TGC / SSC-Tech:</strong> Direct entry for Engineers based on academic aggregate. No written exam.</li>
                <li><strong>NCC Special Entry:</strong> For NCC 'C' Certificate holders (Min 'B' Grade). Direct SSB.</li>
            </ul>

            <h3>3. SSB SELECTION PROTOCOL (5 DAYS)</h3>
            <p><strong>Stage 1 (Screening - Day 1):</strong><br>
            - <strong>OIR Test:</strong> Verbal & Non-Verbal Reasoning (2 Booklets, ~50 Qs each).<br>
            - <strong>PPDT:</strong> Story writing on a hazy picture (4 mins) + Group Discussion.<br>
            <em>Result declared same day. Fails are sent back.</em></p>

            <p><strong>Stage 2 (Psychology - Day 2):</strong><br>
            - <strong>TAT:</strong> 11 Pictures + 1 Blank. Write stories.<br>
            - <strong>WAT:</strong> 60 Words x 15 Seconds. Write first thought.<br>
            - <strong>SRT:</strong> 60 Real-life Situations. Write reactions in 30 mins.<br>
            - <strong>SD:</strong> Self Description (Opinion of Parents, Teachers, Friends, Self).</p>

            <p><strong>GTO (Group Testing - Day 3 & 4):</strong><br>
            9 Tasks including Group Planning, Snake Race, Command Task, and Lecturette.</p>

            <p><strong>Conference (Day 5):</strong><br>
            Final assessment by the Board President and all assessors.</p>
        </div>
    """,
    "NAVY": """
        <div class='manual-section'>
            <h3>1. INDIAN NAVY OVERVIEW</h3>
            <p><strong>Motto:</strong> "Sham No Varunah" (May the Lord of Water be auspicious unto us).<br>
            Focuses on securing the maritime borders and interests of India.</p>

            <h3>2. ENTRY SCHEMES</h3>
            <ul>
                <li><strong>NDA (Naval Academy):</strong> 12th Pass (PCM mandatory). 4 Year B.Tech at INA Ezhimala.</li>
                <li><strong>INET (Indian Navy Entrance Test):</strong> For Graduates/Engineers.</li>
                <li><strong>10+2 B.Tech Entry:</strong> Direct SSB call based on JEE Mains Rank.</li>
            </ul>

            <h3>3. NSB (NAVAL SELECTION BOARD) PROTOCOL</h3>
            <p>The procedure is similar to the Army but with specific differences:</p>
            <ul>
                <li><strong>Emphasis on Practicality:</strong> The GTO tasks in Navy boards (Bhopal, Bangalore, Kolkata, Vizag) often emphasize practical engineering solutions.</li>
                <li><strong>Pilot Aptitude (PABT/CPSS):</strong> If opting for Naval Aviation, CPSS is mandatory once recommended.</li>
            </ul>
        </div>
    """,
    "AIR": """
        <div class='manual-section'>
            <h3>1. INDIAN AIR FORCE OVERVIEW</h3>
            <p><strong>Motto:</strong> "Nabha Sparsham Deeptam" (Touch the Sky with Glory).</p>

            <h3>2. ENTRY SCHEMES</h3>
            <ul>
                <li><strong>NDA (Air Force):</strong> 12th Pass (PCM). Flying & Ground Duty.</li>
                <li><strong>AFCAT:</strong> Twice a year for Graduates. Flying, Technical, and Admin branches.</li>
                <li><strong>NCC Special Entry:</strong> Air Wing 'C' Certificate. Direct AFSB.</li>
            </ul>

            <h3>3. AFSB (AIR FORCE SELECTION BOARD) PROTOCOL</h3>
            <p><strong>Strict Screening:</strong> The OIR (Officer Intelligence Rating) cutoff is generally higher in AFSB than other boards.</p>
            <p><strong>CPSS (Computerized Pilot Selection System):</strong><br>
            Mandatory for Flying Branch. It tests psychomotor skills and cognitive information processing. 
            <br><em>Note: It is a once-in-a-lifetime test. If you fail CPSS, you can never fly in the armed forces.</em></p>
        </div>
    """
}

# --- 3. MOCK TESTS ---
OIR_MOCK = [{"id": i, "q": f"Q{i}: Choose the figure which is different from the rest (Visual Logic)", "options": ["A", "B", "C", "D"]} for i in range(1, 21)]
WAT_MOCK = ["DANGER", "LEADER", "KILL", "SISTER", "WAR", "PEACE", "ATOM", "BLOOD", "COUNTRY", "FLAG", "JUMP", "ORDERS", "COMPANY", "DARK", "MOTHER", "FIRE", "SPEED", "BOOK", "SPORTS", "WIN"]
SRT_MOCK = ["1. Exam road accident...", "2. Captain injured...", "3. Lost wallet...", "4. Parents oppose marriage...", "5. Trapped in lift...", "6. Attacked by mob...", "7. Account error...", "8. Staff strike...", "9. House fire...", "10. Classified leak..."]

@app.route("/")
def home():
    return render_template("dashboard.html")

@app.route("/api/eligibility", methods=["POST"])
def eligibility():
    data = request.json
    try:
        age = float(data.get("age", 0))
    except:
        return jsonify({"exams": []})

    edu = data.get("edu")
    gender = data.get("gender")

    exams = []
    if 16.5 <= age <= 19.5 and edu == "12th":
        exams.append("NDA")
    if edu in ["Grad", "Eng"] and 19 <= age <= 25:
        exams.append("CDS")
    if 20 <= age <= 24 and edu in ["Grad", "Eng"]:
        exams.append("AFCAT")
    if edu == "Eng" and 20 <= age <= 27:
        exams.append("SSC-Tech")

    return jsonify({"exams": exams})

@app.route("/api/get_details", methods=["POST"])
def get_details():
    return jsonify(EXAM_DATA.get(request.json.get("exam"), {}))

@app.route("/api/get_manual", methods=["POST"])
def get_manual():
    return jsonify({"content": MANUALS.get(request.json.get("branch"), "")})

@app.route("/api/get_test", methods=["POST"])
def get_test():
    t = request.json.get("type")
    if t == "OIR":
        return jsonify({"data": OIR_MOCK, "mode": "list", "time": 1200})
    if t == "WAT":
        return jsonify({"data": WAT_MOCK, "mode": "slide", "time": 15})
    if t == "SRT":
        return jsonify({"data": SRT_MOCK, "mode": "list", "time": 900})
    return jsonify({})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
