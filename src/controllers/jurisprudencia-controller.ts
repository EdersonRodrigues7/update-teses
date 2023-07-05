import EditionScraper from "../models/EditionScraper";
import TeseScraper from "../models/TeseScraper";

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
}

export default JurisprudenciaController;