const puppeteer = require('puppeteer');

(async () => {
    const url = process.argv[2] || "https://quotational.com/author/bender";
    const character = url.split("/").pop().replace("-", "");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const quotes = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".mb-0+p")).map(p => p.innerHTML);
    });

    require("fs").appendFile(
        "./quotes.js",
        `const ${character}=${JSON.stringify(quotes)};\n`,
        function (err) { console.log(err ? 'Error :'+err : 'ok') }
   );
    await browser.close();
})();