const initialState = {
  name: 'Kaoなし',
  navigations: [
    { 
      route: '/images', 
      name: 'images', 
      icon: 'images', 
      text: 'Images',
      nested: false
    },
    { 
      route: '/records', 
      name: 'records', 
      icon: 'microphone', 
      text: 'Recordings',
      nested: false
    },
    { 
      route: '/gifts', 
      name: 'gifts', 
      icon: 'gift', 
      text: 'Gift',
      nested: false
    },
    { 
      route: '/trashes', 
      name: 'trashes', 
      icon: 'trash', 
      text: 'Trash',
      nested: false
    },
    { 
      route: '/charts', 
      name: 'charts', 
      icon: 'chart pie', 
      text: 'Charts',
      nested: false
    },
    { 
      route: '/arts', 
      name: 'arts', 
      icon: 'paper plane', 
      text: 'Arts',
      nested: false
    },
    { 
      route: '#books', 
      name: 'books', 
      icon: 'book', 
      text: 'Book',
      nested: true,
      childs: [
        {
          route: '/books/horror', 
          name: 'books__horror', 
          icon: 'freebsd', 
          text: 'Horror',
          nested: false
        },
        {
          route: '#booksromance', 
          name: 'books__romance', 
          icon: 'like', 
          text: 'Romance',
          nested: true,
          childs: [
            {
              route: '/books/romance/sad', 
              name: 'books__romance__sad', 
              icon: 'frown', 
              text: 'Sad Ending',
              nested: false
            },
            {
              route: '/books/romance/happy', 
              name: 'books__romance__happy', 
              icon: 'smile', 
              text: 'Happy Ending',
              nested: false
            },  
          ]
        },
        {
          route: '/books/fiction', 
          name: 'books__fiction', 
          icon: 'studiovinari', 
          text: 'Fiction',
          nested: false
        },
      ] 
    },
    { 
      route: '#videos', 
      name: 'videos', 
      icon: 'video', 
      text: 'Videos',
      nested: true,
      childs: [
        {
          route: '/videos/horror', 
          name: 'books__horror', 
          icon: 'freebsd', 
          text: '18++',
          nested: false
        },
        {
          route: '/videos/anime', 
          name: 'books__anime', 
          icon: 'studiovinari', 
          text: 'Animes',
          nested: false
        },
        {
          route: '#videosromance', 
          name: 'books__romance', 
          icon: 'like', 
          text: 'Romance',
          nested: true,
          childs: [
            {
              route: '/videos/romance/sad', 
              name: 'books__romance__sad', 
              icon: 'frown', 
              text: 'Sad Ending',
              nested: false
            },
            {
              route: '/videos/romance/happy', 
              name: 'books__romance__happy', 
              icon: 'smile', 
              text: 'Happy Ending',
              nested: false
            },  
          ]
        },
      ]
    }
  ]
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'example': return state
    default: return state
  }
}

export default userReducer