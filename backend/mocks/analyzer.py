import os
import json
import re
from dotenv import load_dotenv
from google import genai

# 1. LOAD KEYS
load_dotenv()
API_KEYS = []
i = 1
while True:
    k = os.getenv(f"GEMINI_API_KEY_{i}")
    if k: API_KEYS.append(k)
    else: break
    i += 1
if not API_KEYS and os.getenv("GEMINI_API_KEY"):
    API_KEYS.append(os.getenv("GEMINI_API_KEY"))

# --- PLAN B: DYNAMIC LOCAL ENGINE (Works for 10 Questions) ---
def advanced_local_analysis(responses):
    print(f"⚠️ API Busy. Running Local Analysis on {len(responses)} answers...")
    
    # 1. MASTER KEYWORD LIST (Universal Military Terms)
    # Since we have 10 unknown questions, we scan for ALL these terms across the whole interview.
    strategy_terms = ["logistics", "cyber", "asymmetric", "supply chain", "satellite", "degrade", "kinetic", "deterrence", "resources", "long-term"]
    resilience_terms = ["mission command", "intent", "decentralize", "trust", "analog", "radio", "protocol", "blackout", "adapt", "overcome"]
    ethics_terms = ["geneva", "illegal", "refuse", "law", "jag", "civilian", "crime", "unlawful", "loac", "convention", "rules of engagement"]
    
    # 2. COMBINE ALL TEXT
    full_text = " ".join(responses).lower()
    
    # 3. CALCULATE SCORES (Based on density of keywords in the full 10 answers)
    strat_score = sum(full_text.count(w) for w in strategy_terms) * 8 + 40
    res_score = sum(full_text.count(w) for w in resilience_terms) * 8 + 40
    eth_score = sum(full_text.count(w) for w in ethics_terms) * 10 + 35
    
    scores = {
        "Strategic Logic": min(98, strat_score),
        "Resilience": min(99, res_score),
        "Ethical Integrity": min(100, eth_score),
        "Technical Clarity": min(95, int(len(full_text.split()) / len(responses) * 2)), # Avg length score
        "Leadership": min(95, res_score + 5),
        "Procedural Adherence": min(90, eth_score - 5)
    }

    # 4. FIND WEAKEST ANSWERS (For Feedback)
    # We find the shortest answers and flag them as "Weak"
    missing_elements = []
    for i, answer in enumerate(responses):
        if len(answer.split()) < 5: # If answer is less than 5 words
            missing_elements.append({"q_num": i+1, "missing": "Response too short to demonstrate competence."})
        elif "dunno" in answer or "skip" in answer:
             missing_elements.append({"q_num": i+1, "missing": "Candidate failed to provide a tactical response."})
             
    # Ensure we have at least some feedback
    if not missing_elements:
        if scores["Strategic Logic"] < 80:
             missing_elements.append({"q_num": 1, "missing": "General: Answers lacked depth in asymmetric warfare strategy."})
        if scores["Ethical Integrity"] < 80:
             missing_elements.append({"q_num": 10, "missing": "General: Failed to cite specific legal frameworks (Geneva/LOAC)."})

    return {
        "metrics": scores,
        "missing_elements": missing_elements[:4], # Limit to 4 errors max
        "summary": "EVALUATION COMPLETE (LOCAL PROTOCOL). The candidate provided responses to all 10 tactical scenarios. The system detected varying levels of technical proficiency. Refer to the 'Missing Elements' section for specific gaps in the shorter responses."
    }

# --- PLAN A: AI ANALYSIS (Dynamic) ---
def get_ai_assessment(responses, questions):
    
    # 1. Format ALL 10 Questions into one block
    interview_text = ""
    for i, (q, r) in enumerate(zip(questions, responses)):
        interview_text += f"Q{i+1}: {q}\nA: {r}\n\n"

    # 2. The Prompt (Adjusted for 10 Questions)
    prompt = f"""
    ### ROLE
    You are a Senior Defense Evaluator. You are grading a 10-Question Interview for a Strategic Defense role.
    
    ### INSTRUCTIONS
    1. Read ALL 10 responses.
    2. Aggregate your score based on the candidate's performance across the WHOLE interview.
    3. If they messed up just one question, deduct points but don't fail them completely.
    4. For "Missing Elements", identify the 3 WEAKEST answers out of the 10.

    ### GRADING RUBRIC (TRAINING EXAMPLES)
    [GOOD KEYWORDS]: Mission Command, Geneva Convention, Asymmetric, Logistics, Cyber, JAG.
    [BAD BEHAVIOR]: Short answers, ignoring the question, violating ethics.

    Return ONLY valid JSON.
    Structure:
    {{
        "metrics": {{ "Strategic Logic": (0-100), "Resilience": (0-100), "Ethical Integrity": (0-100), "Technical Clarity": (0-100), "Leadership": (0-100), "Procedural Adherence": (0-100) }},
        "missing_elements": [ 
            {{ "q_num": 2, "missing": "Critique of the specific weak answer." }},
            {{ "q_num": 7, "missing": "Critique of another weak answer." }}
        ],
        "summary": "Executive summary of the candidate's overall performance across 10 questions."
    }}

    ### REAL INTERVIEW DATA (10 Questions)
    {interview_text}
    """

    # 3. TRY KEYS
    for key in API_KEYS:
        try:
            print(f"🔄 Processing {len(questions)} Questions with AI...")
            client = genai.Client(api_key=key)
            response = client.models.generate_content(model='gemini-2.0-flash', contents=prompt)
            print("✅ AI Success!")
            return json.loads(response.text.replace("```json", "").replace("```", "").strip())
        except Exception:
            print("❌ API Key Failed. Switching...")
            continue 

    # 4. FALLBACK
    return advanced_local_analysis(responses)