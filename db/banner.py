import pickle
import pymysql
from dotenv import dotenv_values
from datetime import date, timedelta
from math import floor

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

def calculateBannerEstimationData(character_name):
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
            diff = date.today() - banners[index][3]
            if diff.days < 21:
                history_period.append(0)
            # elif diff.days >= 21:
            #     history_period.append(1)
            else:
                history_period.append(floor(diff.days / 42))

    # print(history_period)
    cursor.execute("UPDATE character_data SET rerun_history = %s where name = %s", (pickle.dumps(history_period), character_name))
    connection.commit()

def getRecentCharacterBanner():
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT b.featured_5_star, MAX(b.version), MAX(b.start_date), MAX(b.version_half) FROM banner_data b INNER JOIN character_data c WHERE c.name = b.featured_5_star and c.permanent = 0 GROUP BY b.featured_5_star ORDER BY MAX(b.start_date)")
    data = list(cursor.fetchall())
    formatted_data = {}
    for index in range(len(data)):
        # data[index] = list((data[index][0], data[index][1]))
        formatted_data.update({data[index][0] : [data[index][1], data[index][3]]})

    # print(json.dumps(data))
    connection.close()
    return formatted_data

def checkValidInputBanner():
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    current_date = date.today()
    cursor.execute("SELECT DISTINCT version, start_date, end_date FROM banner_data WHERE end_date > %s ORDER BY start_date", current_date)
    data = cursor.fetchall()
    connection.close()
    return data

def getPreviousPatch():
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    current_date = date.today() - timedelta(days=21)
    cursor.execute("SELECT DISTINCT version, start_date, end_date FROM banner_data WHERE end_date > %s ORDER BY start_date", current_date)
    data = cursor.fetchall()
    connection.close()
    return data

def input_cli():
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

def addingNewColumn():
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM banner_data ORDER BY start_date")
    banners = cursor.fetchall()
    for banner in banners:
        print(banner)
        half = int(input("Half? (3 for skip): "))
        if half not in [1, 2]:
            break
        cursor.execute("UPDATE banner_data SET version_half = %s WHERE version = %s AND featured_5_star = %s", (half, banner[0], banner[1]))
        connection.commit()
    
    connection.close()

def getRerunRanking():
    config = dotenv_values("db/.env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT b.featured_5_star, MAX(b.version), MAX(b.start_date), c.rerun_history FROM banner_data b INNER JOIN character_data c WHERE c.name = b.featured_5_star and c.permanent = 0 GROUP BY b.featured_5_star ORDER BY MAX(b.start_date) limit 5;")
    rankings = cursor.fetchall()
    formatted_ranking = {}
    for ranking in rankings:
        rerun_history = pickle.loads(ranking[3])
        formatted_ranking.update({ranking[0]: [ranking[1], rerun_history[len(rerun_history) - 1]]})

    return formatted_ranking

def runRecalculationScript():
    import character
    character_names = character.getCharacterNames()
    for name in character_names:
        calculateBannerEstimationData(name)

    # print(character.getCharacterRerunHistory())
# runRecalculationScript()

# print(getRecentCharacterBanner())
# print(checkValidInputBanner()[0][0])
# print(getRerunRanking())

# addingNewColumn()