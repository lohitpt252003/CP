from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import os, json, uuid
from evaluate import evaluate

app = Flask(__name__)
CORS(app, origins='*')

PROBLEMS_DIR = os.path.join(os.path.dirname(__file__), 'data', 'problems')

@app.route('/')
def index():
    return "backend is working"

@app.route('/problem/<problem_id>', methods=['GET'])
def get_problem(problem_id):
    filepath = os.path.join(PROBLEMS_DIR, f"{problem_id}.json")
    if not os.path.exists(filepath):
        return jsonify({"error": "Problem not found"}), 404
    with open(filepath, 'r') as f:
        data = json.load(f)
    return jsonify(data), 200

@app.route('/problems', methods=['GET'])
def list_problems():
    problems = []
    for filename in os.listdir(PROBLEMS_DIR):
        if filename.endswith('.json'):
            with open(os.path.join(PROBLEMS_DIR, filename)) as f:
                data = json.load(f)
                problems.append({
                    "id": data.get("problem_id", filename[:-5]),
                    "title": data.get("title", "Untitled Problem")
                })
    return jsonify(problems)

@app.route("/login", methods=["POST"])
def login_user():
    users_dir = "data/users"
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    for file in os.listdir(users_dir):
        with open(os.path.join(users_dir, file)) as f:
            user = json.load(f)
            if user["username"] == username and user["password"] == password:
                return jsonify({
                    "message": "Login successful",
                    "user_id": user["id"],
                    "username": user["username"]
                })
    return jsonify({"error": "Invalid username or password"}), 401

@app.route("/submissions/<int:user_id>", methods=["GET"])
def get_submissions_by_user(user_id):
    user_file = f"data/users/{user_id}.json"
    if not os.path.exists(user_file):
        return abort(404)
    with open(user_file) as f:
        user_data = json.load(f)

    user_submissions = []
    for sub_id in user_data.get("submissions", []):
        sub_path = f"data/submissions/{sub_id}.json"
        if os.path.exists(sub_path):
            with open(sub_path) as sf:
                user_submissions.append(json.load(sf))
    return jsonify(user_submissions)

@app.route('/submit', methods=['POST'])
def submit_code():
    data = request.json
    code = data.get("code")
    lang = data.get("lang")
    user_id = int(data.get("user_id"))
    problem_id = int(data.get("problem_id"))

    _data = {"code": code, "language": lang}
    res = evaluate(problem_id, _data)
    logs = res.get("logs", "No logs available")
    submission_id = str(uuid.uuid4().int)[:10]
    submission_path = f"data/submissions/{submission_id}.json"
    submission_data = {
        "submission_id": int(submission_id),
        "problem_id": problem_id,
        "user_id": user_id,
        "language": lang,
        "code": code,
        "status": "Accepted" if res["success"] else "Wrong Answer",
        "message": res["message"],
        "logs" : logs
    }

    with open(submission_path, 'w') as f:
        json.dump(submission_data, f, indent=2)

    user_file = f"data/users/{user_id}.json"
    with open(user_file) as f:
        user_data = json.load(f)

    user_data["submissions"].append(int(submission_id))
    with open(user_file, "w") as f:
        json.dump(user_data, f, indent=2)

    return jsonify({
        "message": "Submission evaluated.",
        "submission_id": submission_id,
        "status": submission_data["status"],
        "msg" : submission_data["message"],
        "logs": logs
    })

@app.route("/contests", methods=["GET"])
def get_all_contests():
    contest_dir = "data/contests"
    contests = []
    for fname in os.listdir(contest_dir):
        if fname.endswith(".json"):
            with open(os.path.join(contest_dir, fname)) as f:
                data = json.load(f)
                contests.append({
                    "id": data["id"],
                    "title": data["title"],
                    "start_time": data["start_time"],
                    "end_time": data["end_time"]
                })
    return jsonify(contests)


@app.route("/contest/<int:id>", methods=["GET"])
def get_contest_by_id(id):
    path = f"data/contests/{id}.json"
    if not os.path.exists(path):
        return jsonify({"error": "Contest not found"}), 404
    with open(path) as f:
        contest = json.load(f)
    return jsonify(contest)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
