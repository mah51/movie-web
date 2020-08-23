import {useEffect, useState} from 'react';


import '../styles.css';
import '../styles/app.css'

import LogIn from "../components/login";

const auth = [
  { code: process.env.SALHA, author: 'Salha' },
  { code: process.env.ASAL, author: 'Asal' },
  { code: process.env.JOE, author: 'Joe' },
  { code: process.env.MICHAEL, author: 'Michael' }
]
export default function MyApp({Component, pageProps, data}){
  const [author, setAuthor] = useState(null)
  useEffect(() => {
    if (auth.map(user => user.code).includes(window.localStorage.getItem('loggedIn'))) {setAuthor(auth[auth.map(user => user.code).indexOf(window.localStorage.getItem('loggedIn'))].author) }
    else {
      setAuthor(false)
      window.localStorage.removeItem('loggedIn')
    }
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const index = auth.map(user => user.code).indexOf(event.target[0].value)
    if (index === - 1 ) { return alert('Incorrect code')}
    const authObj = auth[index]
    window.localStorage.setItem('loggedIn', authObj.code)
    setAuthor(authObj.author);
  }
  return author === null ? (
    <h1>Loading</h1>
  ) : typeof author === "string" ? (
    <Component author={author} {...pageProps}/>
  ) : (
      <LogIn handleSubmit={handleSubmit}/>
    )
}
