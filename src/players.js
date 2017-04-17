export default [
  {
    name:       'Neil Sarkar',
    avatar_url: 'https://placehold.it/420x420',
    gender:     'M',
  },
  {
    name:       'Santi Garza',
    avatar_url: 'https://placehold.it/420x420',
    gender:     'M',
  },
  {
    name:       'Taryn Davis',
    avatar_url: 'https://placehold.it/420x420',
    gender:     'F',
  },
  // {
  //   name:       'Andrew Sauer',
  //   avatar_url: 'https://placehold.it/420x420',
  //   gender:     'M',
  // },
  // {
  //   name:       'Kevin David Crowe',
  //   avatar_url: 'https://placehold.it/420x420',
  //   gender:     'M',
  // },
  // {
  //   name:       'Valentina Something',
  //   avatar_url: 'https://placehold.it/420x420',
  //   gender:     'M',
  // },
  // {
  //   name:       'Severin Something',
  //   avatar_url: 'https://placehold.it/420x420',
  //   gender:     'F',
  // },
  // {
  //   name:       'Ines Something',
  //   avatar_url: 'https://placehold.it/420x420',
  //   gender:     'F',
  // },
  // {
  //   name:       'John from the lodge',
  //   avatar_url: 'https://placehold.it/420x420',
  //   gender:     'M',
  // },
  // {
  //   name:       'Annie Graham',
  //   avatar_url: 'https://placehold.it/420x420',
  //   gender:     'F',
  // },
].map((p, i) => {
  p.id = i
  return p
})
