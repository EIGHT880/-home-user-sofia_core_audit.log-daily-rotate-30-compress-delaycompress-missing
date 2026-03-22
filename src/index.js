import google.generativeai as genai
import os
import meshtastic
import meshtastic.serial_interface
import time
from datetime import datetime

# --- Configuration ---
# Replace with your actual key or ensure it's in your system environment
os.environ["GEMINI_API_KEY"] = "YOUR_API_KEY"
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel('gemini-1.5-flash')

def broadcast_to_mesh(message):
    """Sends the status message over the Meshtastic radio network."""
    now = datetime.now().strftime("%H:%M")
    try:
        # Connects to the USB Meshtastic node
        interface = meshtastic.serial_interface.SerialInterface()
        # Adding a timestamp helps mesh users know the data is fresh
        interface.sendText(f"[{now}] AIGIS: {message}")
        interface.close()
        print(f"[{now}] Successfully broadcasted to Mesh Network.")
    except Exception as e:
        print(f"[{now}] Mesh Broadcast Failed: {e}")

def heartbeat_check():
    prompt = "System Check: Activate Lingo Brain. Confirm Aigis Safety Protocol status for Hemet Flagship."
    now = datetime.now().strftime("%H:%M:%S")
    
    try:
        response = model.generate_content(prompt)
        status_text = response.text.strip()
        
        print(f"\n--- LINGO BRAIN RESPONSE @ {now} ---")
        print(status_text)
        print("-" * 40)
        
        broadcast_to_mesh(status_text)
        
    except Exception as e:
        error_msg = f"Connection Failed: {e}"
        print(f"[{now}] {error_msg}")
        broadcast_to_mesh("CRITICAL: Lingo Brain Link SEVERED.")

if __name__ == "__main__":
    print("Aigis Safety Protocol: INITIALIZING...")
    # Run the check every 60 minutes
    while True:
        heartbeat_check()
        print("Waiting 60 minutes for next heartbeat...")
        time.sleep(3600) 
pip install meshtastic
