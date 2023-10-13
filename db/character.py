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
    cursor.execute("SELECT b.featured_5_star, c.element, c.weapon, b.version, b.start_date, c.rerun_history FROM banner_data b, character_data c WHERE c.name = b.featured_5_star order by b.start_date")
    banner_history = cursor.fetchall()
    banner_history = list(banner_history)
    for index in range(len(banner_history)):
        banner_history[index] = list(banner_history[index])
        banner_history[index][5] = pickle.loads(banner_history[index][5])
        banner_history[index][4] = date.isoformat(banner_history[index][4])

    return banner_history

temp = {
    "Albedo": ['Geo', 'Sword', [['1.2', '2020-12-23'], ["2.3", "2021-06-17"]], [8, 7, 8]],
    "Alhaitham": []
}
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

# print(getAllCharacterData())
# print(getCharacterRerunHistory())
