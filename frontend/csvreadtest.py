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


def runplot(xaxe,yaxe):
    # Create figure
    fig = go.Figure()


    fig.add_trace(
        go.Scatter(x=list(yaxe), y=list(xaxe)))

    # Set title
    fig.update_layout(
        title_text="Test"
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



xaxis = []
yaxis = []
with open('CSVCloseVal-2020.05.05-2013.12.02.csv', 'r') as file:
    reader = csv.reader(file)
    i =0
    for row in reader:
        yaxis.insert(i,row[0])
        xaxis.insert(i,row[1])
        i+=1
    yaxis.remove("Date")
    xaxis.remove("AUDCAD")
    print(yaxis)
    print(xaxis)
    runplot(xaxis, yaxis)