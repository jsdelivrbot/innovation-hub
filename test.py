import json
import requests

host = 'https://innovation-hub.herokuapp.com/'
# host = 'http://localhost:5000/'

data = {
    'firstName' : 'Felix',
    'lastName' : 'Ganz',
    'promo' : '2020',
    'imgurl' : 'https://cdn.local.epitech.eu/userprofil/profilview/felix.ganz.jpg',
    'title' : 'Lord',
    'rank' : '100',
}

r = requests.post(host + 'user/create', data);
print(r.text);

r = requests.get(host + 'user/');
datas = json.loads(r.text);
for data in datas:
    print(data);
