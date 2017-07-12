import json
import requests

data = {
    'firstName' :       'Thomas',
    'lastName'  :       'Navennec',
};
r = requests.post('https://innovation-hub.herokuapp.com/db/createUser', data)
print(r.text)
