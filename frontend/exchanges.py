import datetime

import numpy as np
import pyodbc
import plotly.graph_objects as go
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

def pairswitcher(i):
    print("Pair switcher = "+ i)
    if i ==1:
        currencysw = "AUDCAD"
    elif i==2:
        currencysw = "AUDJPY"
    elif i==3:
        currencysw = "AUDNZD"
    elif i==4:
        currencysw = "AUDUSD"
    elif i==5:
        currencysw = "AUDCHF"
    elif i==6:
        currencysw = "CADJPY"
    elif i==7:
        currencysw = "CADCHF"
    elif i==8:
        currencysw = "CHFJPY"
    elif i==9:
        currencysw = "EURAUD"
    elif i==10:
        currencysw = "EURCAD"
    elif i==11:
        currencysw = "EURGBP"
    elif i==12:
        currencysw = "EURNZD"
    elif i==13:
        currencysw = "EURUSD"
    elif i==14:
        currencysw = "EURCHF"
    elif i==15:
        currencysw = "EURJPY"
    elif i==16:
        currencysw = "GBPAUD"
    elif i==17:
        currencysw = "GBPCAD"
    elif i==18:
        currencysw = "GBPJPY"
    elif i==19:
        currencysw = "GBPNZD"
    elif i==20:
        currencysw = "GBPUSD"
    elif i==21:
        currencysw = "GBPCHF"
    elif i==22:
        currencysw = "NZDCAD"
    elif i==23:
        currencysw = "NZDJPY"
    elif i ==24:
        currencysw = "NZDUSD"
    elif i==25:
        currencysw = "USDCAD"
    elif i==26:
        currencysw = "USDCHF"
    elif i==27:
        currencysw = "USDJPY"
    else:
        return("Not in list")

    return(currencysw)

# Connect to Azure SQL Server
# pw: Python3Appsql@11
try:
    server = 'forexbd.database.windows.net'
    database = 'Forex'
    username = 'epoxyfish'
    password = 'Python3Appsql@11'
    driver= '{ODBC Driver 17 for SQL Server}'
    cnxn = pyodbc.connect(DRIVER=driver,SERVER=server,PORT=1433,DATABASE=database,UID=username,PWD=password)
    cursor = cnxn.cursor()
except Exception as e:
    print("SQL Server error: ")
    print(e)



def runplot(xaxe,yaxe, currency):
    # Create figure
    fig = go.Figure()

    fig.add_trace(
        go.Scatter(x=list(xaxe), y=list(yaxe)))

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

def select(currency, start_date,end_date, date_flag):

    if date_flag == True:
        query = "SELECT Date, "+currency+ " from Exchanges where Date between '"+start_date+"' AND '"+ end_date+"'"
    else:
        query = "SELECT Date, "+currency+ " from Exchanges"
    cursor.execute(query)
    
    xaxe=[]
    yaxe=[]
    for row in cursor:
        ydates = str(row[0])
        xvalues = row[1]
        yaxe.insert(0,str(row[0]))
        xaxe.insert(0,row[1])
        print(str(row[0])," value: ", row[1])
    
    print(xaxe)
    print(yaxe)
    runplot(yaxe, xaxe, currency)

def chose_currency():
    print("Enter a currency pair to run from the following list: \n")
    print("1.AUDCAD 2.AUDJPY 3.AUDNZD 4.AUDUSD 5.AUDCHF \n6.CADJPY 7.CADCHF 8.CHFJPY 9.EURAUD 10EURCAD \n11.EURGBP 12.EURNZD 13.EURUSD 14.EURCHF 15.EURJPY \n16.GBPAUD 17.GBPCAD 18.GBPJPY 19.GBPNZD 20.GBPUSD \n21.GBPCHF 22.NZDCAD 23.NZDJPY 24.NZDUSD 25.USDCAD \n26.USDCHF 27.USDJPY")
    inputvar = input("Pair: ")

    if isinstance(int(inputvar),int) and  1 <= int(inputvar) <= 27:
        currency = currencies[int(inputvar)-1]
        print(currency)
        return(currency)
    
    if inputvar  in currencies or currency in currencies:
        return(inputvar)

def chose_dates():
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
        return(start_date,end_date,date_flag)
    else:
        date_flag = False
        start_date = 0
        end_date = 0
        return(start_date, end_date,date_flag)


while True:
    currency = chose_currency()
    start_date, end_date,date_flag = chose_dates()     
    
    select(currency, str(start_date), str(end_date), date_flag)


    
