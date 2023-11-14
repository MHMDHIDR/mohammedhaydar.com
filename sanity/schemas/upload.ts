export default {
  name: 'upload',
  title: 'upload',
  type: 'document',
  fields: [
    {
      name: 'thumb',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            accept: 'image/*'
          }
        }
      ]
    },
    {
      name: 'sound',
      title: 'Sound',
      type: 'file',
      options: {
        accept: 'audio/*'
      },
      validation: (Rule: { required: () => any }) => Rule.required()
    }
  ]
}
