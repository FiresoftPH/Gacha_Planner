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
    response = requests.post(BASE_URL + "/calculate/banner-history", json=json.dumps({"date": [2023, 9, ], "ehe": "bruh"}))
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

# calculateBannerEstimationData()
# getCharacterRerunHistory()
# getRecentRerunHistory()
# getCharacterRerunHistory()
# auth()