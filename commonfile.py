from flask import request
from datetime import datetime
import json
import uuid
import pymysql
from flask import Flask, send_from_directory, abort                
from flask_cors import CORS
import cv2

def Connection():
    connection = pymysql.connect(host='localhost',
                                user='root',
                                password='tynor123',
                                db='healthmonitor',
                                charset='utf8mb4',
                                cursorclass=pymysql.cursors.DictCursor)

    #cursor = connection.cursor()
    return connection

