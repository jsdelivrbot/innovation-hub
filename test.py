import json
import requests

data = {
    'name' : 'Felix',
    'origin'    : 'Cocreer',
    'unit'      : 'm2',
    'category'  : 'Temperature',
    'value'     : '18',
    'svalue'    : '',
}
r = requests.post('https://innovation-hub.herokuapp.com/hubData/create', data);
print(r.text);

r = requests.get('https://innovation-hub.herokuapp.com/hubData/');
datas = json.loads(r.text);
for data in datas:
    print(data);
