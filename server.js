const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://news.google.com/topstories?hl=pt-BR&gl=BR&ceid=BR:pt-419');
  
  const myList = await page.evaluate(() => {
    const listNotices = document.querySelectorAll(".VDXfz")
    const arrayNotices = [...listNotices]
    const myList = arrayNotices.map(notice => ({
      text: notice.nextElementSibling.firstChild.firstChild.textContent
    }))

    return myList
  })

  fs.writeFile('notices.json', JSON.stringify(myList, null, 2), err => {
    if(err) throw new Error('something went wrong')

    console.log('well done!')
  })

  await browser.close();
})();
