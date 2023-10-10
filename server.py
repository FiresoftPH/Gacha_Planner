"""
server.py

This script creates all the private REST API endpoints for the gacha planner.
Created by Pattarapark Chutisamoot around mid-september

"""


from flask import Flask, request
from flask_cors import CORS
import db.character
import db.banner
import db.users
import db.primocalc
import json
import datetime

app = Flask(__name__)

@app.route('/auth/signup', methods=["POST"])
def register():
    data = request.get_json()
    data = json.loads(data)
    name = data['name']
    username = data['username']
    password = data['password']
    validation = db.users.register(name, username, password)
    if validation == True:
        return json.dumps({"message": "Sign Up Successfully"})
    else:
        return json.dumps({"error": "Use login instead"})

@app.route('/calulate/validbanner', methods=["POST"])  
def checkValidDate():
    data = request.json()
    data = json.loads(data)
    current_date = data['current_date']
    versions = db.banner.checkValidInputBanner(current_date)
    return json.dumps({"load": versions})
    
@app.route('/auth/users', methods=["POST"])
def authentication():
    data = request.get_json()
    data = json.loads(data)
    username = data['username']
    password = data['password']
    auth = db.users.login(username, password)
    if auth == False:
        return json.dumps({"error": "Wrong Password"})
    else:
        return json.dumps({"message": "Login Successfully"})

@app.route('/get/rerun-history')
def getCharacterRerunHistory():
    return json.dumps(db.character.sendCharacterRerunHistory())

@app.route('/get/recent-rerun-history')
def getRecentRerunHistory():
    return json.dumps(db.banner.sendRecentCharacterBanner())

@app.route('/calculate/banner-history', methods=["POST"])
def recalculateBannerHistory():
    data = request.get_json()
    data = json.loads(data)
    date = data["date"]
    character_names = db.character.getCharacterNames()
    for name in character_names:
        db.banner.calculateBannerEstimationData(date[0], date[1], date[2], name)
    return json.dumps(db.character.sendCharacterRerunHistory())

@app.route('/planner/checkvalidpatch', methods=["POST"])
def checkValidInputBanner():
    data = request.get_json()
    currentdate = data["currentdate"]
    possible_banners = db.banner.checkValidInputBanner(currentdate)
    return json.dumps(possible_banners)

@app.route('/planner/calculate', methods=["POST"])
def calculatePlannerData():
    data = request.get_json()
    data = json.loads(data)
    primos = data['primogems']
    crystals = data['crystals']
    fates = data['fates']
    guarantee = data["guarantee"]
    pity = data['pity']
    targetpatch = data['targetpatch']
    half = data['half']
    fiveorprimos = data['fiveorprimos']
    havewelk = data["havewelkin"]
    havebp = data["havebp"]
    welkin = data["welkindays"]
    bp = data["bp"]
    welkinplan = data["welkinplan"]
    bpplan = data["bpplan"]
    fivestars = data["fivestars"]
    primowant = data["primowant"]

    currentdate = datetime.date.today()

    possible_banners = db.banner.checkValidInputBanner(currentdate)
    currentpatch = float(possible_banners[0][0])
    currentpatch_date = possible_banners[0][2]
    # print(currentpatch)

    calculation_results = db.primocalc.calculations(primos, crystals, fates, pity, havewelk, havebp, welkin, bp, welkinplan, bpplan,
                                                    fiveorprimos, currentpatch, currentpatch_date, guarantee, targetpatch, 
                                                    half, fivestars, primowant)
    
    return json.dumps(calculation_results)

@app.route('/planner/save-data', methods=["POST"])
def savePlannerData():
    data = request.get_json()
    data = json.loads(data)
    username = data["username"]
    input_data = data["input"]
    output_data = data["output"]
    save_name = data["save_name"]
    check_operation = db.users.savePlannerData(username, input_data, output_data, save_name)
    if check_operation == False:
        return json.dumps({"error": "Data limit reached or user doesn't exists"})
    else:
        return json.dumps({"message": "Saved Successfully"})

@app.route('/planner/fetch-data', methods=["POST"])
def fetchPlannerData():
    data = request.get_json()
    data = json.loads(data)
    username = data["username"]
    user_data = db.users.fetchUserData(username)
    if user_data == False:
        return json.dumps({"error": "No saved data found"})
    else:
        return json.dumps(user_data)

if __name__ == '__main__':
    app.run(debug=True)
    CORS(app, ['http://localhost'])
