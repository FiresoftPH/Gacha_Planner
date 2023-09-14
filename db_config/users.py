from typing import Any
import pymysql
import pickle
from dotenv import dotenv_values

class UserData:
    def __init__(self):
        # user_input = {"primogems": 0, 
        #               "genesis_crystals": 0,
        #               "fates": 0,
        #               "pity": [0, False],
        #               "target_patch": "",
        #               "5_star_number": 1,
        #               "welkin": [0, 0],
        #               "bp": [0, 0]}
        self.limit = 5
        self.data = []

    def getData(self):
        return self.data
    
    def updateUserInput(self, data):
        if len(self.data) >= 5:
            return False
        else:
            self.data.append({"input": data, "output": {}})
            return True

    def updateProgramData(self, data):
        if len(self.data) >= 5:
            return False
        else:
            self.data[len(self.data)].update({"output": data})
            return True

def register(name, username, password):
    config = dotenv_values("db_config/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT username from users WHERE username = %s", username)
    user_data = cursor.fetchall()
    if user_data == ():
        cursor.execute("INSERT INTO users (name, username, password) VALUES (%s, %s, %s)", (name, username, password))
        connection.commit()
        connection.close()
        return True
    else:
        connection.close()
        return False
    
def login(username, password):
    config = dotenv_values("db_config/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT username, password from users WHERE username = %s AND password = %s", (username, password))
    user_data = cursor.fetchall()
    if user_data == ():
        connection.close()
        return False
    else:
        connection.close()
        return user_data[0]
    
def savePlannerData(username, input_data, output_data):
    config = dotenv_values("db_config/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    data = UserData()
    data.updateUserInput(input_data, output_data)
    pickled_data = pickle.dumps(data)
    cursor.execute("UPDATE users SET saved_data = %s WHERE username = %s", (pickled_data, username))
    
# print(register("Furina", "furina", "1"))
# print(login("furina", "13"))

