import os
from dotenv import load_dotenv
from google import genai

# Load Key
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ Error: No API Key found in .env")
    exit()

print(f"🔑 Testing Key: {api_key[:10]}...")

try:
    client = genai.Client(api_key=api_key)
    
    # Ask Google: "What models can I use?"
    print("📡 Connecting to Google to fetch available models...")
    models = client.models.list()
    
    print("\n✅ AVAILABLE MODELS FOR YOU:")
    found_any = False
    for m in models:
        # We only care about models that can 'generateContent'
        if "generateContent" in m.supported_actions:
            name = m.name.replace("models/", "")
            print(f"   👉 {name}")
            found_any = True
            
    if not found_any:
        print("❌ No text-generation models found. You might need to enable the 'Generative Language API' in Google Cloud Console.")

except Exception as e:
    print("\n❌ CRASHED:")
    print(e)