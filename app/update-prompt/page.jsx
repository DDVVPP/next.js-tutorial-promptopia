'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async() => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if (promptId) getPromptDetails();
  }, [promptId])

  // const editPrompt = async (e) => {
  //   //prevent default behavior of browser when submitting a form which is to do a reload when we want the least amount of reloads as possible
  //   e.preventDefault();
  //   setSubmitting(true);

  //   try {
  //     //pass data to this api endpoint (instead of separate BE dev with BE server and express routes, just go to api folder - prompt/new)
  //     const response = await fetch('/api/prompt/new', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         prompt: post.prompt,
  //         userId: session?.user.id,
  //         tag: post.tag
  //       })
  //     })

  //     //if it was successful, redirect to home page
  //     if (response.ok) {
  //       router.push('/');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={() => {}}
    />
  )
}

export default EditPrompt
