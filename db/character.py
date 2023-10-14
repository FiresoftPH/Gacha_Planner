import pickle
import pymysql
from dotenv import dotenv_values
from datetime import date

def addCharacterData(name, rarity, element, weapon, permanent):
    config = dotenv_values("db/.env")
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
    config = dotenv_values("db/.env")
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

def getCharacterRerunHistory():
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT name, rerun_history FROM character_data WHERE rarity = %s AND permanent = %s AND name != %s", ("5 Stars", False, "Aloy"))
    banners = list(cursor.fetchall())
    formatted_banners = {}
    for index in range(len(banners)):
        if banners[index][0] is not None:
            formatted_banners.update({banners[index][0]: pickle.loads(banners[index][1])})
        
        # banners[index] = list(banners[index])
        # if banners[index][0] is not None:
        #     banners[index][0] = pickle.loads(banners[index][1])
    
    connection.close()
    # print(banners)
    return formatted_banners

def getCharacterNames():
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT name FROM character_data")
    names = []
    for name in cursor.fetchall():
        names.append(name[0])
    connection.close()
    return names

def getAllCharacterData():
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT b.featured_5_star, c.element, c.weapon, b.version, b.start_date, b.version_half, c.rerun_history FROM banner_data b, character_data c WHERE c.name = b.featured_5_star AND c.permanent = 0 order by b.start_date")
    banner_history = cursor.fetchall()
    formatted_banner_history = {}
    for data in banner_history:
        if formatted_banner_history.get(data[0]) is None:
            formatted_banner_history.update({data[0]: [data[1], data[2], [[[data[3], date.isoformat(data[4])], data[5]]], pickle.loads(data[6])]})
        else:
            all_data = formatted_banner_history.get(data[0])
            all_data = all_data[2].append([[data[3], date.isoformat(data[4])], data[5]])

    return formatted_banner_history

def cli():
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

            if permanent == "":
                permanent = False
            else:
                permanent = True
        
        print("Inputs: ", name, rarity, element, weapon, permanent)
        confirm = int(input("Confirm? [1, 0]: "))
        if confirm == 1:
            addCharacterData(name, rarity, element, weapon, permanent)
        else:
            print("abort")

print(len(getAllCharacterData()))
# print(getCharacterRerunHistory())
