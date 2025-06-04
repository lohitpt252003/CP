from flask import Flask, jsonify, send_from_directory, abort
import os
import json

app = Flask(__name__)

# Absolute path to the problems directory
PROBLEMS_DIR = os.path.join(os.path.dirname(__file__), 'data', 'problems')

@app.route('/')
def index():
   return "backend is working" 


@app.route('/problem/<problem_id>', methods=['GET'])
def get_problem(problem_id):
    """
    Fetch the full JSON for a given problem by ID.
    Example: /problem/problem1
    """
    filename = f"{problem_id}.json"
    filepath = os.path.join(PROBLEMS_DIR, filename)

    if not os.path.exists(filepath):
        return jsonify({"error": "Problem not found"}), 404

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format"}), 500

    # Proof: Ensures required keys are present
    if "problem_id" not in data or "title" not in data:
        return jsonify({"error": "Missing problem metadata"}), 500

    return jsonify(data), 200

@app.route('/problems', methods=['GET'])
def list_problems():
    """
    List all available problems with their IDs and titles.
    Example: /problems
    Response: [{"id": "problem1", "title": "Coin Change - Minimum Coins"}, ...]
    """
    problems = []
    try:
        for filename in os.listdir(PROBLEMS_DIR):
            if filename.endswith('.json'):
                filepath = os.path.join(PROBLEMS_DIR, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    try:
                        data = json.load(f)
                        problems.append({
                            "id": data.get("problem_id", filename[:-5]),
                            "title": data.get("title", "Untitled Problem")
                        })
                    except json.JSONDecodeError:
                        continue  # skip invalid files
        return jsonify(problems), 200
    except FileNotFoundError:
        return jsonify({"error": "Problems directory not found"}), 500

if __name__ == '__main__':
    app.run(debug=True)
