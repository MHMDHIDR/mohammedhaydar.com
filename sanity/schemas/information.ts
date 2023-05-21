const information = {
  name: 'information',
  title: 'Information',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string'
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string'
    },
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string'
    },
    {
      name: 'thumbImage',
      title: 'Thumbnail Image',
      type: 'url'
    },
    {
      name: 'largeImage',
      title: 'Large Image',
      type: 'string'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text'
    },
    {
      name: 'age',
      title: 'Age',
      type: 'number'
    },
    {
      name: 'nationality',
      title: 'Nationality',
      type: 'string'
    },
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string'
    },
    {
      name: 'freelance',
      title: 'Freelance',
      type: 'string'
    },
    {
      name: 'socialAddress',
      title: 'Social Address',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url'
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        }
      ]
    },
    {
      name: 'phoneNumbers',
      title: 'Phone Numbers',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'emailAddress',
      title: 'Email Address',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'resumeLink',
      title: 'Resume Link',
      type: 'url'
    }
  ]
}

export default information
