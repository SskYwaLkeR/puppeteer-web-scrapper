const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [elem] = await page.$x('//*[@id="landingImage"]');
  const src = await elem.getProperty("src");
  const srcTxt = await src.jsonValue();

  const [elem2] = await page.$x('//*[@id="productTitle"]');
  const txt = await elem2.getProperty("textContent");
  const rawTxt = await txt.jsonValue();
  const headingTxt = await rawTxt.trim();

  const [elem3] = await page.$x('//*[@id="priceblock_ourprice"]');
  const price = await elem3.getProperty("textContent");
  const rawPrice = await price.jsonValue();

  console.log({ srcTxt, headingTxt, rawPrice });

  browser.close();
}

scrapeProduct(
  "https://www.amazon.in/dp/B07XVLMXY7/ref=gwdb_bmc_3_APPLE?pf_rd_s=merchandised-search-5&pf_rd_t=Gateway&pf_rd_i=mobile&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_r=G5TAXEKYB630HZJHDMWN&pf_rd_p=afda42f9-8a6f-4a5f-96df-b14311039e0e"
);
