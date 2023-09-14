from flask import Flask, request
from flask_cors import CORS
import db_config.character
import db_config.banner
import db_config.users
import json

app = Flask(__name__)

@app.route('/auth/signup', methods=["POST"])
def register():
    data = request.get_json()
    data = json.loads(data)
    name = data['name']
    username = data['username']
    password = data['password']
    validation = db_config.users.register(name, username, password)
    if validation == True:
        return json.dumps({"details": "Sign Up Successfully"})
    else:
        return json.dumps({"error": "Use login instead"})
    
@app.route('/auth/users', methods=["POST"])
def authentication():
    data = request.get_json()
    data = json.loads(data)
    username = data['username']
    password = data['password']
    auth = db_config.users.login(username, password)
    if auth == False:
        return json.dumps({"error": "Wrong Password"})
    else:
        return json.dumps({"details": "Login Successfully"})

@app.route('/get/character-data')
def getCharacterData():
    return json.dumps(db_config.character.sendCharacterData())

@app.route('/calculate/banner-history', methods=["POST"])
def recalculateBannerHistory():
    data = request.get_json()
    data = json.loads(data)
    date = data["date"]
    character_names = db_config.character.getCharacterNames()
    for name in character_names:
        db_config.banner.calculateBannerEstimationData(date[0], date[1], date[2], name)
    return json.dumps(db_config.character.sendCharacterData())

if __name__ == '__main__':
    app.run(debug=True)
    CORS(app, ['http://localhost'])
