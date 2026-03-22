import google.generativeai as genai
import os
import meshtastic
import meshtastic.serial_interface

# --- Configuration ---
os.environ["GEMINI_API_KEY"] = "YOUR_API_KEY"
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel('gemini-1.5-flash')

def broadcast_to_mesh(message):
    """Sends the status message over the Meshtastic radio network."""
    try:
        # Connects to the first available USB Meshtastic node
        interface = meshtastic.serial_interface.SerialInterface()
        interface.sendText(f"AIGIS ALERT: {message}")
        interface.close()
        print("Successfully broadcasted to Mesh Network.")
    except Exception as e:
        print(f"Mesh Broadcast Failed: {e}")

def heartbeat_check():
    prompt = "System Check: Activate Lingo Brain. Confirm Aigis Safety Protocol status for Hemet Flagship."
    try:
        response = model.generate_content(prompt)
        status_text = response.text.strip()
        
        print("-" * 30)
        print("LINGO CENTRAL BRAIN RESPONSE:")
        print(status_text)
        print("-" * 30)
        
        # Now, push this update to the radio mesh
        broadcast_to_mesh(status_text)
        
    except Exception as e:
        error_msg = f"Connection Failed: {e}"
        print(error_msg)
        # Optional: Send a 'Failure' alert to mesh if Gemini is unreachable
        broadcast_to_mesh("Lingo Brain Link Severed. Manual override suggested.")

if __name__ == "__main__":
    print("Initializing Aigis Connection...")
    heartbeat_check()
import google.generativeai as genai
import os
import time
from PIL import Image # Ensure you have 'Pillow' installed: pip install Pillow

# 1. Configuration & Security
# Best Practice: Use environment variables for your API Key
os.environ["GEMINI_API_KEY"] = "YOUR_API_KEY"
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Initializing the Lingo Brain (Sofia AI Core)
model = genai.GenerativeModel('gemini-1.5-flash')

def heartbeat_check():
    """
    Confirms Aigis Safety Protocol for the Hemet Flagship before processing any data.
    """
    prompt = "System Check: Activate Lingo Brain. Confirm Aigis Safety Protocol status for Hemet Flagship."
    try:
        response = model.generate_content(prompt)
        print("\n" + "="*40)
        print("LINGO CENTRAL BRAIN HEARTBEAT:")
        print(response.text.strip())
        print("="*40 + "\n")
        return True
    except Exception as e:
        print(f"CRITICAL: Aigis Protocol Connection Failed: {e}")
        return False

def analyze_new_project_image(image_path):
    """
    Uses Vision capabilities to extract project details and draft a professional response.
    """
    try:
        img = Image.open(image_path)
        print(f"Sofia AI is analyzing new project file: {image_path}...")
        
        # Multimodal prompt: Reading the image + System Instruction
        analysis_prompt = (
            "You are Sofia AI, a life partner for Four Love's LLC. "
            "Examine this project image. Extract the Project Name, Bid Date, and required services. "
            "Then, draft a professional email to the sender asking for the drawing download link "
            "and confirming if the bid date is still active or if there is an extension."
        )
        
        response = model.generate_content([analysis_prompt, img])
        print("\n--- SOFIA AI PROJECT ANALYSIS & DRAFT ---")
        print(response.text)
        print("------------------------------------------\n")
        
    except Exception as e:
        print(f"Error analyzing project image: {e}")

def monitor_project_inbox(folder_path="Project_Inbox"):
    """
    Listens for new image files in the specified folder.
    """
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        print(f"Created folder: {folder_path}. Drop your project images here.")

    print(f"Sofia AI is now listening for project updates in '{folder_path}'...")
    
    processed_files = set()
    
    while True:
        current_files = set(os.listdir(folder_path))
        new_files = current_files - processed_files
        
        for file_name in new_files:
            if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
                # Check safety protocol before every new file process
                if heartbeat_check():
                    full_path = os.path.join(folder_path, file_name)
                    analyze_new_project_image(full_path)
                    processed_files.add(file_name)
        
        time.sleep(5) # Check every 5 seconds

if __name__ == "__main__":
    # Start the automated workflow
    monitor_project_inbox()
import React, { useState } from "react";

const SimulationController = ({ onToggleOutage }) => {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleToggle = () => {
    setIsSimulating(!isSimulating);
    onToggleOutage(!isSimulating);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        border: "2px dashed #dc3545",
        borderRadius: "10px",
      }}
    >
      <h4 style={{ color: "#dc3545", marginTop: 0 }}>
        DEMO: Grid Outage Simulator
      </h4>
      <p style={{ fontSize: "13px" }}>
        Simulate a total cellular/cloud failure to test Aigis resilience.
      </p>

      <button
        onClick={handleToggle}
        style={{
          backgroundColor: isSimulating ? "#dc3545" : "#28a745",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {isSimulating
          ? "STOP SIMULATION: RESTORE GRID"
          : "START SIMULATION: GRID OUTAGE"}
      </button>

      {isSimulating && (
        <div
          style={{
            marginTop: "10px",
            color: "#dc3545",
            fontWeight: "bold",
            animation: "pulse 1s infinite",
          }}
        >
          ⚠️ GRID OFFLINE: Lingo Mesh maintaining 360-degree safety net.
        </div>
      )}
    </div>
  );
};

export default SimulationController;
