import {useState} from 'react';

import React from 'react';
import Link from "next/link";

export default function MovieModal({showModal, setShowModal, movieData, author}) {
  const [valid, setValid] = useState(true)
  const [movieID, setMovieID] = useState('')
  async function handleSubmit(e) {
    e.preventDefault()
    const dataObj = {
      author: author,
      id: e.target.form[1].value,
      name: e.target.form[0].value
    }
    e.target.form[2].value ? dataObj.url = e.target.form[2].value : null
    const response = await fetch('http://localhost:8000/movie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    })
    if (response.status === 200) { return alert('Successfully added movie')}
    else {
      console.log(response)
      return alert('There was an error...')}
  }

  function closeModal() {
    setShowModal(false)
    setValid(true)
    setMovieID('')
  }

  function handleChangeName(e) {
    setMovieID(e.target.value.split(/ +/).join('-').toLowerCase())
    if(e.target.value.length > 3 && e.target.value.length < 20 && !movieData.filter(movie => movie.name === e.target.value.length || movie.id === movieID).length && e.target.value.match(/[a-zA-Z]/)) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  return (
    showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Add a new movie
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => closeModal()}
                >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                </button>
              </div>
              <div className="relative p-6 pb-0 flex-auto">
                <form className="w-full max-w-lg">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="grid-first-name">
                        Movie Name
                      </label>
                      <input
                        onChange={handleChangeName}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name" type="text" placeholder="Toy Story 4"/>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="grid-last-name">
                        Movie ID
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name" type="text" placeholder="toy-story-4" value={movieID} disabled/>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      >
                        Image URL
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="https://google.com/epic%20image%20here"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             >
                        Current Movies
                      </label>
                      <textarea
                        disabled
                        style={{overflow: 'hidden'}}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={

                            movieData.map(movie => {
                              return movie.name
                            }).join('                   ')

                        }
                      />
                      { valid ? null : <p className="text-red-500 text-xs italic">This form is not valid!</p>}
                    </div>
                  </div>


              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={() => closeModal()}
                >
                  Cancel
                </button>
                <button
                  className={`bg-${valid ? 'green' : 'gray'}-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                  type="Submit"
                  disabled={!valid}
                  style={{ transition: "all .15s ease" }}
                  onClick={handleSubmit}
                >
                  Add Movie
                </button>
              </div>
                </form>
              </div>
              </div>
            </div>
          </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null
  )
}
