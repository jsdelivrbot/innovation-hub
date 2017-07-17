import json
import requests
import sys

host = 'https://innovation-hub.herokuapp.com/'
# host = 'http://localhost:5000/'

data = {
    'firstName' : 'Clara',
    'lastName' : 'Girard',
    'promo' : '2020',
    'imgurl' : 'https://cdn.local.epitech.eu/userprofil/profilview/clara.girard.jpg',
    'title' : 'Lady',
    'rank' : '10',
    'there' : 'true',
}

# r = requests.post(host + 'user/leave', {'id': '2'});
# print(r.text);

r = requests.post(host + 'user/create', data);
print("Create : ");
print(r.text);

# print("Get : ");
# r = requests.get(host + 'user/');
# datas = json.loads(r.text);
# for data in datas:
#     print(data);
