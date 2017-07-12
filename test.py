import json
import requests

# host = 'https://innovation-hub.herokuapp.com/'
host = 'http://localhost:5000/'

data = {
    'name' : 'Felix',
    'origin'    : 'Cocreer',
    'unit'      : 'm2',
    'category'  : 'Temperature',
    'value'     : '18',
    'svalue'    : '',
}
r = requests.post(host + 'hubData/create', data);
print(r.text);

r = requests.get(host + 'hubData/');
datas = json.loads(r.text);
for data in datas:
    print(data);
