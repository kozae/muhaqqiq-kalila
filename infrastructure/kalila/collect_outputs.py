import json
import sys

# File name for accumulated data
DATA_FILE = "temp_data.json"

# Check if the accumulated data file exists, and if so, read from it
try:
    with open(DATA_FILE, "r") as f:
        accumulated_outputs = json.load(f)
except FileNotFoundError:
    accumulated_outputs = []

# Read the current stack's outputs from standard input
current_outputs = json.load(sys.stdin)
if current_outputs is not None:
    accumulated_outputs.extend(current_outputs)

# Write the accumulated data back to the temporary file
with open(DATA_FILE, "w") as f:
    json.dump(accumulated_outputs, f, indent=2)
