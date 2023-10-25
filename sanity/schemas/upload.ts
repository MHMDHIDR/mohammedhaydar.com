export default {
  name: 'upload',
  title: 'upload',
  type: 'document',
  fields: [
    {
      name: 'thumb',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'sound',
      title: 'Sound',
      type: 'file', // Use the 'file' type for sound uploads
      options: {
        accept: 'audio/*' // Specify the accepted audio file types
      },
      validation: (Rule: { required: () => any }) => Rule.required()
    }
  ]
}
