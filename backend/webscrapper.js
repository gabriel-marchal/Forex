"use strict"

const puppeteer = require('puppeteer');

const urlAUD = "https://www.x-rates.com/table/?from=AUD&amount=1";
const urlCAD = "https://www.x-rates.com/table/?from=CAD&amount=1";
const urlEUR = "https://www.x-rates.com/table/?from=EUR&amount=1";
const urlGBP = "https://www.x-rates.com/table/?from=GBP&amount=1";
const urlNZD = "https://www.x-rates.com/table/?from=NZD&amount=1";
const urlUSD = "https://www.x-rates.com/table/?from=USD&amount=1";







async function scrapePairsAUD(url) {
    console.log("Getting AUD");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeAUD = await txt.jsonValue();

    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
    const txt1 = await el1.getProperty('textContent');
    const AUDCAD = await txt1.jsonValue();


    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const AUDJPY = await txt2.jsonValue();

    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[2]/a');
    const txt3 = await el3.getProperty('textContent');
    const AUDNZD = await txt3.jsonValue();

    const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
    const txt4 = await el4.getProperty('textContent');
    const AUDUSD = await txt4.jsonValue();


    console.log({ timeAUD, AUDCAD, AUDJPY, AUDNZD, AUDUSD });

    const AUDrates = { timeAUD, AUDCAD, AUDJPY, AUDNZD, AUDUSD };

    browser.close();
    return AUDrates;

}
async function scrapePairsCAD(url) {
    console.log("Getting CAD");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeCAD = await txt.jsonValue();


    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
    const txt1 = await el1.getProperty('textContent');
    const CADJPY = await txt1.jsonValue();


    console.log({ timeCAD, CADJPY });
    const CADrates = { timeCAD, CADJPY };

    browser.close();
    return CADrates;

}

async function scrapePairsEUR(url) {
    console.log("Getting EUR");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeEUR = await txt.jsonValue();



    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[2]/td[2]/a');
    const txt1 = await el1.getProperty('textContent');
    const EURAUD = await txt1.jsonValue();

    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const EURCAD = await txt2.jsonValue();

    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[2]/td[2]/a');
    const txt3 = await el3.getProperty('textContent');
    const EURGBP = await txt3.jsonValue();

    const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[2]/a');
    const txt4 = await el4.getProperty('textContent');
    const EURNZD = await txt4.jsonValue();

    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
    const txt5 = await el5.getProperty('textContent');
    const EURUSD = await txt5.jsonValue();

    console.log({ timeEUR, EURAUD, EURCAD, EURGBP, EURNZD, EURUSD });

    const EURrates = { timeEUR, EURAUD, EURCAD, EURGBP, EURNZD, EURUSD };

    browser.close();
    return EURrates;

}
async function scrapePairsGBP(url) {
    console.log("Getting GBP");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeGBP = await txt.jsonValue();



    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[4]/td[2]/a');
    const txt1 = await el1.getProperty('textContent');
    const GBPAUD = await txt1.jsonValue();

    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const GBPCAD = await txt2.jsonValue();

    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
    const txt3 = await el3.getProperty('textContent');
    const GBPJPY = await txt3.jsonValue();

    const [el4] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[2]/tbody/tr[32]/td[2]/a');
    const txt4 = await el4.getProperty('textContent');
    const GBPNZD = await txt4.jsonValue();

    const [el5] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
    const txt5 = await el5.getProperty('textContent');
    const GBPUSD = await txt5.jsonValue();


    console.log({ timeGBP, GBPAUD, GBPCAD, GBPJPY, GBPNZD, GBPUSD });
    const GBPrates = { timeGBP, GBPAUD, GBPCAD, GBPJPY, GBPNZD, GBPUSD };

    browser.close();
    return GBPrates;

}

async function scrapePairsNZD(url) {
    console.log("Getting NZD");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeNZD = await txt.jsonValue();


    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[6]/td[2]/a');
    const txt1 = await el1.getProperty('textContent');
    const NZDCAD = await txt1.jsonValue();

    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[10]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const NZDJPY = await txt2.jsonValue();

    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[1]/td[2]/a');
    const txt3 = await el3.getProperty('textContent');
    const NZDUSD = await txt3.jsonValue();

    console.log({ timeNZD, NZDCAD, NZDJPY, NZDUSD });
    const NZDrates = { timeNZD, NZDCAD, NZDJPY, NZDUSD };

    browser.close();
    return NZDrates;

}

async function scrapePairsUSD(url) {
    console.log("Getting USD");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/span[2]');
    const txt = await el.getProperty('textContent');
    const timeUSD = await txt.jsonValue();


    const [el1] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[5]/td[2]/a');
    const txt1 = await el1.getProperty('textContent');
    const USDCAD = await txt1.jsonValue();

    const [el2] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[7]/td[2]/a');
    const txt2 = await el2.getProperty('textContent');
    const USDCHF = await txt2.jsonValue();

    const [el3] = await page.$x('/html/body/div[2]/div/div[3]/div[1]/div/div[1]/div[1]/table[1]/tbody/tr[9]/td[2]/a');
    const txt3 = await el3.getProperty('textContent');
    const USDJPY = await txt3.jsonValue();


    console.log({ timeUSD, USDCAD, USDCHF, USDJPY });
    const USDrates = { timeUSD, USDCAD, USDCHF, USDJPY };

    browser.close();
    return USDrates;

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {

    for (let i = 1; i > 0; i++) {
        const date = new Date();
        console.log(date);

        let seconds = date.getSeconds();
        if (seconds == "00") {
            await scrapePairsAUD(urlAUD);
            await scrapePairsCAD(urlCAD);
            await scrapePairsEUR(urlEUR);
            await scrapePairsGBP(urlGBP);
            await scrapePairsNZD(urlNZD);
            await scrapePairsUSD(urlUSD);
        }
        await sleep(1000);


    }
}

demo();