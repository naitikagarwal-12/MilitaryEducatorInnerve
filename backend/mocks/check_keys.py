import os
from dotenv import load_dotenv

load_dotenv()

keys = []
if os.getenv("GEMINI_API_KEY_1"): keys.append(os.getenv("GEMINI_API_KEY_1")[:10] + "...")
if os.getenv("GEMINI_API_KEY_2"): keys.append(os.getenv("GEMINI_API_KEY_2")[:10] + "...")
if os.getenv("GEMINI_API_KEY_3"): keys.append(os.getenv("GEMINI_API_KEY_3")[:10] + "...")

print(f"I found {len(keys)} keys.")
for i, k in enumerate(keys):
    print(f"Key {i+1}: {k}")