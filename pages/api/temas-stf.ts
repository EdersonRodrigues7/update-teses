import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import JurisprudenciaController from '@/src/controllers/jurisprudencia-controller';
import { TemaSTFRequest } from '@/src/types/types';

const cors = Cors({
    origin: "*", // http://127.0.0.1:8000/
    methods: ['POST', 'GET', 'HEAD', 'OPTIONS'],
    allowedHeaders: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type",
    optionsSuccessStatus: 200
})

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await runMiddleware(req, res, cors)

    try {
        const temasToGet = req.body.temas;
        const temas = await JurisprudenciaController.getTemasData(temasToGet);
        if (!temas) {
            throw new Error("There is a problem with the source page!")
        }
        return res.status(200).json({ temas: temas });
    } catch (error: any) {
        return res.status(500).send({ error: error.message });
    }
}