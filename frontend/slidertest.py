import datetime
import csv

import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import plotly.graph_objects as go
#import pyodbc
import pandas as pd

currencies = [
    "AUDCAD",
    "AUDJPY",
    "AUDNZD",
    "AUDUSD",
    "AUDCHF",
    "CADJPY",
    "CADCHF",
    "CHFJPY",
    "EURAUD",
    "EURCAD",
    "EURGBP",
    "EURNZD",
    "EURUSD",
    "EURCHF",
    "EURJPY",
    "GBPAUD",
    "GBPCAD",
    "GBPJPY",
    "GBPNZD",
    "GBPUSD",
    "GBPCHF",
    "NZDCAD",
    "NZDJPY",
    "NZDUSD",
    "USDCAD",
    "USDCHF",
    "USDJPY"  
]
xaxis=[]
yaxis=[]



def runplot(xaxis,yaxis, currency):
    # Create figure
    fig = go.Figure()


    fig.add_trace(
        go.Scatter(x=list(yaxis), y=list(xaxis)))

    # Set title
    fig.update_layout(
        title_text=currency
    )

    # Add range slider
    fig.update_layout(
        xaxis=dict(
            rangeselector=dict(
                buttons=list([
                    dict(count=1,
                        label="1m",
                        step="month",
                        stepmode="backward"),
                    dict(count=6,
                        label="6m",
                        step="month",
                        stepmode="backward"),
                    dict(count=1,
                        label="YTD",
                        step="year",
                        stepmode="todate"),
                    dict(count=1,
                        label="1y",
                        step="year",
                        stepmode="backward"),
                    dict(step="all")
                ])
            ),
            rangeslider=dict(
                visible=True
            ),
            type="date"
        )
    )

    fig.show()

def opencsv(yaxis, xaxis,currency):
    with open('CSVCloseVal-2020.05.05-2013.12.02.csv', 'r') as file:
        reader = csv.reader(file)
        i =0
        for row in reader:
            yaxis.insert(i,row[0])
            xaxis.insert(i,row[currency])
            i+=1
        yaxis.remove(yaxis[0])
        xaxis.remove(xaxis[0])
        print(yaxis)
        print(xaxis)
        runplot(xaxis, yaxis)




while True:
    ################ WARNING ################
    print("\n!!! OJO FREDE!!!")
    print("\n!!!\nYOU WILL BE RUNNING WITH BURNT INPUT DATA \nTHE FOLLOWING INPUT PROMPT IS ONLY FOR TESTING")
    print("YOUR INPUT WILL NOT AFFECT THE OUTPUT\n!!!")
    # TODO Figure out why the fucking connection string wont link to the DB.. Piece of garbage software
    #########################################
    print("Enter a currency pair to run from the following list: \n")
    print("AUDCAD AUDJPY AUDNZD AUDUSD AUDCHF \nCADJPY CADCHF CHFJPY EURAUD EURCAD \nEURGBP EURNZD EURUSD EURCHF EURJPY \nGBPAUD GBPCAD GBPJPY GBPNZD GBPUSD \nGBPCHF NZDCAD NZDJPY NZDUSD USDCAD \nUSDCHF USDJPY")
    inputvar = input("Pair: ")
    
    if inputvar in currencies:
        date_choice = input("Do you wish to select a date range? n for all data.  y/n?  ")
        if date_choice == "y":
            date_flag = True
            print("Enter the start date")
            start_year= int(input("Year: "))
            start_month = int(input("Month: "))
            start_day = int(input("Day: "))

            print("Enter end date")
            end_year = int(input("Year: "))
            end_month = int(input("Month: "))
            end_day = int(input("Day: "))

            start_date = datetime.date(year=start_year, month=start_month , day=start_day)
            end_date = datetime.date(year=end_year, month = end_month, day =end_day)
            
        else:
            date_flag = False
            start_date = 0
            end_date = 0
            
        xaxe,yaxe = select(inputvar, str(start_date), str(end_date), date_flag)
        
        
    else:
        print("Invalid input.")




