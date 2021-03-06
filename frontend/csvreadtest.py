import csv
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
    i=i-1
    print("Pair switcher = "+ str(i))
    print(currencies[i])
    return(currencies[i])


def runplot(xaxe,yaxe, currency):
    # Create figure
    fig = go.Figure()


    fig.add_trace(
        go.Scatter(x=list(yaxe), y=list(xaxe)))

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


def chose_currency():
    print("Enter the number corresponding to a currency pair to run from the following list: \n")
    print("1.AUDCAD 2.AUDJPY 3.AUDNZD 4.AUDUSD 5.AUDCHF \n6.CADJPY 7.CADCHF 8.CHFJPY 9.EURAUD 10.EURCAD \n11.EURGBP 12.EURNZD 13.EURUSD 14.EURCHF 15.EURJPY \n16.GBPAUD 17.GBPCAD 18.GBPJPY 19.GBPNZD 20.GBPUSD \n21.GBPCHF 22.NZDCAD 23.NZDJPY 24.NZDUSD 25.USDCAD \n26.USDCHF 27.USDJPY")
    inputvar = int(input("Pair: "))
    if 1<=inputvar <= 27:
        read_csv(inputvar)
    else:
        print("Invalid input. Must be between 1 and 27")
        chose_currency()


def read_csv(currency):
    xaxis = []
    yaxis = []
    with open('CSVCloseVal-2020.05.05-2013.12.02.csv', 'r') as file:
        reader = csv.reader(file)
        i =0
        for row in reader:
            yaxis.insert(i,row[0])
            xaxis.insert(i,row[currency])
            i+=1
        
        yaxis.remove("Date")
        xaxis.remove(xaxis[0])
        runplot(xaxis, yaxis, currencies[currency-1])

chose_currency()