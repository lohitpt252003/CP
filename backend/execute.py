import os
import subprocess
import tempfile

LANG_COMMANDS = {
    'c': {
        'ext': '.c',
        'compile': lambda src, out: ['gcc', src, '-o', out + '.exe'],
        'run': lambda out: [out + '.exe']
    },
    'cpp': {
        'ext': '.cpp',
        'compile': lambda src, out: ['g++', src, '-o', out + '.exe'],
        'run': lambda out: [out + '.exe']
    },
    'py': {
        'ext': '.py',
        'run': lambda src: ['python', src]
    },
    'js': {
        'ext': '.js',
        'run': lambda src: ['node', src]
    },
    'java': {
        'ext': '.java',
        'compile': lambda src, _: ['javac', src],
        'run': lambda src: ['java', os.path.splitext(os.path.basename(src))[0]]
    }
}

def run_code(code, lang, input_data=""):
    if lang not in LANG_COMMANDS:
        return f"Language '{lang}' not supported."

    cfg = LANG_COMMANDS[lang]

    with tempfile.TemporaryDirectory() as tmp:
        source_path = os.path.join(tmp, f'main{cfg["ext"]}')
        with open(source_path, 'w') as f:
            f.write(code)

        exe_path = os.path.join(tmp, 'program')
        compile_cmd = cfg.get('compile')
        run_cmd = cfg['run']

        if compile_cmd:
            result = subprocess.run(compile_cmd(source_path, exe_path), stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            if result.returncode != 0:
                return f"Compilation error:\n{result.stderr}"

        if lang == 'java':
            run_proc = subprocess.run(run_cmd(source_path), cwd=tmp, input=input_data, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        else:
            run_proc = subprocess.run(run_cmd(exe_path if compile_cmd else source_path), cwd=None, input=input_data, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        if run_proc.returncode != 0:
            return f"Runtime error:\n{run_proc.stderr}"

        return run_proc.stdout.strip()
