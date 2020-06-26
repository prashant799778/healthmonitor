from flask import request
from datetime import datetime
import json
import uuid
import pymysql
from flask import Flask, send_from_directory, abort                
from flask_cors import CORS


def Connection():
    connection = pymysql.connect(host='localhost',
                                user='smarticu',
                                password='SmartIcu&%live1',
                                db='smarticu1',
                                charset='utf8mb4',
                                cursorclass=pymysql.cursors.DictCursor)

    #cursor = connection.cursor()
    return connection


url="https://api.digitologyhealthcare.com"
#healthmonitor