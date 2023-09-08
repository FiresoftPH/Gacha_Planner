import requests
import json

BASE_URL = "http://localhost:5000"

def getCharacterData():
    response = requests.get(BASE_URL + "/get/character-data")
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

def calculateBannerEstimationData():
    response = requests.post(BASE_URL + "/calculate/banner-history", json=json.dumps({"date": [2023, 9, 9], "ehe": "bruh"}))
    if response.status_code == 200:
        print(response.json())
    else:
        print("Error: ", response.status_code)

calculateBannerEstimationData()
# getCharacterData()