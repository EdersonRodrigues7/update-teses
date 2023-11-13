import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { TemaSTF } from '../types/types';

class TemaStfScraper {
    constructor(
        private baseUrl: string,
        private target: number[]
    ) { }

    public async getTemasSTF(): Promise<TemaSTF[]> {
        const temas: TemaSTF[] = [];

        for (let i = 0; i < this.target.length; i++) {
            const position = this.target[i];
            const url = `${this.baseUrl}${position}`;
            const firstPage = await this.getHtmlFromPage(url);
            const firstPageDoc = cheerio.load(firstPage);

            const temaLink = firstPageDoc("div.tema-numero a").attr('href') ?? "";
            const html = await this.getHtmlFromPage(`https://portal.stf.jus.br/jurisprudenciaRepercussao/${temaLink}`);
            const $ = cheerio.load(html);

            const temaName = `Tese ${position}`;
            const repercussaoDiv = $('div.alert-repercussao strong').text();
            const is_repercussao = repercussaoDiv === "Sim" ? 1 : 0;
            const relator = $('dl.dl-horizontal dd:eq(0)').text().toLowerCase();
            const tese = $('dl.dl-horizontal dd:eq(3)').text();

            const tema: TemaSTF = {
                name: temaName,
                position: position,
                relator: relator,
                is_repercussao: is_repercussao,
                tese: tese
            }

            temas.push(tema);
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

export default TemaStfScraper;