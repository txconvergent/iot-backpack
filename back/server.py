from flask import Flask, redirect
from flask import request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from sqlalchemy import create_engine
import time

engine = create_engine( "postgres://localhost/backpack")
connection = engine.connect()

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route('/')
@app.route('/test')
def test():
    return "hello, world!"

@app.route('/gps')
def gps():
    sql_query = """select time, lat, long from gps  where time >
        {} order by time desc limit 1;""".format(time.time() - 3600)
    result = connection.execute(sql_query)
    for row in result:
        print(row)
    data = None
    return "ret"

@app.route('/insert_gps')
def insert_gps():
    dum_lat = 50
    dum_long = 50
    dum_time = time.time()
    sql_query = """insert into gps
        (lat, long, time)
        values ({}, {}, {});""".format(
            dum_lat, dum_long, dum_time
        )
    result = connection.execute(sql_query)
    return "completed insert"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0") 
