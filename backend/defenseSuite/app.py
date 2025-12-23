from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS
import secrets
import os

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

CORS(app)  

# Generate a secret key for session security
app.secret_key = secrets.token_hex(16)

# --- 1. DATABASES ---
OIR_DB = [
    {"id": 1, "q": "Which number comes next: 2, 6, 12, 20, 30, ...?", "options": ["40", "42", "44", "38"], "ans": "42"},
    {"id": 2, "q": "Bird is to Fly as Fish is to ...?", "options": ["Swim", "Water", "Gill", "Ocean"], "ans": "Swim"},
    {"id": 3, "q": "If A=1, CAT=24, then DOG=?", "options": ["26", "24", "25", "20"], "ans": "26"},
    {"id": 4, "q": "Find the odd one out:", "options": ["Car", "Bus", "Train", "Wheel"], "ans": "Wheel"},
    {"id": 5, "q": "Cube A is painted Red on 2 sides. How many sides are unpainted?", "options": ["4", "8", "12", "16"], "ans": "8"}
]

WAT_DB = ["ATTACK", "MOTHER", "FAILURE", "ARMY", "FRIEND", "ORDER", "DEFEAT", "HARD", "BLOOD", "LEADER"]

SRT_DB = [
    "You are going for the exam and you see a person hit by a car bleeding heavily...",
    "Your captain has fainted during a crucial patrol...",
    "You have lost your wallet and ticket on a train journey...",
    "Your parents are forcing you to marry against your wish...",
    "You are trapped in a lift with a pregnant lady who is in labor..."
]

MANUALS = {
    "ARMY": """
        <h3>INDIAN ARMY SELECTION</h3>
        <p><strong>Motto:</strong> Seva Parmo Dharma (Service Before Self).</p>
        <p><strong>Centers:</strong> Allahabad, Bhopal, Bangalore, Kapurthala.</p>
        <h4>5-Day Procedure:</h4>
        <ul>
            <li><strong>Day 1:</strong> Screening (OIR + PPDT). Rejection rate is ~60%.</li>
            <li><strong>Day 2:</strong> Psychology (TAT, WAT, SRT, SD).</li>
            <li><strong>Day 3-4:</strong> GTO (Ground Tasks).</li>
            <li><strong>Day 5:</strong> Conference.</li>
        </ul>
    """,
    "NAVY": """
        <h3>INDIAN NAVY SELECTION</h3>
        <p><strong>Motto:</strong> Sham No Varunah.</p>
        <p><strong>Centers:</strong> Bhopal, Bangalore, Kolkata, Visakhapatnam.</p>
        <h4>Key Differences:</h4>
        <p>Navy GTO tasks are often more technical/practical. If applying for Pilot/Observer, you must clear CPSS (if not done earlier).</p>
    """,
    "AIR": """
        <h3>INDIAN AIR FORCE SELECTION</h3>
        <p><strong>Motto:</strong> Nabha Sparsham Deeptam.</p>
        <p><strong>Centers:</strong> Dehradun, Mysore, Gandhinagar, Varanasi.</p>
        <h4>Crucial Note:</h4>
        <p><strong>CPSS (Computerized Pilot Selection System):</strong> Mandatory for Flying Branch. Can be taken only ONCE in a lifetime.</p>
    """
}

OLQ_MAP = {
    "plan": "Effective Intelligence", "organize": "Organizing Ability", "solve": "Reasoning Ability",
    "help": "Social Adaptability", "friend": "Cooperation", "team": "Sense of Responsibility",
    "lead": "Initiative", "brave": "Self Confidence", "fight": "Speed of Decision",
    "hard": "Determination", "try": "Courage", "calm": "Emotional Stability",
    "win": "Dynamism", "mother": "Social Adaptability", "honest": "Integrity"
}

def analyze_text(text):
    text = text.lower()
    words = text.split()
    detected = []
    
    negative_words = ["not", "never", "cant", "cannot", "dont", "didn't"]

    for keyword, quality in OLQ_MAP.items():
        if keyword in text:
            # Check for immediate negation (e.g., "not brave")
            is_negative = False
            if keyword in words:
                idx = words.index(keyword)
                if idx > 0 and words[idx-1] in negative_words:
                    is_negative = True
            
            if not is_negative:
                detected.append(quality)

    return list(set(detected)) if detected else ["Neutral / Observation"]

# --- ROUTES ---

@app.route('/')
def index():
    # Initialize session storage for new user
    if 'scores' not in session:
        session['scores'] = {'OIR': None, 'WAT': None, 'SRT': None}
    return render_template('dashboard.html')

@app.route('/api/get_test', methods=['POST'])
def get_test():
    t_type = request.json.get('type')
    if t_type == 'OIR': return jsonify({'data': OIR_DB, 'mode': 'quiz', 'time': 600})
    if t_type == 'WAT': return jsonify({'data': WAT_DB, 'mode': 'slide', 'time': 15})
    if t_type == 'SRT': return jsonify({'data': SRT_DB, 'mode': 'input_list', 'time': 900})
    return jsonify({})

@app.route('/api/submit_test', methods=['POST'])
def submit_test():
    data = request.json
    t_type = data.get('type')
    answers = data.get('answers')
    
    # Load current session data
    current_scores = session.get('scores', {'OIR': None, 'WAT': None, 'SRT': None})

    if t_type == 'OIR':
        score = 0
        for i, ans in enumerate(answers):
            if i < len(OIR_DB) and ans == OIR_DB[i]['ans']:
                score += 1
        rating = 5 if score < 3 else (1 if score == 5 else 3)
        current_scores['OIR'] = {"score": score, "rating": rating}
        msg = f"OIR Submitted. Score: {score}/5"

    elif t_type == 'WAT':
        analysis = []
        for i, ans in enumerate(answers):
            word = WAT_DB[i] if i < len(WAT_DB) else "?"
            qualities = analyze_text(ans)
            analysis.append({"word": word, "response": ans, "qualities": qualities})
        current_scores['WAT'] = analysis
        msg = "WAT Analysis Saved."

    elif t_type == 'SRT':
        analysis = []
        for i, ans in enumerate(answers):
            sit = SRT_DB[i] if i < len(SRT_DB) else "?"
            qualities = analyze_text(ans)
            analysis.append({"situation": sit, "response": ans, "qualities": qualities})
        current_scores['SRT'] = analysis
        msg = "SRT Analysis Saved."

    # Save back to session
    session['scores'] = current_scores
    session.modified = True
    
    return jsonify({"msg": msg})

@app.route('/api/get_manual', methods=['POST'])
def get_manual():
    branch = request.json.get('branch')
    return jsonify({'content': MANUALS.get(branch, "N/A")})

@app.route('/api/generate_report', methods=['GET'])
def generate_report():
    scores = session.get('scores', {})
    
    # Check if at least one test is done
    if not (scores.get('OIR') or scores.get('WAT') or scores.get('SRT')):
        return jsonify({"status": "error", "msg": "No test data found. Please complete a test first."})

    return jsonify({
        "status": "success",
        "oir": scores.get('OIR'),
        "wat": scores.get('WAT'),
        "srt": scores.get('SRT')
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
