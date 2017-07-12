import json
import re
import requests

data = {
    'firstName' :       'Thomas',
    'lastName'  :       'Navennec',
};
r = requests.post('https://innovation-hub.herokuapp.com/db/createUser', data)
print(r.text)
# data.id = r.text.split()
# r = requests.post('https://innovation-hub.herokuapp.com/db/deleteUser', data.id)
# print(r.text)
