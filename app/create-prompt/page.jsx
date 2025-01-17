'use client';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({ prompt: '', tag: '' });

	const createPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (session?.user) {
			try {
				const response = await fetch('/api/prompt/new', {
					method: 'POST',
					body: JSON.stringify({
						prompt: post.prompt,
						tag: post.tag,
						userId: session?.user.id,
					}),
				});

				if (response.ok) {
					router.push('/');
				}
			} catch (err) {
				console.log(err);
			} finally {
				setSubmitting(false);
			}
		} else {
			signIn();
		}
	};

	return (
		<Form
			type='Create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
