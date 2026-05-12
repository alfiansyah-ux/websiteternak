import subprocess
import os
import time
import urllib.request
import urllib.error
import json

cwd = os.getcwd()
proc = subprocess.Popen('npm start', shell=True, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
time.sleep(3)

try:
    data = json.dumps({'email': 'admin@example.com', 'password': 'Password123!'}).encode()
    req = urllib.request.Request('http://localhost:5000/api/auth/login', data=data, headers={'Content-Type': 'application/json'})
    resp = urllib.request.urlopen(req, timeout=5)
    print('STATUS', resp.status)
    print(resp.read().decode())
except urllib.error.HTTPError as e:
    print('ERR', e.code)
    print(e.read().decode())
except Exception as e:
    print('EXC', e)
finally:
    proc.kill()
    out, err = proc.communicate(timeout=5)
    print('PROCESS STDOUT')
    print(out)
    print('PROCESS STDERR')
    print(err)
