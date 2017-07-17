import json
import requests

# host = 'https://innovation-hub.herokuapp.com/'
host = 'http://localhost:6000/'

# category: { type: Sequelize.STRING, defaultValue: 'Undefined' },
# room: { type: Sequelize.STRING, defaultValue: 'Innovation Hub' },
# boxId: { type: Sequelize.INTEGER, defaultValue: 0},
# value: { type: Sequelize.INTEGER, defaultValue: -1 },
# unit: { type: Sequelize.STRING, defaultValue: 'Undefined'},
# img: { type: Sequelize.STRING, defaultValue: 'Undefined'},

data = {
    'category' : 'Temperature',
    'room': 'Hallway',
    'boxId' : '1',
    'value' : '18',
    'unit' : 'Celsius',
    'img' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGnXCC-4JueYCdreZaMc_Toid9mfVTEwpLrG__9Iz7qZV00t-P',
}

r = requests.post(host + 'hubData/create', data);
print('Create');
print(r.text);
# r = requests.get(host + 'hubData/');
# print(r.text);
# datas = json.loads(r.text);
# for data in datas:
#     print(data);
