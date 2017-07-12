import json
import requests

data = {
    'firstName' :       'JESUIS',
    'lastName'  :       'JSON',
};
r = requests.post('https://innovation-hub.herokuapp.com/db/createUser', data)
print(r)
