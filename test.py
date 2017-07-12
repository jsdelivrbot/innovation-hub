import json
import requests

data = {
    'firstName' :       'Thomas',
    'lastName'  :       'Navennec',
};
r = requests.post('https://innovation-hub.herokuapp.com/db/createUser', data)
print(r.text)
data.id = int(s) for s in r.text.split() if s.isdigit()
r = requests.post('https://innovation-hub.herokuapp.com/db/deleteUser', data.id)
print(r.text)
