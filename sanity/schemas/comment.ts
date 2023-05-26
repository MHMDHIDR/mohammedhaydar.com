export default {
  name: 'comment',
  title: 'Comments',
  type: 'document',
  fields: [
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: "Comments won't show on the blog without approval"
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text'
    },
    {
      name: 'blog',
      type: 'reference',
      to: [{ type: 'blogs' }]
    }
  ]
}
