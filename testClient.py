import requests
import json
import datetime
import db.banner

BASE_URL = "http://localhost:5000/api"

"""
These functions are used to as a reference to use the API endpoints.

HTTP GET endpoints will use request.get()

HTTP POST endpoints will use request.post()

For post requests, look at the json load attach in the function.

Ex: json=json.dumps({"username": "furina", "password": "12345"}), the load is {"username": "furina", "password": "12345"}.

For all of the request, try running them alongside server.py to see expected output.
"""
def getRecentRerunHistory():
    response = requests.get(BASE_URL + "/get/recent-rerun-history")
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def getRerunRanking():
    response = requests.get(BASE_URL + "/get/rerun-ranking")
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def auth():
    response = requests.post(BASE_URL + "/auth/users", json=json.dumps({"username": "furina", "password": "12345"}))
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def register():
    response = requests.post(BASE_URL + "/auth/signup", json={"name": "", "username": "", "password": ""})
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def calculations():
    load = {
        "primogems": 11347,
        "crystals": 120,
        "fates": 80,
        "guarantee": False,
        "pity": 0,
        "targetpatch": 4.2,
        "half": 1,
        "fiveorprimos": 0,
        "havewelkin": True, 
        "havebp": True,
        "welkindays": 46,
        "bp": 25,
        "welkinplan": 3,
        "bpplan": 2,
        "fivestars": 2,
        "primowant": 0
    }
    response = requests.post(BASE_URL + "/planner/calculate", json=json.dumps(load))
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

    return load, response.json()

def saveData(user_input, program_output):
    load = {
        "username": "Hu Tao",
        "input": user_input,
        "output": program_output,
        "save_name": "save_name"
    }
    response = requests.post(BASE_URL + "/planner/save-data", json=json.dumps(load))
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def loadData():
    load = {
        "username":"furina"
    }
    response = requests.post(BASE_URL + "/planner/fetch-data", json=json.dumps(load))
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error", response.status_code)

def validBanner():
    response = requests.get(BASE_URL + "/planner/check-valid-banner")
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

"""
OUTPUT FORMAT: 
allCharacterDataFormat = {
    'Venti': ['Anemo', 'Bow', [[['1.0', datetime.date(2020, 9, 28)], 1], [['1.4', datetime.date(2021, 3, 17)], 1], 
    [['2.6', datetime.date(2022, 3, 20)], 1], [['3.1', datetime.date(2022, 9, 28)], 1]], [4, 9, 4, 8]],
    
    "Character Name": ['Element', 'Weapon', [["Version Name", "Start Date", 
    Version Half], ["Version Name", "Start Date", Version Half]...], Rerun Range] <--- This is the format
}

Note:
1. The "version" 2d array (From the outer array, it has the index 3) is sorted from earliest (First Debut/Rerun Banner) to latest.
2. The Rerun Range is also sorted from the la

Run the function below to see the format
"""
def getAllCharacterData():
    response = requests.get(BASE_URL + "/get/all-banner-data")
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def checkTargetPatch():
    response = requests.get(BASE_URL + "/get/all-banner-data")
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)
    
getAllCharacterData()
# calculations()
# validBanner()
# currentpatch_data = db.banner.checkValidInputBanner()
# currentpatch = float(currentpatch_data[0][0])
# currentpatch_enddate = currentpatch_data[0][2]
# getRerunRanking()
#getRecentRerunHistory()