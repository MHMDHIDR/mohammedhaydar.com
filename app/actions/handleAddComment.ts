'use server'
import { client } from '@/sanity/config/client-config'
import type { CommentProps } from '@/types'

export async function handleAddComment(newComment: CommentProps) {
  const { _id, name, email, comment } = newComment

  try {
    await client.create({
      _type: 'comment',
      blog: {
        _type: 'reference',
        _ref: _id
      },
      name,
      email,
      comment
    })

    return {
      isOk: true,
      msg: 'Thank you for your comment! It has been added successfully and will be reviewed and shown as soon as possible.'
    }
  } catch (error) {
    return {
      isOk: false,
      msg: 'Oops! There was an error adding the comment. Please try again.'
    }
  }
}
