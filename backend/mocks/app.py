from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
from analyzer import get_ai_assessment
from fpdf import FPDF
import io
import os

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

# --- HELPER: Clean Text for FPDF ---
# FPDF core fonts only support Latin-1. This removes smart quotes/emojis.
def clean_text(text):
    if not text: return "N/A"
    replacements = {
        '\u2018': "'", '\u2019': "'", # Smart quotes
        '\u201c': '"', '\u201d': '"', # Smart double quotes
        '\u2013': '-', '\u2014': '-'  # Dashes
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    
    # Strip any remaining non-latin-1 characters to prevent crash
    return text.encode('latin-1', 'replace').decode('latin-1')

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
    
    # Initialize PDF
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # 1. HEADER
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, "OFFICIAL DEFENSE READINESS REPORT", ln=True, align='C')
    pdf.ln(10)
    
    # 2. EXECUTIVE SUMMARY (Sanitized)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(0, 10, "EXECUTIVE SUMMARY:", ln=True)
    pdf.set_font("Arial", '', 11)
    
    summary_text = clean_text(data.get('summary', 'N/A'))
    pdf.multi_cell(0, 7, summary_text)
    pdf.ln(5)

    # 3. SCORES
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(0, 10, "COMPETENCY SCORES", ln=True)
    pdf.set_font("Arial", '', 11)
    
    metrics = data.get('metrics', {})
    for key, val in metrics.items():
        pdf.cell(0, 8, f"{key}: {val}%", ln=True)
        
    pdf.ln(10)
    
    # 4. GAP ANALYSIS (Sanitized)
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(0, 10, "GAP ANALYSIS (MISSING ELEMENTS)", ln=True)
    pdf.set_font("Arial", '', 10)
    
    missing = data.get('missing_elements', [])
    if not missing:
        pdf.cell(0, 8, "No critical gaps detected.", ln=True)
    else:
        for item in missing:
            raw_text = f"Q{item.get('q_num', '?')}: {item.get('missing', 'Unknown error')}"
            clean_item = clean_text(raw_text)
            pdf.multi_cell(0, 8, clean_item)
            pdf.ln(2)

    # 5. OUTPUT TO BUFFER (Fixed Logic)
    # output(dest='S') returns a string. We encode it to latin-1 bytes for the buffer.
    try:
        pdf_output_str = pdf.output(dest='S')
        pdf_bytes = pdf_output_str.encode('latin-1')
        
        buffer = io.BytesIO(pdf_bytes)
        buffer.seek(0)
        
        return send_file(
            buffer, 
            as_attachment=True, 
            download_name="Defense_Audit.pdf", 
            mimetype='application/pdf'
        )
    except Exception as e:
        print(f"PDF Generation Error: {e}")
        return jsonify({"error": "Failed to generate PDF"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)
