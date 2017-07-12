import json
import requests

data = {
    'firstName' :       'JESUIS',
    'lastName'  :       'JSON',
};
data_json = json.dumps(data)
payload = {'json_payload': data_json, 'apikey': 'myApiKey'}
r = requests.post('http://www.innovation-hub.herokuapp.com/db/createUser',
                  data=payload)
print(r)
