import json
import requests

r = requests.get('https://innovation-hub.herokuapp.com/users/');
users = json.loads(r.text);
for user in users:
    print(user['id']);
