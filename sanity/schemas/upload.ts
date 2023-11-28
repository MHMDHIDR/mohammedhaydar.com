export default {
  name: 'upload',
  title: 'Upload',
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
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/*'
          }
        }
      ]
    }
  ]
}
