from sqlalchemy import create_engine
import time

engine = create_engine( "postgres://localhost/backpack")
connection = engine.connect()

def test_insert_gps():
    dum_lat = 50.123456789
    dum_long = 50.123456789
    dum_time = time.time()
    sql_query = """insert into gps
        (lat, long, time)
        values ({}, {}, {});""".format(
            dum_lat, dum_long, dum_time
        )
    result = connection.execute(sql_query)
    return "completed insert"


def test_insert_acceleration():
    dum_acc = 123
    dum_time = time.time()
    sql_query = """insert into gps
        (acceleration, time)
        values ({}, {});""".format(
            dum_acc, dum_time
        )
    result = connection.execute(sql_query)
    return "completed insert"

def insert_gps(lat,long):
    curr_time = time.time()
    sql_query = """insert into gps
        (lat, long, time)
        values ({}, {}, {});""".format(
            lat, long, curr_time
        )
    result = connection.execute(sql_query)
    return "completed insert lat: {}, long: {}, time: {}".format(lat, long, curr_time)

def insert_acceleration(acc):
    curr_time = time.time()
    sql_query = """insert into acceleration
        (lat, long, time)
        values ({}, {}, {});""".format(
            acc, curr_time
        )
    result = connection.execute(sql_query)
    return "completed insert acceleration: {}, time: {}".format(acc, curr_time)


if __name__ == "__main__":
    # read from the serial output
    # parse accelerometer and gps data
    i = 0
    while True:
        time.sleep(10)
        print(i)
        i += 10
