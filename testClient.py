import requests
import json

BASE_URL = "http://localhost:5000"

def getRecentRerunHistory():
    response = requests.get(BASE_URL + "/get/recent-rerun-history")
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def getCharacterRerunHistory():
    response = requests.get(BASE_URL + "/get/rerun-history")
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def calculateBannerEstimationData():
    response = requests.post(BASE_URL + "/calculate/banner-history", json=json.dumps({"date": [2023, 10, 5], "ehe": "bruh"}))
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def auth():
    response = requests.post(BASE_URL + "/auth/users", json=json.dumps({"username": "", "password": ""}))
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def register():
    response = requests.post(BASE_URL + "/auth/signup", json=json.dumps({"name": "", "username": "", "password": ""}))
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def calculations():
    load = {
        "primogems": 9600,
        "crystals": 120,
        "fates": 79,
        "guarantee": False,
        "pity": 0,
        "targetpatch": 4.2,
        "half": 1,
        "fiveorprimos": 0,
        "havewelkin": True, 
        "havebp": True,
        "welkindays": 51,
        "bp": True,
        "welkinplan": 3,
        "bpplan": 2,
        "currentdate": "2023-10-05",
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
        "username": "furina",
        "input": user_input,
        "output": program_output,
        "save_name": "Furinamains"
    }
    response = requests.post(BASE_URL + "/planner/save-data", json=json.dumps(load))
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

# calculateBannerEstimationData()
# getCharacterRerunHistory()
# getRecentRerunHistory()
# getCharacterRerunHistory()
# auth()

user_input, program_output = calculations()
saveData(user_input, program_output)