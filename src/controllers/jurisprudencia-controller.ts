import EditionScraper from "../models/EditionScraper";
import TeseScraper from "../models/TeseScraper";
import TemaStfScraper from "../models/TemaStfScraper";

class JurisprudenciaController {
    constructor() { }

    static async lastEdition() {
        const scraper = new EditionScraper("https://processo.stj.jus.br/SCON/jt/jt.jsp");
        const response = scraper.getLastEdition();
        return response;
    }

    static async tesesFromEdition(edition: number) {
        const scraper = new TeseScraper("https://processo.stj.jus.br/SCON/jt/doc.jsp?livre=", edition, edition);
        const response = scraper.getTesesByEdition();
        return response;
    }

    static async getTemasData(temasArray: number[]) {
        const scraper = new TemaStfScraper("https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=", temasArray);
        const response = scraper.getTemasSTF();
        return response;
    }
}

export default JurisprudenciaController;