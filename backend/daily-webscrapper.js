"use strict"

const puppeteer = require('puppeteer');
const fs = require('fs');


const startScrape = new Date(2013, 11, 6);
console.log("Start: " + startScrape);

// SCRAPE USD HISTORICAL
async function scrapeUSD(base, date) {
    let USDEUR = 0;
    let USDAUD = 0;
    let USDCAD = 0;
    let USDJPY = 0;
    let USDCHF = 0;

    const url = getURL(base, date);
    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const [time] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txttime = await time.getProperty('textContent');
    const timeUSD = await txttime.jsonValue();

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[1]');
    const txt = await el.getProperty('textContent');
    const currency1 = await txt.jsonValue();
    if (currency1 != "Euro") {
        console.log("Error with USD/EUR");
        USDEUR = "UNDEFINED";
    } else {
        const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
        const txt1 = await el1.getProperty('textContent');
        USDEUR = await txt1.jsonValue();
    }



    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency2 = await txt3.jsonValue();
    if (currency2 != "Australian Dollar") {
        console.log("Error with USD/AUD");
        USDAUD = "UNDEFINED";
    } else {
        const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[2]/a');
        const txt2 = await el2.getProperty('textContent');
        USDAUD = await txt2.jsonValue();
    }



    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[1]');
    const txt5 = await el5.getProperty('textContent');
    const currency3 = await txt5.jsonValue();
    if (currency3 != "Canadian Dollar") {
        console.log("Error with USD/CAD");
        USDCAD = "UNDEFINED";
    } else {
        const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
        const txt4 = await el4.getProperty('textContent');
        USDCAD = await txt4.jsonValue();
    }



    const [el6] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[1]');
    const txt6 = await el6.getProperty('textContent');
    const currency4 = await txt6.jsonValue();
    if (currency4 != "Japanese Yen") {
        console.log("Error with USD/JPY");
        USDJPY = "UNDEFINED";
    } else {
        const [el7] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
        const txt7 = await el7.getProperty('textContent');
        USDJPY = await txt7.jsonValue();
    }



    const [el8] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[1]');
    const txt8 = await el8.getProperty('textContent');
    const currency5 = await txt8.jsonValue();
    if (currency5 != "Swiss Franc") {
        console.log("Error with USD/CHF");
        USDCHF = "UNDEFINED";
    } else {
        const [el9] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[2]/a');
        const txt9 = await el9.getProperty('textContent');
        USDCHF = await txt9.jsonValue();
    }



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

    let EURAUD = 0;
    let EURCAD = 0;
    let EURNZD = 0;
    let EURGBP = 0;
    let EURUSD = 0;

    // NEW CURRECIES
    let EURCHF = 0;
    let EURJPY = 0;

    const url = getURL(base, date);
    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeEUR = await txt.jsonValue();

    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Australian Dollar") {
        console.log("Error with EUR/AUD");
        EURAUD = "UNDEFINED";
    } else {
        const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[2]/a');
        const txt2 = await el2.getProperty('textContent');
        EURAUD = await txt2.jsonValue();
    }



    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency2 = await txt3.jsonValue();
    if (currency2 != "Canadian Dollar") {
        console.log("Error with EUR/CAD");
        EURCAD = "UNDEFINED";
    } else {
        const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
        const txt4 = await el4.getProperty('textContent');
        EURCAD = await txt4.jsonValue();
    }



    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[1]');
    const txt5 = await el5.getProperty('textContent');
    const currency3 = await txt5.jsonValue();
    if (currency3 != "New Zealand Dollar") {
        console.log("Error with EUR/NZD");
        EURNZD = "UNDEFINED";
    } else {
        const [el6] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[2]/a');
        const txt6 = await el6.getProperty('textContent');
        EURNZD = await txt6.jsonValue();
    }



    const [el7] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[2]/td[1]');
    const txt7 = await el7.getProperty('textContent');
    const currency4 = await txt7.jsonValue();
    if (currency4 != "British Pound") {
        console.log("Error with EUR/GBP");
        EURGBP = "UNDEFINED";
    } else {
        const [el8] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[2]/td[2]/a');
        const txt8 = await el8.getProperty('textContent');
        EURGBP = await txt8.jsonValue();
    }




    const [el9] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[1]');
    const txt9 = await el9.getProperty('textContent');
    const currency5 = await txt9.jsonValue();
    if (currency5 != "US Dollar") {
        console.log("Error with EUR/USD");
        EURUSD = "UNDEFINED";
    } else {
        const [el10] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
        const txt10 = await el10.getProperty('textContent');
        EURUSD = await txt10.jsonValue();
    }

    // NEW CURRENCIES
    const [el11] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[47]/td[1]');
    const txt11 = await el11.getProperty('textContent');
    const currency6 = await txt11.jsonValue();
    if (currency6 != "Swiss Franc") {
        console.log("Error with EUR/CHF");
        EURCHF = "UNDEFINED";
    } else {
        const [el12] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[47]/td[2]/a');
        const txt12 = await el12.getProperty('textContent');
        EURCHF = await txt12.jsonValue();
    }

    const [el13] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[1]');
    const txt13 = await el13.getProperty('textContent');
    const currency7 = await txt13.jsonValue();
    if (currency7 != "Japanese Yen") {
        console.log("Error with EUR/JPY");
        EURJPY = "UNDEFINED";
    } else {
        const [el14] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
        const txt14 = await el14.getProperty('textContent');
        EURJPY = await txt14.jsonValue();
    }


    let EURobj = {
        Date: date,
        Last: timeEUR,
        Base: base,
        Currency: {
            AUD: EURAUD,
            CAD: EURCAD,
            NZD: EURNZD,
            GBP: EURGBP,
            USD: EURUSD,
            CHF: EURCHF,
            JPY: EURJPY
        }
    };
    //console.log(EURobj);
    browser.close();
    return EURobj;

}

// SCRAPE HISTORICAL AUD
async function scrapeAUD(base, date) {

    let AUDCAD = 0;
    let AUDJPY = 0;
    let AUDNZD = 0;
    let AUDUSD = 0;
    // NEW CURRENCY
    let AUDCHF = 0;

    const url = getURL(base, date);
    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeAUD = await txt.jsonValue();

    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Canadian Dollar") {
        console.log("Error with AUD/CAD");
        AUDCAD = "UNDEFINED";
    } else {
        const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
        const txt2 = await el2.getProperty('textContent');
        AUDCAD = await txt2.jsonValue();
    }


    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency3 = await txt3.jsonValue();
    if (currency3 != "Japanese Yen") {
        console.log("Error with AUD/JPY");
        AUDJPY = "UNDEFINED";
    } else {
        const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
        const txt4 = await el4.getProperty('textContent');
        AUDJPY = await txt4.jsonValue();
    }


    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[1]');
    const txt5 = await el5.getProperty('textContent');
    const currency4 = await txt5.jsonValue();
    if (currency4 != "New Zealand Dollar") {
        console.log("Error with AUD/NZD");
        AUDNZD = "UNDEFINED";
    } else {
        const [el6] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[2]/a');
        const txt6 = await el6.getProperty('textContent');
        AUDNZD = await txt6.jsonValue();
    }


    const [el7] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[1]');
    const txt7 = await el7.getProperty('textContent');
    const currency5 = await txt7.jsonValue();
    if (currency5 != "US Dollar") {
        console.log("Error with AUD/USD");
        AUDUSD = "UNDEFINED";
    } else {
        const [el8] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
        const txt8 = await el8.getProperty('textContent');
        AUDUSD = await txt8.jsonValue();
    }

    // NEW CURRENCY
    const [el9] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[1]');
    const txt9 = await el9.getProperty('textContent');
    const currency6 = await txt9.jsonValue();
    if (currency6 != "Swiss Franc") {
        console.log("Error with AUD/CHF");
        AUDCHF = "UNDEFINED";
    } else {
        const [el10] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[2]/a');
        const txt10 = await el10.getProperty('textContent');
        AUDCHF = await txt10.jsonValue();
    }



    let AUDobj = {
        Date: date,
        Last: timeAUD,
        Base: base,
        Currency: {
            CAD: AUDCAD,
            JPY: AUDJPY,
            NZD: AUDNZD,
            USD: AUDUSD,
            CHF: AUDCHF
        }
    };
    //console.log(AUDobj);
    browser.close();
    return AUDobj;
}

// SCRAPE HISTORICAL CAD
async function scrapeCAD(base, date) {

    let CADJPY = 0;
    //NEW CURRENCY
    let CADCHF = 0;

    const url = getURL(base, date);
    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeCAD = await txt.jsonValue();

    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Japanese Yen") {
        console.log("Error with CAD/JPY");
        CADJPY = "UNDEFINED";
    } else {
        const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
        const txt2 = await el2.getProperty('textContent');
        CADJPY = await txt2.jsonValue();
    }

    // NEW CURRENCY
    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency2 = await txt3.jsonValue();
    if (currency2 != "Swiss Franc") {
        console.log("Error with CAD/CHF");
        CADCHF = "UNDEFINED";
    } else {
        const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[2]/a');
        const txt4 = await el4.getProperty('textContent');
        CADCHF = await txt4.jsonValue();
    }


    let CADobj = {
        Date: date,
        Last: timeCAD,
        Base: base,
        Currency: {
            JPY: CADJPY,
            CHF: CADCHF
        }
    };
    //console.log(CADobj);
    browser.close();
    return CADobj;

}
// SCRAPE NZD HISTORICAL
async function scrapeNZD(base, date) {

    let NZDCAD = 0;
    let NZDJPY = 0;
    let NZDUSD = 0;

    const url = getURL(base, date);
    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeNZD = await txt.jsonValue();

    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[6]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Canadian Dollar") {
        console.log("Error with NZD/CAD");
        NZDCAD = "UNDEFINED";
    } else {
        const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[6]/td[2]/a');
        const txt2 = await el2.getProperty('textContent');
        NZDCAD = await txt2.jsonValue();
    }


    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[10]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency2 = await txt3.jsonValue();
    if (currency2 != "Japanese Yen") {
        console.log("Error with NZD/JPY");
        NZDJPY = "UNDEFINED";
    } else {
        const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[10]/td[2]/a');
        const txt4 = await el4.getProperty('textContent');
        NZDJPY = await txt4.jsonValue();
    }


    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[1]');
    const txt5 = await el5.getProperty('textContent');
    const currency3 = await txt5.jsonValue();
    if (currency3 != "US Dollar") {
        console.log("Error with NZD/USD");
        NZDUSD = "UNDEFINED";
    } else {
        const [el6] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
        const txt6 = await el6.getProperty('textContent');
        NZDUSD = await txt6.jsonValue();
    }


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

    let GBPAUD = 0;
    let GBPCAD = 0;
    let GBPJPY = 0;
    let GBPNZD = 0;
    let GBPUSD = 0;
    //NEW CURRENCY
    let GBPCHF = 0;

    const url = getURL(base, date);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeGBP = await txt.jsonValue();


    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Australian Dollar") {
        console.log("Error with GBP/JPY");
        GBPJPY = "UNDEFINED";
    } else {
        const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[2]/a');
        const txt2 = await el2.getProperty('textContent');
        GBPAUD = await txt2.jsonValue();
    }



    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[1]');
    const txt3 = await el3.getProperty('textContent');
    const currency2 = await txt3.jsonValue();
    if (currency2 != "Canadian Dollar") {
        console.log("Error with GBP/CAD");
        GBPCAD = "UNDEFINED";
    } else {
        const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
        const txt4 = await el4.getProperty('textContent');
        GBPCAD = await txt4.jsonValue();
    }



    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[1]');
    const txt5 = await el5.getProperty('textContent');
    const currency3 = await txt5.jsonValue();
    if (currency3 != "Japanese Yen") {
        console.log("Error with GBP/CAD");
        GBPCAD = "UNDEFINED";
    } else {
        const [el6] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
        const txt6 = await el6.getProperty('textContent');
        GBPJPY = await txt6.jsonValue();
    }



    const [el7] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[1]');
    const txt7 = await el7.getProperty('textContent');
    const currency4 = await txt7.jsonValue();
    if (currency4 != "New Zealand Dollar") {
        console.log("Error with GBP/NZD");
        GBPNZD = "UNDEFINED";
    } else {
        const [el8] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[2]/a');
        const txt8 = await el8.getProperty('textContent');
        GBPNZD = await txt8.jsonValue();
    }


    const [el9] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[1]');
    const txt9 = await el9.getProperty('textContent');
    const currency5 = await txt9.jsonValue();
    if (currency5 != "US Dollar") {
        console.log("Error with GBP/USD");
        GBPUSD = "UNDEFINED";
    } else {
        const [el10] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
        const txt10 = await el10.getProperty('textContent');
        GBPUSD = await txt10.jsonValue();
    }


    // NEW CURRENCY
    const [el11] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[1]');
    const txt11 = await el11.getProperty('textContent');
    const currency6 = await txt11.jsonValue();
    if (currency6 != "Swiss Franc") {
        console.log("Error with GBP/CHF");
        GBPCHF = "UNDEFINED";
    } else {
        const [el12] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[2]/a');
        const txt12 = await el12.getProperty('textContent');
        GBPCHF = await txt12.jsonValue();
    }



    let GBPobj = {
        Date: date,
        Last: timeGBP,
        Base: base,
        Currency: {
            AUD: GBPAUD,
            CAD: GBPCAD,
            JPY: GBPJPY,
            NZD: GBPNZD,
            USD: GBPUSD,
            CHF: GBPCHF
        }
    };
    //console.log(GBPobj);
    browser.close();
    return GBPobj;

}

async function scrapeCHF(base, date) {

    let CHFJPY = 0;


    const url = getURL(base, date);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeCHF = await txt.jsonValue();


    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[1]');
    const txt1 = await el1.getProperty('textContent');
    const currency1 = await txt1.jsonValue();
    if (currency1 != "Japanese Yen") {
        console.log("Error with CHF/JPY");
        CHFJPY = "UNDEFINED";
    } else {
        const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
        const txt2 = await el2.getProperty('textContent');
        CHFJPY = await txt2.jsonValue();
    }

    let CHFobj = {
        Date: date,
        Last: timeCHF,
        Base: base,
        Currency: {
            JPY: CHFJPY,

        }
    };
    //console.log(GBPobj);
    browser.close();
    return CHFobj;

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

function WriteToFile(currencypairs, j) {

    for (var i = 0; i < 1; i++) {
        fs.appendFileSync("currencypairs" + j + ".txt", JSON.stringify(currencypairs) + "\n");
        console.log("Data saved to file currencypairs" + j + ".txt.");
    }


}

async function iScrapper() {

    let totaltime = 0;
    let averagetime = 0;
    let basecurrencies = ["USD", "EUR", "AUD", "CAD", "GBP", "NZD", "CHF"];

    for (let i = 1; i > 0; i++) {
        startScrape.setDate(startScrape.getDate() - 1);
        let day = startScrape.getDate();
        let month = startScrape.getMonth() + 1;
        let year = startScrape.getFullYear();
        let date = convertDates(day, month, year);

        day = date[0];
        month = date[1];

        let startRun = new Date().getTime();

        let USD = await scrapeUSD(basecurrencies[0], date);
        let EUR = await scrapeEUR(basecurrencies[1], date);
        let AUD = await scrapeAUD(basecurrencies[2], date);
        let CAD = await scrapeCAD(basecurrencies[3], date);
        let GBP = await scrapeGBP(basecurrencies[4], date);
        let NZD = await scrapeNZD(basecurrencies[5], date);
        let CHF = await scrapeCHF(basecurrencies[6], date);

        //date = toString(date);

        let currencypairs = {
            Date: date,
            AUDCAD: AUD["Currency"]["CAD"],
            AUDJPY: AUD["Currency"]["JPY"],
            AUDNZD: AUD["Currency"]["NZD"],
            AUDUSD: AUD["Currency"]["USD"],
            AUDCHF: AUD["Currency"]["CHF"],
            CADJPY: CAD["Currency"]["JPY"],
            CADCHF: CAD["Currency"]["CHF"],
            CHFJPY: CHF["Currency"]["JPY"],
            EURAUD: EUR["Currency"]["AUD"],
            EURCAD: EUR["Currency"]["CAD"],
            EURGBP: EUR["Currency"]["GBP"],
            EURNZD: EUR["Currency"]["NZD"],
            EURUSD: EUR["Currency"]["USD"],
            EURCHF: EUR["Currency"]["CHF"],
            EURJPY: EUR["Currency"]["JPY"],
            GBPAUD: GBP["Currency"]["AUD"],
            GBPCAD: GBP["Currency"]["CAD"],
            GBPJPY: GBP["Currency"]["JPY"],
            GBPNZD: GBP["Currency"]["NZD"],
            GBPUSD: GBP["Currency"]["USD"],
            GBPCHF: GBP["Currency"]["CHF"],
            NZDCAD: NZD["Currency"]["CAD"],
            NZDJPY: NZD["Currency"]["JPY"],
            NZDUSD: NZD["Currency"]["USD"],
            USDCAD: USD["Currency"]["CAD"],
            USDCHF: USD["Currency"]["CHF"],
            USDJPY: USD["Currency"]["JPY"]

        }
        WriteToFile(currencypairs, date);
        let endRun = new Date().getTime();
        console.log(currencypairs);

        // Calculate runtime lag
        let diff = endRun - startRun;
        console.log("This run: " + getFormatedTime(diff));

        totaltime = totaltime + diff;
        averagetime = totaltime / i;
        console.log("Total time: " + getFormatedTime(totaltime) + ". " + i + " run(s)");
        console.log("Average run time: " + getFormatedTime(averagetime));

        //calcPriceDif(currencypairs, date);
    }
}


iScrapper();