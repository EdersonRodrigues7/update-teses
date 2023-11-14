import { load } from 'cheerio';

// JURISPRUDENCIA EM TESES
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

export interface JurisprudenciaEmTesesRequest {
    query: EditionsQuery
};

// TEMAS STF
export interface TemaSTF {
    name: string;
    position: number;
    relator: string;
    is_repercussao: number;
    tese: string;
};

type TemaSTFBody = {
    temas: number[];
};

export interface TemaSTFRequest {
    body: TemaSTFBody;
};

// TEMAS STJ
export interface TemaSTJ {
    name: string;
    position: number;
    relator: string;
    is_repetitivo: number;
    tese: string;
};

type TemaSTJBody = {
    temas: number[];
};

export interface TemaSTJRequest {
    body: TemaSTJBody;
};