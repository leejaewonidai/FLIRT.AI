// pages/api/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { saveToGoogleSheet } from '../../src/app/saveToSheet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { data } = req.query;

    try {
        const parsedData = JSON.parse(data as string);
        const response = await saveToGoogleSheet(parsedData);
        res.status(200).json(response);
    } catch (error: any) {
        console.error("Error in saveToSheet API:", error);
        res.status(500).json({ success: false, message: "Data addition failed", error: error.message });
    }
}
