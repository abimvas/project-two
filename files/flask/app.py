# dependencies
from flask import (Flask, render_template, jsonify, url_for )
import pandas as pd 
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import Column, Integer, String, Numeric, Text, Float, Date
import os
import json


# initialize database
db_uri = os.getenv("DATABASE_URI", "sqlite:///project2.sqlite") 
engine = create_engine( db_uri )

# read data from project 2 and save to sqlite
gh = pd.read_csv('DataSets/graduation_by_income.csv')
#income = pd.read_csv(" ")
#community = pd.read_csv("DataSets/zip_codes_states.csv")
#sat_act_district = pd.read_csv("DataSets/sat_act_district_data_class_2015.csv")
#sat_act_campus = pd.read_csv("DataSets/sat_act_campus_data_class_2015.csv")


#Cleanup
#removed percentage signs, removed † and replace with NaN, format cells as float
# gh['Low-Income 2015\nACGR(%)'] = gh['Low-Income 2015\nACGR(%)'].str.replace('%','').astype(float)
# gh['Estimated \nNon-Low-Income 2015 ACGR(%)'] = gh['Estimated \nNon-Low-Income 2015 ACGR(%)'].str.replace('%','').astype(float)
# gh['Gap Change between Non-Low-Income\n and Low-Income ACGR\n(Percentage points), 2011-15'] = gh['Gap Change between Non-Low-Income\n and Low-Income ACGR\n(Percentage points), 2011-15'].str.replace('†','NaN').astype(float)
# gh['Overall 2015 \nACGR(%)'] = gh['Overall 2015 \nACGR(%)'].str.replace('%','').astype(float)



# drop the last column showing NaN since its not a state
#gh = gh.drop(gh.index[len(gh)-1])

# rename column headers so they have no spaces
#gh.columns = [ 'abb', 'state', 'gap_between_low_and_nonlow_income_2011', 'overall_2015', 'percent_lowincome_2015', \
#'estimated_non_low_2015', 'low_income_2015','gap_between_nonlow_lowincome_2015', 'gap_change_2011-15']


# save to database
gh.to_sql('income', engine, if_exists='replace') 

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data")
def data():
    # query data from the database return it as json
    conn = engine.connect() 
    query = 'select * from income'
    results = conn.execute( query ).fetchall() 
    data = []
    for i in results:
        data.append({
             "County": i['County'],
             "Graduation Rate": i['Graduation Rate'],
             "Income": i['Income']
             })

    
    print( data )

    # data = {}
    # for i,j in zip( name, income  ):
    #     data[i] = j

    return jsonify( data )

# @app.route("/state/<state>")
# def state(state):

#     conn = engine.connect() 
#     query = "SELECT * FROM graduation WHERE state = '{}'".format(state)
#     results = conn.execute( query ).fetchone()
    
#     data = {} 
#     names = results.keys() 

#     for i,j in zip( names, results ):
#         data[i] = j

#     return jsonify( data )

if __name__ == "__main__": 
    app.run(debug=True)


    
