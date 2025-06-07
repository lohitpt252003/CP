import os
from execute import run_code

def evaluate(problem_id, data):
    status = {
        'success': False,
        'message': '',
        'logs': []
    }

    code = data.get('code')
    language = data.get('language')
    testcases_dir = f"data/problems/testcases/{problem_id}"

    if not os.path.exists(testcases_dir):
        status['message'] = f"Testcases directory for problem {problem_id} not found."
        return status

    inputs = sorted([f for f in os.listdir(testcases_dir) if f.endswith('.in')])
    total = len(inputs)

    for i, input_file in enumerate(inputs):
        input_path = os.path.join(testcases_dir, input_file)
        output_path = input_path.replace('.in', '.out')

        with open(input_path, 'r') as f:
            input_data = f.read().strip()
        with open(output_path, 'r') as f:
            expected_output = f.read().strip()

        output = run_code(code, language, input_data)
        print(f'\nTestcase {i+1}:\nInput: {input_data}\nExpected: {expected_output}\nOutput: {output}')

        status['logs'].append({
            'testcase': i + 1,
            'input': input_data,
            'expected': expected_output,
            'output': output
        })
        
        if output.strip() != expected_output.strip():
            print(f"Testcase {i+1} failed.\nExpected: {expected_output}\nGot: {output}")
            status['message'] = f"Testcase {i+1} failed.\nExpected: {expected_output}\nGot: {output}"
            return status

    status['success'] = True
    status['message'] = 'All testcases passed.'
    return status
