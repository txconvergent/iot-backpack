from flask import Flask, redirect
from flask import request, jsonify
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
    sql_query = """select time, lat, long from gps order by time desc limit 1;"""
    result = connection.execute(sql_query)
    row = result.first()
    loc_obj  = {
                "time": float(row["time"]),
                "loc": {
                    "lat": float(row["lat"]),
                    "long": float(row["long"])
                }
           }
    return jsonify(loc_obj)

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

@app.route('/acceleration')
def acceleration():
    sql_query = """select time, acceleration from acceleration order by time
    desc limit 1000;"""
    result = connection.execute(sql_query)
    row = result.first()
    acc_obj  = {
                "time": float(row["time"]),
                "acceleration": float(row["acceleration"])
           }
    return jsonify(acc_obj)

@app.route('/insert_acceleration')
def insert_acceleration():
    dum_acc = 50
    dum_time = time.time()
    sql_query = """insert into acceleration
        (acceleration, time)
        values ({}, {});""".format(
            dum_acc, dum_time
        )
    result = connection.execute(sql_query)
    return "completed insert"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0") 
