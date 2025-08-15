import type { Item } from "./parser";

export async function askToAI(data: Item[]): Promise<Item[]> {
	const cleanJson = data.map(item => ({
			name: item.name,
			description: item.description,
			estimatedTime: item.estimatedTime
	}));
	const response = await fetch("https://ai.hackclub.com/chat/completions", {
			method: "POST",
			headers: {
					"Content-Type": "application/json"
			},
			body: JSON.stringify({
					messages: [
							{"role": "user", "content":"JUST OUTPUT THE JSON, NOTHING OTHER. You are a teenager participating in the Summer of Makings. In your opinion, rank these objects from most interesting to least interesting and provide a \"worth-it\" ratio in terms of development time/reward. You will respond without any wording, just a JSON in this format; the worth-it ratio ranges from 0 to 1 [{name: string;description: string; estimatedTime: string;ratioWorthIt: number,qtyLeft?: number}]. Here is the list of objects in JSON format, don't miss any items, and answer just with a JSON:"},
							{"role": "user", "content":JSON.stringify(cleanJson)}
					]
			})
	})

	if (response.ok !== true) {
		throw new Error("Skill Issue")
	}

	const responseJson = await response.json();
		
	try {
		const rawContent = responseJson.choices?.[0]?.message?.content ?? "";

		const cleanedContent = rawContent
			.replace(/<think>[\s\S]*?<\/think>/g, '') 
			.trim();

		const jsonStart = cleanedContent.indexOf('[');
		const jsonEnd = cleanedContent.lastIndexOf(']') + 1;
		const jsonString = cleanedContent.slice(jsonStart, jsonEnd);

		const parsed: AIResponse[] = JSON.parse(jsonString);

		const items: Item[] = parsed.map(item => {
			const itemFound = data.find(d => d.name === item.name);
			return {
				name: item.name,
				description: item.description,
				estimatedTime: item.estimatedTime,
				illustration: itemFound?.illustration ?? "",
				price: itemFound?.price ?? 0,
				qtyLeft: itemFound?.qtyLeft ?? undefined,
				ratio: item.ratioWorthIt
			};
		});

		return items;
	} catch (err) {
		console.error("Error parsing AI response:", err);
		throw err;
	}
}

interface AIResponse {
    description: string;
    estimatedTime: string;
    name: string;
    ratioWorthIt: number;
}