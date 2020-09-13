import {useEffect, useState} from 'react';


import '../styles.css';
import '../styles/app.css'

import LogIn from "../components/login";

async function auth(password) {
  const dataObj = {
    password,
  }
  const response = await fetch('https://movie-apixd.herokuapp.com/auth', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(dataObj)
  })

  if (response.status === 200) {
    const res = await response.json();
    if (res && res.error && res.error === 'not found') {
      return false
    } else {
      return {name: res.name, password: res.password}
    }
  } else {
    alert('There was an error' + response.error)
  }
}

export default function MyApp({Component, pageProps, data}){
  const [author, setAuthor] = useState(null)
  useEffect(async() => {
    async function effect() {
      const current = window.localStorage.getItem('authMovie')
      if (current) {
        const dat = await auth(current)
        if (dat) {
          setAuthor(dat.name)
        } else {
          setAuthor(false)
        }
      } else {
        setAuthor(false)
      }
    }
    effect()

  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const target = await auth(event.target[0].value)
    if (target) {
      window.localStorage.setItem('authMovie', target.password)
      setAuthor(target.name);
    } else {
      alert('Incorrect code')
    }

  }

  return author === null ? (
    <h1>Loading</h1>
  ) : typeof author === "string" ? (
    <Component author={author} {...pageProps}/>
  ) : (
      <LogIn handleSubmit={handleSubmit}/>
    )
}
