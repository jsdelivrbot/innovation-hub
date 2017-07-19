import json
import requests

host = 'https://innovation-hub.herokuapp.com/'

data = {
    'category' : 'Misc',
    'room': 'All',
    'boxId' : '1',
    'value' : '',
    'unit' : 'Please visit https://github.com/ganzf/innovation-hub/wiki',
    'img' : 'http://egyptiankarim.com/icons/github/github-512-black.png',
}

r = requests.post(host + 'hubData/create', data);
print('Create');
print(r.text);
# r = requests.post(host + 'hubData/delete', {'id' : '2'});
# print(r.text);
# datas = json.loads(r.text);
# for data in datas:
#     print(data);
