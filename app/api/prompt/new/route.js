import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req) => {
	const { userId, prompt, tag } = await req.json();
	try {
		await connectToDB(userId);

		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag,
		});
		newPrompt.save();
		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (err) {
		return new Response('Failed to create a new prompt', { status: 500 });
	}
};
