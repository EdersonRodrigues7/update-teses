import cheerio from 'cheerio';
// import puppeteer from 'puppeteer';
import { TeseJurisprudencia } from '../types/types';

class TeseScraper {
    constructor(
        private baseUrl: string,
        private start: number,
        private limit: number
    ) { }

    public async getTesesByEdition(): Promise<TeseJurisprudencia[]> {
        const teses: TeseJurisprudencia[] = [];
        for (let i = this.start; i <= this.limit; i++) {
            const html = await this.getHtmlFromPage(`${this.baseUrl}'${i}'.tit.`);
            const $ = cheerio.load(html);
            const theme = $(".clsVerbete a").html();
            const rawDate = $("span.clsLabel:contains('disponibilizada em') b").text();
            let datesArray = rawDate.split('/');
            const parsedDate = `${datesArray[2]}-${datesArray[1]}-${datesArray[0]}`;

            const tesesDoc = $(".divEdicaoJT").find("div.clsTemasJT");
            tesesDoc.each((index, el) => {
                const teseName = `Edição ${i} -${theme} - Tese ${index + 1}`;
                const slug = "";
                const description = $(el).find("div.clsSubmitPesquisaTema > a").text().replaceAll("\n", " ");

                const tese: TeseJurisprudencia = {
                    name: teseName,
                    position: index + 1,
                    published_at: parsedDate,
                    destaque_oficial: description,
                    editionNumber: i,
                }
                teses.push(tese);
            });
        }

        return teses;
    }

    private async getHtmlFromPage(url: string): Promise<string> {
        // const browser = await puppeteer.launch({ headless: "new" });
        // const page = await browser.newPage();
        // await page.setUserAgent(
        //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
        // );
        // await page.goto(url);
        // const html = await page.content();
        // await browser.close();
        // return html;
        return "temp";
    }
}

export default TeseScraper;