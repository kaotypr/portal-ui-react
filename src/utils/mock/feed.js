import React from 'react'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import yellow from '@material-ui/core/colors/yellow'
import Avatar from '@material-ui/core/Avatar'

export default [{
  from: 'Jeff Jones',
  message: 'Consectetur Dolor',
  avatar: <Avatar aria-label="Post" style={{backgroundColor: yellow[500]}}>A</Avatar>,
  subject: 'Ullamcorper Bibendum Ligula',
}, {
  from: 'Jeff Jones',
  message: 'Consectetur Dolor',
  avatar: <Avatar aria-label="Post" style={{backgroundColor: 'primary'}}>J</Avatar>,
  subject: 'Ullamcorper Bibendum Ligula',
}, {
  from: 'Jeff Jones',
  message: 'Consectetur Dolor',
  avatar: <Avatar aria-label="Post" style={{backgroundColor: blue[500]}}>O</Avatar>,
  subject: 'Ullamcorper Bibendum Ligula',
}, {
  from: 'Jeff Jones',
  message: 'Consectetur Dolor',
  avatar: <Avatar aria-label="Post" style={{backgroundColor: red[500]}}>I</Avatar>,
  subject: 'Ullamcorper Bibendum Ligula',
}]

// from: 'Sandra Adams',
//   message: 'Adipiscing Mattis',
//   avatar: <Avatar alt='Sandra Adams' src='static/images/face4.jpg' />,