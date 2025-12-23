import os
from flask import Flask, render_template, request, jsonify, session

app = Flask(__name__)

# ===============================
# SESSION CONFIG (CRITICAL FIX)
# ===============================

# 🔒 Stable secret key (DO NOT auto-generate)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dretgmDefenseSuitekjnhhlkhbmjknetj_NJVNGJBKRSNVhgb")

# ✅ Required for iframe + cross-site
app.config.update(
    SESSION_COOKIE_SAMESITE="None",
    SESSION_COOKIE_SECURE=True,   # REQUIRED on HTTPS (Render)
)

# ===============================
# DATABASES
# ===============================

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
    "ARMY": "<h3>INDIAN ARMY SELECTION</h3>",
    "NAVY": "<h3>INDIAN NAVY SELECTION</h3>",
    "AIR": "<h3>INDIAN AIR FORCE SELECTION</h3>",
}

OLQ_MAP = {
    "plan": "Effective Intelligence",
    "organize": "Organizing Ability",
    "solve": "Reasoning Ability",
    "help": "Social Adaptability",
    "friend": "Cooperation",
    "team": "Sense of Responsibility",
    "lead": "Initiative",
    "brave": "Self Confidence",
    "fight": "Speed of Decision",
    "hard": "Determination",
    "try": "Courage",
    "calm": "Emotional Stability",
    "win": "Dynamism",
    "mother": "Social Adaptability",
    "honest": "Integrity"
}

# ===============================
# HELPERS
# ===============================

def analyze_text(text):
    text = text.lower()
    detected = []
    for k, v in OLQ_MAP.items():
        if k in text:
            detected.append(v)
    return list(set(detected)) if detected else ["Neutral / Observation"]

# ===============================
# ROUTES
# ===============================

@app.route("/")
def index():
    if "scores" not in session:
        session["scores"] = {"OIR": None, "WAT": None, "SRT": None}
    return render_template("dashboard.html")

@app.route("/api/get_test", methods=["POST"])
def get_test():
    t = request.json.get("type")
    if t == "OIR":
        return jsonify({"data": OIR_DB, "mode": "quiz", "time": 600})
    if t == "WAT":
        return jsonify({"data": WAT_DB, "mode": "slide", "time": 15})
    if t == "SRT":
        return jsonify({"data": SRT_DB, "mode": "input_list", "time": 900})
    return jsonify({})

@app.route("/api/submit_test", methods=["POST"])
def submit_test():
    data = request.json
    t_type = data.get("type")
    answers = data.get("answers", [])

    scores = session.get("scores", {"OIR": None, "WAT": None, "SRT": None})

    if t_type == "OIR":
        score = sum(
            1 for i, a in enumerate(answers)
            if i < len(OIR_DB) and a == OIR_DB[i]["ans"]
        )
        scores["OIR"] = {"score": score, "rating": 3}

    elif t_type == "WAT":
        scores["WAT"] = [
            {"word": WAT_DB[i], "response": a, "qualities": analyze_text(a)}
            for i, a in enumerate(answers)
        ]

    elif t_type == "SRT":
        scores["SRT"] = [
            {"situation": SRT_DB[i], "response": a, "qualities": analyze_text(a)}
            for i, a in enumerate(answers)
        ]

    session["scores"] = scores
    session.modified = True

    return jsonify({"msg": "Saved"})

@app.route("/api/generate_report")
def generate_report():
    scores = session.get("scores", {})

    if not any(scores.values()):
        return jsonify({
            "status": "error",
            "msg": "No test data found. Please complete a test first."
        })

    return jsonify({
        "status": "success",
        "oir": scores.get("OIR"),
        "wat": scores.get("WAT"),
        "srt": scores.get("SRT"),
    })

# ===============================
# ENTRY
# ===============================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
