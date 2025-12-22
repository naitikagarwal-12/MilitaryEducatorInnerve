from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
from analyzer import get_ai_assessment
from fpdf import FPDF
import io

app = Flask(__name__)

CORS(app) 

QUESTIONS = [
    "How do you verify data integrity in a contested environment?",
    "Describe your protocol for an unplanned system outage.",
    "How do you prioritize mission goals vs resource scarcity?",
    "Explain your approach to cross-departmental communication.",
    "What is your ethics protocol regarding data privacy?",
    "How do you handle a subordinate failing to follow SOPs?",
    "Describe a time you mitigated a high-level technical risk.",
    "What is your process for a post-action technical debrief?",
    "How do you maintain focus during high-pressure scenarios?",
    "Explain the importance of redundancy in defense systems."
]

@app.route('/')
def home():
    return render_template('index.html', questions=QUESTIONS)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    responses = data.get('responses', [])
    if not responses:
        return jsonify({"error": "No responses provided"}), 400
        
    analysis_result = get_ai_assessment(responses, QUESTIONS)
    return jsonify(analysis_result)

@app.route('/download_pdf', methods=['POST'])
def download_pdf():
    data = request.json
    pdf = FPDF()
    pdf.add_page()
    
    # PDF Styling
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, "OFFICIAL DEFENSE READINESS REPORT", ln=True, align='C')
    pdf.ln(10)
    
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(0, 10, f"EXECUTIVE SUMMARY: {data.get('summary', 'N/A')}", ln=True)
    pdf.ln(5)

    # Scores
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(0, 10, "COMPETENCY SCORES", ln=True)
    pdf.set_font("Arial", '', 11)
    
    metrics = data.get('metrics', {})
    for key, val in metrics.items():
        pdf.cell(0, 8, f"{key}: {val}%", ln=True)
        
    pdf.ln(10)
    
    # Missing Parts
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(0, 10, "GAP ANALYSIS (MISSING ELEMENTS)", ln=True)
    pdf.set_font("Arial", '', 10)
    
    missing = data.get('missing_elements', [])
    for item in missing:
        text = f"Q{item['q_num']}: {item['missing']}"
        pdf.multi_cell(0, 8, text)
        pdf.ln(2)

    # Return PDF
    buffer = io.BytesIO()
    pdf_output = pdf.output(dest='S')
    buffer.write(pdf_output)
    buffer.seek(0)
    
    return send_file(buffer, as_attachment=True, download_name="Defense_Audit.pdf", mimetype='application/pdf')


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
