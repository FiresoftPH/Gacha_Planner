from typing import Any
import pymysql
import pickle
from dotenv import dotenv_values

DATA_LIMIT = 5

class UserData:
    def __init__(self, user_input = {}):
        # user_input = {"primogems": 0, 
        #               "genesis_crystals": 0,
        #               "fates": 0,
        #               "pity": [0, False],
        #               "target_patch": "",
        #               "5_star_number": 1,
        #               "welkin": [0, 0],
        #               "bp": [0, 0]}
        self.data = {"input": user_input, "output": {}}


    def getData(self):
        return self.data
    
    def updateUserInput(self, data):
        if len(self.data) >= DATA_LIMIT:
            return False
        else:
            self.data.update({"input": data, "output": {}})
            return True

    def updateProgramOutput(self, data):
        if len(self.data) >= DATA_LIMIT:
            return False
        else:
            self.data.update({"output": data})
            return True

def register(name, username, password):
    config = dotenv_values("db/.env")
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
    config = dotenv_values("db/.env")
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
    
def savePlannerData(username, input_data, output_data, save_name):
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    data = UserData()
    data.updateUserInput(input_data)
    data.updateProgramOutput(output_data)
    pickled_data = pickle.dumps(data)
    cursor.execute("SELECT * user_data where username = %s", username)
    global DATA_LIMIT
    check_limit = cursor.fetchall()
    if len(check_limit) > DATA_LIMIT:
        connection.close()
        return False
    else:
        cursor.execute("INSERT INTO user_data (username, saved_data_name, saved_data) VALUES (%s, %s, %s)", (username, save_name, pickled_data))
        connection.commit()
        connection.close()
        return True

    
# print(register("Furina", "furina", "1"))
# print(login("furina", "13"))

