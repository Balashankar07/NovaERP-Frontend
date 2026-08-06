const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('BROWSER CONSOLE ERROR:', msg.text());
      }
    });

    page.on('pageerror', error => {
      console.log('BROWSER PAGE ERROR:', error.message);
    });

    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully');
    
    await browser.close();
  } catch (err) {
    console.error('Puppeteer Script Error:', err);
  }
})();
