import pickle
import pymysql
from dotenv import dotenv_values
from datetime import date
from math import floor
import json

def addBannerData(versionNumber, ssr, sr_1, sr_2, sr_3, start_date, end_date):
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM banner_data WHERE version = %s AND featured_5_star = %s AND start_date = %s AND end_date = %s"
                   , (versionNumber, ssr, start_date, end_date))
    checkSimilarBanner = cursor.fetchall()
    if checkSimilarBanner != ():
        raise ValueError("Banner already exists, modify banner data instead")
    else:
        cursor.execute("INSERT INTO banner_data (version, featured_5_star, featured_4_star_1, featured_4_star_2, featured_4_star_3, start_date, end_date) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                       , (versionNumber, ssr, sr_1, sr_2, sr_3, start_date, end_date))
        connection.commit()
        connection.close()

# addBannerData("1.0", "Venti", ["Barbara", "Fischl", "Xiangling"], "2020-09-28", "2020-10-18")

def showBannerData():
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM banner_data")
    banners = cursor.fetchall()
    for banner in banners:
        print(banner)
    
    connection.close()

def calculateBannerEstimationData(year, month, day, character_name):
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT version, featured_5_star, start_date, end_date FROM banner_data WHERE featured_5_star = %s ORDER BY start_date ASC", character_name)
    banners = cursor.fetchall()
    # print(banners)
    history_period = []
    for index in range(len(banners)):
        try:
            # print(index)
            # Calculate the number of patches in each rerun
            diff = banners[index + 1][3] - banners[index][3]
            # print(diff.days // 42)
            history_period.append(floor(diff.days / 42))

        except IndexError:
            # Calculate the number of patches that this character isnt rerun
            diff = date(year, month, day) - banners[index][3]
            if diff.days < 21:
                history_period.append(0)
            # elif diff.days >= 21:
            #     history_period.append(1)
            else:
                history_period.append(floor(diff.days / 42))

    # print(history_period)
    cursor.execute("UPDATE character_data SET rerun_history = %s where name = %s", (pickle.dumps(history_period), character_name))
    connection.commit()

def sendRecentCharacterBanner():
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT featured_5_star, MAX(version), MAX(start_date) FROM banner_data GROUP BY featured_5_star")
    data = list(cursor.fetchall())
    for index in range(len(data)):
        # data[index] = list((data[index][0], data[index][1]))
        data[index] = {data[index][0] : data[index][1]}

    # print(json.dumps(data))
    connection.close()
    return data

def checkValidInputBanner(current_date):
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT DISTINCT version, start_date, end_date FROM banner_data WHERE end_date > %s ", current_date)
    data = cursor.fetchall()
    connection.close()
    return data

def cli():
    while True:
        showBannerData()
        vn = str(input("Version No. : "))
        ssr = str(input("SSR: "))
        sr_1 = str(input("SR_1: "))
        sr_2 = str(input("SR_2: "))
        sr_3 = str(input("SR_3: "))
        sd = str(input("Start Date: "))
        ed = str(input("End Date: "))
        print("Inputs: ", vn,ssr, sr_1, sr_2, sr_3, sd, ed)
        confirm = int(input("Confirm? [1, 0]: "))
        if confirm == 1:
            addBannerData(vn,ssr, sr_1, sr_2, sr_3, sd, ed)
        else:
            print("abort")

# sendRecentCharacterBanner()