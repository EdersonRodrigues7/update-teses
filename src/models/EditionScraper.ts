import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
// import chromium from '@sparticuz/chromium-min';
import { EdicaoJurisprudencia } from '../types/types';

class EditionScraper {
    constructor(
        private url: string,
    ) { }

    public async getAllEditions(): Promise<EdicaoJurisprudencia[] | null> {
        const data = await this.getHtmlFromPage(this.url);
        if (!data) return null;
        const $ = cheerio.load(data);
        const editions: EdicaoJurisprudencia[] = [];

        $("div.clsTodasEdicoes table.tabelaEdicoesJT tr:first").remove();
        const editionsNames = $("div.clsTodasEdicoes table.tabelaEdicoesJT tr");
        editionsNames.each((i, el) => {
            // Parse Date
            const rawDate = $(el).find("td > span").text();
            let datesArray = rawDate.split('/');
            const parsedDate = `${datesArray[2]}-${datesArray[1]}-${datesArray[0]}`;

            // Parse Name
            const rawName = $(el).find("a.clsLinkEdicao span").text();
            const parsedName = rawName.replace("N. ", "").replace(":", " -");

            // Build edition
            const edition: EdicaoJurisprudencia = {
                name: parsedName,
                number: Number($(el).find("a.clsLinkEdicao").attr("data-edicao")),
                available: 1,
                type: 'jurisprudencia-em-teses',
                published_at: parsedDate
            };
            // Add edition to array
            editions.push(edition);
        });

        return editions;
    }

    public async getLastEdition(): Promise<EdicaoJurisprudencia | null> {
        const data = await this.getHtmlFromPage(this.url);
        if (!data) return null;
        const $ = cheerio.load(data);
        const theme = $(".clsVerbete a").html();
        const num = $("span.numeroSumula").text();
        const editionName = `Edição ${num} - ${theme}`;

        const rawDate = $("span.clsLabel:contains('disponibilizada em') b").text();
        let datesArray = rawDate.split('/');
        const parsedDate = `${datesArray[2]}-${datesArray[1]}-${datesArray[0]}`;

        const edition: EdicaoJurisprudencia = {
            name: editionName,
            number: Number(num),
            available: 0,
            type: 'jurisprudencia-em-teses',
            published_at: parsedDate
        };

        return edition;
    }

    private async getHtmlFromPage(url: string) {
        // const browser = await puppeteer.launch({
        //     args: chromium.args,
        //     headless: chromium.headless,
        //     executablePath: await chromium.executablePath("/browsers/chromium")
        // });
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
        );
        await page.goto(url);
        const html = await page.content();
        await browser.close();
        return html;
    }
};

export default EditionScraper;