import React from 'react';
import styles from '../styles/grid.module.css';
import Nav from '../components/nav';
import Modal from '../components/modal'

export default function Grid(props) {
  const [showModal, setShowModal] = React.useState([false, 0]);
  return (
    <>
      <Nav author={props.author}/>
      <div className={styles.body}>
        <div className={styles.container}>
          <div className="flex flex-wrap -m-3">

            {props.movieData.map((object, index) => {
              return (
                <div className="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
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
                          <p key={index + 'div5'} className="mb-4 text-grey-darker text-sm flex-1">Average rating: <span>{Math.round(object.ratings.map(rating => rating.rating).reduce((a,b) => a+b) / object.ratings.length * 10 ) / 10}</span></p>
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
