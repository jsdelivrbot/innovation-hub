# Welcome to the innovation-hub wiki!

## API
The Epitech Innovation Hub API is used to send and receive data (physical or virtual) from the Innovation Hub Server.

### How to : an example

You can use any language you want, but we'd recommand using a high level language such as Python or Ruby.

```python
#!/bin/python
import json
import requests

r = requests.get('https://innovation-hub.herokuapp.com/users/'); # get all users as json
users = json.loads(r.text); # transform json to array of objects
for user in users: # for each user
    print(user['id']); # print its id
```

This code snippet will give

```ruby
1
2
3
4
5
6
7
```

## Models

Through the Epitech Innovation Hub API you can collect and send data regarding different objects. For each model you can get a list, add an element or remove one by Id. Keep in mind this is a beta version of the API, more features will be available in the future.

+ user
```python
firstName : String
lastName : String
promo : Integer
```
+ hubData
```python
name: { type: Sequelize.STRING, defaultValue: 'DefaultName' },
category: { type: Sequelize.STRING, defaultValue: 'Undefined' }, # What data category is that ?
unit: { type: Sequelize.STRING, defaultValue: 'Undefined' }, # What is the value's unit ?
value: { type: Sequelize.INTEGER, defaultValue: -1 }, # Value as integer
svalue: { type: Sequelize.STRING, defaultValue: 'Undefined' }, # If your data is not an integer, used Stringvalue
```

For each model you can :
+ get : /model -> Get all elements 
+ post : /model/create -> Create a new element
+ post : /model/delete -> Delete an element by ID

## View

For now data is viewed through a standard HTML Table. Soon you will be able to declare your own Model and Views through the API. Please be patient ! :)
___
This is only the beginning. Feel free to contact me on Github or by email : felix.ganz@epitech.eu