import json
import requests

r = requests.get('https://innovation-hub.herokuapp.com/user/');
users = json.loads(r.text);
for user in users:
    print(user['id']);
