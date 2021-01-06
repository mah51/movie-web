import React from 'react';

export default function Modal({showModal, setShowModal, movieData}) {
  return (
    showModal[0] ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"

          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Ratings for {movieData[showModal[1]].name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal([false, 0])}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  {
                    movieData[showModal[1]].ratings.map((rating) => {
                      return (
                        <>
                        <p className="text-gray-600 text-m font-bold  leading-relaxed">
                          {rating.author[0].toUpperCase() + rating.author.slice(1)} → {rating.rating}
                        </p>
                        <p className="mb-4 text-gray-600 text-sm">
                          {rating.comment ? rating.comment : 'No comment'}
                        </p>
                        </>
                      )
                  })
                  }
                  <p className="my-4 text-gray-800 text-xl font-bold leading-relaxed">
                    {movieData[showModal[1]].ratings.length ?
                    'Average → ' + Math.round(movieData[showModal[1]].ratings.map(rating => rating.rating).reduce((a,b) => a+b) / movieData[showModal[1]].ratings.length * 10 ) / 10 : null
                    }
                  </p>

                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal([false, 0])}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null
  )
}
