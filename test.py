import json
import requests

host = 'https://innovation-hub.herokuapp.com/'
# host = 'http://localhost:5000/'

# data = {
#     'firstName' : 'Michael',
#     'lastName' : 'Halfail',
#     'promo' : '2020',
#     'imgurl' : 'https://cdn.local.epitech.eu/userprofil/profilview/michael.halfon.jpg',
#     'title' : 'Peon',
#     'rank' : '0',
# }

# r = requests.post(host + 'user/create', data);
# print(r.text);

r = requests.get(host + 'event/');
print(r.text);
# datas = json.loads(r.text);
# for data in datas:
#     print(data);
