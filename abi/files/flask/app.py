#dependencies
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
gh = pd.read_csv('DataSets/merged.csv')


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
    data = {}
    for i in results:
        data[i['County']] = { "Graduation Rate": i['Graduation Rate'], "Income": i['Income'].replace("$","").replace(",","")}
    
    return jsonify( data )
    
@app.route("/income/<county>")
def state(county):
    conn = engine. connect()
    query = "SELECT County, Income FROM income Where County = '{}'".format(county)
    results = conn.execute( query ).fetchone()
    data = {}
    names = results.keys()

    for i,j in zip( names, results ):
        data[i] = j 

    return jsonify( data )
   

if __name__ == "__main__":
	app.run(debug=True)




    
