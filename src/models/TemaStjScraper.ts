import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { TemaSTJ } from '../types/types';

class TemaStjScraper {
    constructor(
        private baseUrl: string,
        private temasToGet: number[]
    ) { }

    public async getTemasSTJ(): Promise<TemaSTJ[]> {
        const temas: TemaSTJ[] = [];

        for (let i = 0; i < this.temasToGet.length; i++) {

        }

        return temas;
    }

    private async getHtmlFromPage(url: string): Promise<string> {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
        );
        await page.goto(url, { waitUntil: "networkidle2" }); // page.click()

        const html = await page.content();
        await browser.close();
        return html;
    }
}