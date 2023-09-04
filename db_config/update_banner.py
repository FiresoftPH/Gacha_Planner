import pickle
import pymysql
from dotenv import dotenv_values

def addBannerData(versionNumber, ssr, sr_list, start_date, end_date):
    sr_list = pickle.dumps(sr_list)
    config = dotenv_values(".env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM banner_data WHERE version_number = %s AND featured_5_star = %s AND featured_4_star = %s AND start_date = %s AND end_date = %s", (versionNumber, ssr, sr_list, start_date, end_date))
    checkSimilarBanner = cursor.fetchall()
    if checkSimilarBanner != ():
        raise ValueError("Banner already exists, modify banner data instead")
    else:
        cursor.execute("INSERT INTO banner_data (version_number, featured_5_star, featured_4_star, start_date, end_date) VALUES (%s, %s, %s, %s, %s)", (versionNumber, ssr, sr_list, start_date, end_date))
        connection.commit()
        connection.close()

# addBannerData("1.0", "Venti", ["Barbara", "Fischl", "Xiangling"], "2020-09-28", "2020-10-18")

def showDatabase():
    sr_list = pickle.dumps(sr_list)
    config = dotenv_values(".env")
    connection = pymysql.connect(
    host = config["HOST"],
    port = int(config["PORT"]),
    user = config["USERNAME"],
    password = config["PASSWORD"],
    database = config["DATABASE"]
    )
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM banner_data WHERE version_number = %s AND featured_5_star = %s AND featured_4_star = %s AND start_date = %s AND end_date = %s", (versionNumber, ssr, sr_list, start_date, end_date))
    banners = cursor.fetchall()
    for banner in banners:
        print(banner)

while True:
    vn = str(input("Version No. : "))
    ssr = str(input("SSR"))
    sr_1 = str(input("SR_1: "))
    sr_2 = str(input("SR_2: "))
    sr_3 = str(input("SR_3: "))
    sd = str(input("Start Date: "))
    ed = str(input("End Date: "))
    confirm = int(input("Confirm? [1, 0]: "))
    if confirm == 1:
        addBannerData(vn,ssr, [sr_1, sr_2, sr_3], sd, ed)
    else:
        print("abort")