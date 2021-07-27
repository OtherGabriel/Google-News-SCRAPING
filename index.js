const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://g1.globo.com/');
  
  const myList = await page.evaluate(() => {
    const listNotices = document.querySelectorAll(".feed-post-link");
    const arrayNotices = [...listNotices];
    const myList = arrayNotices.map(notice => ({
      text: notice.textContent,
      href: notice.href
    }));

    return myList;
  })

  fs.writeFile('notices.json', JSON.stringify(myList, null, 2), err => {
    if(err) throw new Error('something went wrong')

    console.log('well done!')
  })

  await browser.close();
})();
