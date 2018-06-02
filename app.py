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
gh = pd.read_csv('DataSets/merged.csv')


# save to database
gh.to_sql('income', engine, if_exists='replace') 

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/table")
def table():
    return render_template("Table.html")

@app.route("/income")
def income():
    return render_template("income_scatter.html")

@app.route("/sat_income")
def sat_income():
    return render_template("sat_income.html")

@app.route("/sat_gr")
def sat_gr():
   return render_template('mattsindex.html')


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
             "Graduation": i['Graduation'],
             "Income": str(i['Income']).replace("$","").replace(",",""),
             "SAT": i['SAT']
             })
    # print( data )
    return jsonify( data )


if __name__ == "__main__": 
    app.run(debug=True)


    
