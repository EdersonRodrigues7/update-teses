import { load } from 'cheerio';

export interface EdicaoJurisprudencia {
    name: string;
    number: number | undefined;
    available: number;
    type: string;
    published_at: string;
};

export interface TeseJurisprudencia {
    name: string;
    position: number;
    published_at: string;
    destaque_oficial: string;
    editionNumber: number
};

export type CheerioRoot = ReturnType<typeof load>;

type EditionsQuery = {
    edition: string;
}

export interface CustomRequest {
    query: EditionsQuery
};