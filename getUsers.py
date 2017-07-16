import json
import requests
import sys

host = 'https://innovation-hub.herokuapp.com/'
# host = 'http://localhost:5000/'

print("Get : ");
r = requests.get(host + 'user/');
datas = json.loads(r.text);
for data in datas:
    print(data);
