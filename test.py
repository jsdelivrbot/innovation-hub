import json
import requests

host = 'https://innovation-hub.herokuapp.com/'

data = {
    'category' : 'Temperature',
    'room': 'Lazy Studio',
    'boxId' : '1',
    'value' : '520',
    'unit' : 'Lumen',
    'img' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGnXCC-4JueYCdreZaMc_Toid9mfVTEwpLrG__9Iz7qZV00t-P',
}

# r = requests.post(host + 'hubData/create', data);
# print('Create');
# print(r.text);
r = requests.get(host + 'hubData/');
print(r.text);
# datas = json.loads(r.text);
# for data in datas:
#     print(data);
