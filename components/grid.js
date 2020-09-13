import React from 'react';
import styles from '../styles/grid.module.css';
import Nav from '../components/nav';
import Modal from '../components/modal'

export default function Grid(props) {
  const {movieData} = props;

  const [showModal, setShowModal] = React.useState([false, 0]);
  const [sortedField, setSortedField] = React.useState(null);

  let sortedMovies = movieData.sort((a, b) => a.rating - b.rating)

  if (sortedField !== null) {
    sortedMovies.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return 1;
      }
      if (a[sortedField] > b[sortedField]) {
        return -1;
      }
      return 0;
    });
  }
  function handleChange(e) {
    setSortedField(e.target.value === 'Date' ? 'date' : 'average');
  }

  return (
    <>
      <Nav author={props.author}/>
      <div className={styles.body}>
        <div className={styles.container}>

          <div className="flex flex-wrap -m-3">
            <div className="w-1/2">
              <p className="font-sans pl-3 text-2xl tracking-wide  font-light text-gray-800">Total Movies: {sortedMovies.length}</p>
            </div>
            <div className="w-1/2">
              <div className="relative">
              <select
                onChange={handleChange}
                className="float-right block appearance-none mr-3 border border-gray-700 text-gray-700 py-2 px-3 pr-6 rounded focus:outline-none bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option disabled>Sort By...</option>
                <option>Rating</option>
                <option>Date</option>
              </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  p-6 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>

            </div>
            {sortedMovies.map((object, index) => {
              return (
                <div className="w-full sm:w-1/2 md:w-1/4 flex flex-col p-3">
                  <div key={index + 'div1'} className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                    <div  key={index + 'div2'} className="bg-cover h-48 bg-gray-100" style={{backgroundImage: "url(" + object.url + ")"}}>
                      {
                        !object.url ? (
                          <>
                            <svg  style={{margin: 'auto'}} width="150"
                                 height="150" viewBox="0 0 24 24" stroke="#cbd5e0" fill="none"
                                 >
                              <path stroke="none" d="M0 0h24v24H0z"/>
                              <rect x="4" y="4" width="16" height="16" rx="2"/>
                              <line x1="8" y1="4" x2="8" y2="20"/>
                              <line x1="16" y1="4" x2="16" y2="20"/>
                              <line x1="4" y1="8" x2="8" y2="8"/>
                              <line x1="4" y1="16" x2="8" y2="16"/>
                              <line x1="4" y1="12" x2="20" y2="12"/>
                              <line x1="16" y1="8" x2="20" y2="8"/>
                              <line x1="16" y1="16" x2="20" y2="16"/>
                            </svg>
                            <p className="text-gray-500 " style={{textAlign: 'center'}}>No Image</p>
                          </>
                        ) : null
                      }

                    </div>
                    <div  key={index + 'div3'} className="p-4 flex-1 flex flex-col">
                      <h2 key={index + 'div4'} className="mb-4 text-2xl">{object.name}</h2>
                      { object.ratings.length ? (
                        <>
                          <p key={index + 'div5'} className="mb-4 text-grey-darker text-sm flex-1">Average rating: <span>{object.average}</span></p>
                          <button key={index + 'div6'} onClick={() => setShowModal([true, index])} className="btn card_btn">See Ratings</button>
                        </>
                      ) : (
                        <p key={index + 'div7'} className="mb-4 text-grey-darker text-sm flex-1">No rating data</p>
                      )
                      }
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>
      <Modal showModal={showModal} movieData={props.movieData} setShowModal={setShowModal}/>
    </>
  )
}
