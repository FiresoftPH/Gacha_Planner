import pickle
import pymysql
from dotenv import dotenv_values

def addCharacterData(name, rarity, element, weapon, permanent):
    config = dotenv_values(".env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM character_data where name = %s AND rarity = %s AND element = %s AND weapon = %s", (name, rarity, element, weapon))
    checkCharacterData = cursor.fetchall()
    if checkCharacterData != ():
        raise ValueError("Character Data Already Exist")
    else:
        cursor.execute("INSERT INTO character_data (name, rarity, element, weapon, permanent) VALUES (%s, %s, %s, %s, %s)", (name, rarity, element, weapon, permanent))
        connection.commit()
        connection.close()

def showCharacterData():
    config = dotenv_values(".env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM character_data")
    banners = cursor.fetchall()
    for banner in banners:
        print(banner)
    
    connection.close()

while True:
    showCharacterData()
    name = str(input("Name: "))
    rarity = str(input("Rarity: "))
    element = str(input("Element: "))
    weapon = str(input("Weapon: "))
    if rarity == "4 Stars":
        permanent = True
    else:
        permanent = str(input("Permanent: "))

        if permanent is "":
            permanent = False
        else:
            permanent = True

    
    print("Inputs: ", name, rarity, element, weapon, permanent)
    confirm = int(input("Confirm? [1, 0]: "))
    if confirm == 1:
        addCharacterData(name, rarity, element, weapon, permanent)
    else:
        print("abort")