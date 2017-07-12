import json
import requests

data = {
    'firstName' :       'Thomas',
    'lastName'  :       'Navennec',
};
r = requests.post('https://innovation-hub.herokuapp.com/users/createUser', data)
print(r.text)
user = json.loads(r.text);
print(user['id']);
r = requests.post('https://innovation-hub.herokuapp.com/users/deleteUser', {id: user['id']})
print(r.text)
