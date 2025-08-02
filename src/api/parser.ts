import * as cheerio from "cheerio";
import { fetchBypassingCORS } from "./cors";

export async function getItems(): Promise<Item[]> {
    const response = await fetchBypassingCORS("https://summer.hackclub.com/shop");
    const html = await response.text();
    const $ = cheerio.load(html);

    const items: Item[] = [];

    $('.card-with-gradient').each((_, element) => {
        const card = $(element);

        const price = card
            .find('.absolute.top-2.right-2')
            .text()
            .trim()
        const name = card.find('h3').text().trim();
        const description = card.find('p').first().text().trim();
        const estimatedTimeText = card
            .find('div.text-xs.text-gray-500.text-center')
            .text()
            .trim();
        const qtyLeftText = card
            .find('p.text-sm.text-orange-600.font-semibold.mt-2')
            .text()
            .trim();
        const illustration = card.find('img').eq(1).attr("src")
        const qtyLeft = qtyLeftText.match(/\d+/)?.[0] ?? '0';

        const blacklist = ["Spider", "Graphic design is my passion", "Summer of Making Blue", "Pocket Watcher", "Sunglasses", "Offshore Bank Account", "Gold Verified", "I am Rich"]
        if (name === "" || blacklist.includes(name)) return;
        items.push({
            name,
            price: Number(price),
            description,
            illustration: illustration ?? "",
            estimatedTime: estimatedTimeText,
            qtyLeft: Number(qtyLeft) === 0 ? undefined : Number(qtyLeft) 
        });
    });
    

    return items.splice(5);
}

export interface Item {
    name: string;
    description: string;
    price: number;
    illustration: string;
    estimatedTime: string;
    qtyLeft?: number;
    ratio?: number
}