const skills = {
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'number'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string'
            },
            {
              name: 'image',
              title: 'Image',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'percentage',
      title: 'Percentage',
      type: 'number'
    }
  ]
}

export default skills
