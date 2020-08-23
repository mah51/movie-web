import {useState} from 'react'
import Link from 'next/link'
import Nav from '../components/nav';

export default function Review({data, author}) {
  const [value, setValue] = useState(0)

  function handleChange(e) {
    setValue(e.target.value)
  }

  async function handleSubmit(e) {
    const dataObj = {
      author: author[0].toUpperCase() + author.slice(1),
      id: data.data[e.target[0].options.selectedIndex].id,
      rating: Math.round(parseFloat(e.target[1].value) * 10) / 10,
    }
    e.preventDefault()

    const response = await fetch('https://movie-apixd.herokuapp.com/rating', {
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

    if (response.status === 200) {alert('Successfully added review')}
    else { alert('There was an error' + response.error)}
  }

  return (
    <>
      <div style={{height: '100vh'}} className="bg-gray-200">
      <Nav author={author}/>
      <div  className="border-t border-l border-r border-gray-400 p-4 px-3  flex justify-center">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-16 content-center" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Movie
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state">
                  {
                    data.data.sort((a, b) => a.date - b.date).reverse().map(movie => {
                      return (
                        <option key={movie.id}>{movie.name}</option>
                      )
                    })
                  }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Rating
              </label>
              <input
                onChange={handleChange}
                className={`shadow appearance-none border border-${!isNaN(value) && value < 10 && value > 0 ? 'green' : 'red'}-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="rating" type="text" placeholder="5.5"/>
              {!isNaN(value) && value < 10 && value > 0 ? '' : (<p className="text-red-500 text-xs italic">Enter a valid number between 0 -10.</p>)}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="Submit">
                Submit review
              </button>
              <Link href="/">
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
                Back to movies
              </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://movie-apixd.herokuapp.com/`)
  const data = await res.json();
  return { props: {data}}
}
