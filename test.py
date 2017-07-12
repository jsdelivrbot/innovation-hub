import json
import requests

user = {
    'firstName' : 'Felix',
    'lastName'  : 'Ganz',
    'promo'     : '2020',
}
r = requests.get('https://innovation-hub.herokuapp.com/user/create', user);
print(r.text);

r = requests.get('https://innovation-hub.herokuapp.com/user/');
users = json.loads(r.text);
for user in users:
    print(user['id']);
