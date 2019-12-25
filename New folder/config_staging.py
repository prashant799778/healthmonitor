# from flask import request
# from datetime import datetime
# import json
# import uuid
# import pymysql
# from flask import Flask, send_from_directory, abort                
# from flask_cors import CORS
# import cv2

# def Connection():
    # connection = pymysql.connect(host='localhost',
                                # user='root',
                                # password='tynor123',
                                # db='healthmonitor_staging',
                                # charset='utf8mb4',
                                # cursorclass=pymysql.cursors.DictCursor)

    ##cursor = connection.cursor()
    # return connection


DB_HOST = "125.65.46.25"
DB_PORT = 3606
DEFAULT_DB_NAME = "healthmonitor_staging"
#IMAGE_PATH_IP=
DB_USER = "root"
DB_PASS = "tynor123"
AUTH_DB = 'admin'
auth_Mechanism='SCRAM-SHA-1'