"use strict";
const express = require('express');
const router = express.Router();
const Rates = require('../models/rates.model');
const mongoose = require('mongoose');


////////////

const puppeteer = require('puppeteer');
const fs = require('fs');

/*
const startScrape = new Date();
console.log("Start: " + startScrape);
*/


// SCRAPE USD HISTORICAL
async function scrapeUSD(base, date) {
    const url = getURL(base, date);
    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [time] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txttime = await time.getProperty('textContent');
    const timeUSD = await txttime.jsonValue();

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[1]');
    const txt = await el.getProperty('textContent');
    const currency1 = await txt.jsonValue();
    if (currency1 != "Euro") {
        console.log("Error with USD/EUR");
    }
    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
    const txt1 = await el1.getProperty('textContent');
    const USDEUR = await txt1.jsonValue();


    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency2 = await txt3.jsonValue();
    if (currency2 != "Australian Dollar") {
        console.log("Error with USD/AUD");
    }
    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const USDAUD = await txt2.jsonValue();


    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[1]');
    const txt5 = await el5.getProperty('textContent');
    const currency3 = await txt5.jsonValue();
    if (currency3 != "Canadian Dollar") {
        console.log("Error with USD/CAD");
    }
    const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
    const txt4 = await el4.getProperty('textContent');
    const USDCAD = await txt4.jsonValue();


    const [el6] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[1]');
    const txt6 = await el6.getProperty('textContent');
    const currency4 = await txt6.jsonValue();
    if (currency4 != "Japanese Yen") {
        console.log("Error with USD/JPY");
    }
    const [el7] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
    const txt7 = await el7.getProperty('textContent');
    const USDJPY = await txt7.jsonValue();


    const [el8] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[1]');
    const txt8 = await el8.getProperty('textContent');
    const currency5 = await txt8.jsonValue();
    if (currency5 != "Swiss Franc") {
        console.log("Error with USD/CHF");
    }
    const [el9] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[2]/a');
    const txt9 = await el9.getProperty('textContent');
    const USDCHF = await txt9.jsonValue();


    let USDobj = {
        Date: date,
        Last: timeUSD,
        Base: base,
        Currency: {
            EUR: USDEUR,
            AUD: USDAUD,
            CAD: USDCAD,
            JPY: USDJPY,
            CHF: USDCHF
        }
    };
    //console.log(USDobj);
    browser.close();
    return USDobj;

}
// SCRAPE EUR HISTORICAL
async function scrapeEUR(base, date) {
    const url = getURL(base, date);
    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeEUR = await txt.jsonValue();

    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Australian Dollar") {
        console.log("Error with EUR/AUD");
    }

    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const EURAUD = await txt2.jsonValue();

    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency2 = await txt3.jsonValue();
    if (currency2 != "Canadian Dollar") {
        console.log("Error with EUR/CAD");
    }

    const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
    const txt4 = await el4.getProperty('textContent');
    const EURCAD = await txt4.jsonValue();

    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[1]');
    const txt5 = await el5.getProperty('textContent');
    const currency3 = await txt5.jsonValue();
    if (currency3 != "New Zealand Dollar") {
        console.log("Error with EUR/NZD");
    }

    const [el6] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[2]/a');
    const txt6 = await el6.getProperty('textContent');
    const EURNZD = await txt6.jsonValue();

    const [el7] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[2]/td[1]');
    const txt7 = await el7.getProperty('textContent');
    const currency4 = await txt7.jsonValue();
    if (currency4 != "British Pound") {
        console.log("Error with EUR/GBP");
    }

    const [el8] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[2]/td[2]/a');
    const txt8 = await el8.getProperty('textContent');
    const EURGBP = await txt8.jsonValue();


    const [el9] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[1]');
    const txt9 = await el9.getProperty('textContent');
    const currency5 = await txt9.jsonValue();
    if (currency5 != "US Dollar") {
        console.log("Error with EUR/USD");
    }
    const [el10] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
    const txt10 = await el10.getProperty('textContent');
    const EURUSD = await txt10.jsonValue();

    let EURobj = {
        Date: date,
        Last: timeEUR,
        Base: base,
        Currency: {
            AUD: EURAUD,
            CAD: EURCAD,
            NZD: EURNZD,
            GBP: EURGBP,
            USD: EURUSD
        }
    };
    //console.log(EURobj);
    browser.close();
    return EURobj;

}

// SCRAPE HISTORICAL AUD
async function scrapeAUD(base, date) {
    const url = getURL(base, date);
    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeAUD = await txt.jsonValue();

    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Canadian Dollar") {
        console.log("Error with AUD/CAD");
    }
    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const AUDCAD = await txt2.jsonValue();

    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency3 = await txt3.jsonValue();
    if (currency3 != "Japanese Yen") {
        console.log("Error with AUD/JPY");
    }
    const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
    const txt4 = await el4.getProperty('textContent');
    const AUDJPY = await txt4.jsonValue();

    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[1]');
    const txt5 = await el5.getProperty('textContent');
    const currency4 = await txt5.jsonValue();
    if (currency4 != "New Zealand Dollar") {
        console.log("Error with AUD/NZD");
    }
    const [el6] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[2]/a');
    const txt6 = await el6.getProperty('textContent');
    const AUDNZD = await txt6.jsonValue();

    const [el7] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[1]');
    const txt7 = await el7.getProperty('textContent');
    const currency5 = await txt7.jsonValue();
    if (currency5 != "US Dollar") {
        console.log("Error with AUD/USD");
    }
    const [el8] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
    const txt8 = await el8.getProperty('textContent');
    const AUDUSD = await txt8.jsonValue();


    let AUDobj = {
        Date: date,
        Last: timeAUD,
        Base: base,
        Currency: {
            CAD: AUDCAD,
            JPY: AUDJPY,
            NZD: AUDNZD,
            USD: AUDUSD
        }
    };
    //console.log(AUDobj);
    browser.close();
    return AUDobj;
}

// SCRAPE HISTORICAL CAD
async function scrapeCAD(base, date) {
    const url = getURL(base, date);
    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeCAD = await txt.jsonValue();

    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Japanese Yen") {
        console.log("Error with CAD/JPY");
    }
    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const CADJPY = await txt2.jsonValue();

    let CADobj = {
        Date: date,
        Last: timeCAD,
        Base: base,
        Currency: {
            JPY: CADJPY
        }
    };
    //console.log(CADobj);
    browser.close();
    return CADobj;

}
// SCRAPE NZD HISTORICAL
async function scrapeNZD(base, date) {
    const url = getURL(base, date);
    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeNZD = await txt.jsonValue();

    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[6]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Canadian Dollar") {
        console.log("Error with NZD/CAD");
    }
    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[6]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const NZDCAD = await txt2.jsonValue();

    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[10]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency2 = await txt3.jsonValue();
    if (currency2 != "Japanese Yen") {
        console.log("Error with NZD/CAD");
    }
    const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[10]/td[2]/a');
    const txt4 = await el4.getProperty('textContent');
    const NZDJPY = await txt4.jsonValue();

    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[1]');
    const txt5 = await el5.getProperty('textContent');
    const currency3 = await txt5.jsonValue();
    if (currency3 != "US Dollar") {
        console.log("Error with NZD/USD");
    }
    const [el6] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
    const txt6 = await el6.getProperty('textContent');
    const NZDUSD = await txt6.jsonValue();

    let NZDobj = {
        Date: date,
        Last: timeNZD,
        Base: base,
        Currency: {
            CAD: NZDCAD,
            JPY: NZDJPY,
            USD: NZDUSD
        }
    };
    //console.log(NZDobj);
    browser.close();
    return NZDobj;
}
// SCRAPE GBP HISTORICAL
async function scrapeGBP(base, date) {
    const url = getURL(base, date);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeGBP = await txt.jsonValue();


    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Australian Dollar") {
        console.log("Error with GBP/JPY");
    }
    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const GBPAUD = await txt2.jsonValue();


    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency2 = await txt3.jsonValue();
    if (currency2 != "Canadian Dollar") {
        console.log("Error with GBP/CAD");
    }
    const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
    const txt4 = await el4.getProperty('textContent');
    const GBPCAD = await txt4.jsonValue();


    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[1]');
    const txt5 = await el5.getProperty('textContent');
    const currency3 = await txt5.jsonValue();
    if (currency3 != "Japanese Yen") {
        console.log("Error with GBP/CAD");
    }
    const [el6] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
    const txt6 = await el6.getProperty('textContent');
    const GBPJPY = await txt6.jsonValue();


    const [el7] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[1]');
    const txt7 = await el7.getProperty('textContent');
    const currency4 = await txt7.jsonValue();
    if (currency4 != "New Zealand Dollar") {
        console.log("Error with GBP/NZD");
    }
    const [el8] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[2]/a');
    const txt8 = await el8.getProperty('textContent');
    const GBPNZD = await txt8.jsonValue();

    const [el9] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[1]');
    const txt9 = await el9.getProperty('textContent');
    const currency5 = await txt9.jsonValue();
    if (currency5 != "US Dollar") {
        console.log("Error with GBP/USD");
    }
    const [el10] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
    const txt10 = await el10.getProperty('textContent');
    const GBPUSD = await txt10.jsonValue();


    let GBPobj = {
        Date: date,
        Last: timeGBP,
        Base: base,
        Currency: {
            AUD: GBPAUD,
            CAD: GBPCAD,
            JPY: GBPJPY,
            NZD: GBPNZD,
            USD: GBPUSD
        }
    };
    //console.log(GBPobj);
    browser.close();
    return GBPobj;

}

let getFormatedTime = (msec) => {

    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    let messuredtime = hh + ":" + mm + ":" + ss;

    return messuredtime;
}
let convertDates = (day, month, year) => {
    let date = [];
    date[0] = day;
    date[1] = month;

    if (date[1] == 1 || date[1] == 2 || date[1] == 3 || date[1] == 4 || date[1] == 5 || date[1] == 6 || date[1] == 7 || date[1] == 8 || date[1] == 9) {
        month = "0" + month;
        if (date[0] == 1 || date[0] == 2 || date[0] == 3 || date[0] == 4 || date[0] == 5 || date[0] == 6 || date[0] == 7 || date[0] == 8 || date[0] == 9) {
            day = "0" + day;
        }
    } else {
        if (date[0] == 1 || date[0] == 2 || date[0] == 3 || date[0] == 4 || date[0] == 5 || date[0] == 6 || date[0] == 7 || date[0] == 8 || date[0] == 9) {
            day = "0" + day;

        }
    }
    date[0] = day;
    date[1] = month;
    date = year + "-" + month + "-" + day;
    console.log(date);

    return date;
}
let getURL = (base, date) => {
    const url = "https://www.x-rates.com/historical/?from=" + base + "&amount=1&date=" + date;
    return url;
}

let calcPriceDif = (currencypairs, date) => {
    // Try to calculate the price difference from previous day and add to the JSON. This should be in a new sub object { }
    currencypairs = {
        Date: date,
        AUDCAD: {
            AUDCADOrg: AUD["Currency"]["CAD"], // Original
            AUDCADDif: AUD["Currency"]["CAD"] - AUD["Currency"]["CAD"] // price dif
        },
        AUDJPY: {
            AUDJPYOrg: AUD["Currency"]["JPY"],
            AUDJPYDif: AUD["Currency"]["JPY"] - AUD["Currency"]["JPY"]
        },
        AUDNZD: {
            AUDNZDOrg: AUD["Currency"]["NZD"],
            AUDNZDDif: AUD["Currency"]["NZD"] - AUD["Currency"]["NZD"]
        },
        AUDUSD: {
            AUDUSDOrg: AUD["Currency"]["USD"],
            AUDUSDDif: AUD["Currency"]["USD"] - AUD["Currency"]["USD"]
        },
        CADJPY: {
            CADJPYOrg: CAD["Currency"]["JPY"],
            CADJPYDif: CAD["Currency"]["JPY"] - CAD["Currency"]["JPY"]
        },
        EURAUD: {
            EURAUDOrg: EUR["Currency"]["AUD"],
            EURAUDDif: EUR["Currency"]["AUD"] - EUR["Currency"]["AUD"]
        },
        EURCAD: {
            EURCADOrg: EUR["Currency"]["CAD"],
            EURCADDif: EUR["Currency"]["CAD"] - EUR["Currency"]["CAD"]
        },
        EURGBP: {
            EURGBPOrg: EUR["Currency"]["GBP"],
            EURGBPDif: EUR["Currency"]["GBP"] - EUR["Currency"]["GBP"]
        },
        EURNZD: EUR["Currency"]["NZD"] - EUR["Currency"]["NZD"],
        EURUSD: EUR["Currency"]["USD"] - EUR["Currency"]["USD"],
        GBPAUD: GBP["Currency"]["AUD"] - GBP["Currency"]["AUD"],
        GBPCAD: GBP["Currency"]["CAD"] - GBP["Currency"]["CAD"],
        GBPJPY: GBP["Currency"]["JPY"] - GBP["Currency"]["JPY"],
        GBPNZD: GBP["Currency"]["NZD"] - GBP["Currency"]["NZD"],
        GBPUSD: GBP["Currency"]["USD"] - GBP["Currency"]["USD"],
        NZDCAD: NZD["Currency"]["CAD"] - NZD["Currency"]["CAD"],
        NZDJPY: NZD["Currency"]["JPY"] - NZD["Currency"]["JPY"],
        NZDUSD: NZD["Currency"]["USD"] - NZD["Currency"]["USD"],
        USDCAD: USD["Currency"]["CAD"] - USD["Currency"]["CAD"],
        USDCHF: USD["Currency"]["CHF"] - USD["Currency"]["CHF"],
        USDJPY: USD["Currency"]["JPY"] - USD["Currency"]["JPY"]
    }
    console.log("Price change: " + currencypairs);
}

function WriteToFile(currencypairs) {

    for (var i = 0; i < 1; i++) {
        fs.appendFileSync("currencypairs.txt", JSON.stringify(currencypairs) + "\n");
        console.log("Data saved to file currencypairs.json.");
    }


}

let registerRate = async(date, AUDCAD, AUDJPY, AUDNZD, AUDUSD, CADJPY, EURAUD, EURCAD, EURGBP, EURNZD, EURUSD, GBPAUD, GBPCAD, GBPJPY, GBPNZD, GBPUSD, NZDCAD, NZDJPY, NZDUSD, USDCAD, USDCHF, USDJPY) => {
    await axios({
            method: "post",
            url: "http://localhost:3000/api/register-rate",
            responseType: "json",
            data: {
                Date: date,
                AUDCAD: AUDCAD,
                AUDJPY: AUDJPY,
                AUDNZD: AUDNZD,
                AUDUSD: AUDUSD,
                CADJPY: CADJPY,
                EURAUD: EURAUD,
                EURCAD: EURCAD,
                EURGBP: EURGBP,
                EURNZD: EURNZD,
                EURUSD: EURUSD,
                GBPAUD: GBPAUD,
                GBPCAD: GBPCAD,
                GBPJPY: GBPJPY,
                GBPNZD: GBPNZD,
                GBPUSD: GBPUSD,
                NZDCAD: NZDCAD,
                NZDJPY: NZDJPY,
                NZDUSD: NZDUSD,
                USDCAD: USDCAD,
                USDCHF: USDCHF,
                USDJPY: USDJPY
            }

        })
        .then(function(res) {
            console.log(res.data);
        })
        .catch(function(error) {
            console.log(error);
        })
}


/////////

router.post('/register-rate', function(req, res) {
    let body = req.body;

    let newRate = new Rates({
        Date: body.Date,
        AUDCAD: body.AUDCAD,
        AUDJPY: body.AUDJPY,
        AUDNZD: body.AUDNZD,
        AUDUSD: body.AUDUSD,
        CADJPY: body.CADJPY,
        EURAUD: body.EURAUD,
        EURCAD: body.EURCAD,
        EURGBP: body.EURGBP,
        EURNZD: body.EURNZD,
        EURUSD: body.EURUSD,
        GBPAUD: body.GBPAUD,
        GBPCAD: body.GBPCAD,
        GBPJPY: body.GBPJPY,
        GBPNZD: body.GBPNZD,
        GBPUSD: body.GBPUSD,
        NZDCAD: body.NZDCAD,
        NZDJPY: body.NZDJPY,
        NZDUSD: body.NZDUSD,
        USDCAD: body.USDCAD,
        USDCHF: body.USDCHF,
        USDJPY: body.USDJPY
    });
    newRate.save(function(err, ratesDB) {
        if (err) {
            res.json({
                resultado: false,
                msg: 'Error sending the pairs to MongoDB',
                err
            });
        } else {
            res.json({
                resultado: true,
                ratesDB
            });
        }
    });
});

module.exports = router;