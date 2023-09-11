from flask import Flask, request
from flask_cors import CORS
import db_config.character
import db_config.banner
import json

app = Flask(__name__)

def authentication(username, password):
    pass

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
    CORS(app)
