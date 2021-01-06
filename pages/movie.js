import { useState } from "react";

import Nav from "../components/nav";
import ButtonModal from "../components/movieModal.js";
import moment from "moment";

export default function Movie({ data, author }) {
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");
  const filteredMovies = data.data
    .sort((a, b) => a.date - b.date)
    .reverse()
    .filter(
      movie =>
        movie.name.toLowerCase().includes(filter) || movie.id.includes(filter)
    );

  function handleSubmit() {}

  function handleSearch(e) {
    setFilter(e.target.value.toLowerCase());
    console.log(e.target.value.toLowerCase());
  }

  async function removeMovie(id) {
    const dataObj = {
      id
    };
    const response = await fetch(
      "https://movie-apixd.herokuapp.com/remove-movie",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObj)
      }
    );
    if (response.status === 200) return true;
    else return false;
  }

  return author === "michael" ? (
    <>
      <Nav author={author} />
      <ButtonModal
        showModal={modal}
        author={author}
        movieData={data.data}
        setShowModal={setModal}
      />
      <div
        style={{ minHeight: "100vh" }}
        className="antialiased font-sans bg-gray-200"
      >
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">Movies</h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="relative">
                <button
                  onClick={() => setModal(true)}
                  className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 border-r-0 text-gray-700  px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-circle-plus"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="12" r="9" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                  </svg>
                </button>
              </div>
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Search"
                  onChange={handleSearch}
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        style={{ textAlign: "center" }}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        style={{ textAlign: "center" }}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        Added by
                      </th>
                      <th
                        style={{ textAlign: "center" }}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        Created at
                      </th>
                      <th
                        style={{ textAlign: "center" }}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        Reviews
                      </th>
                      <th
                        style={{ textAlign: "center" }}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        Remove movie
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMovies.map(movie => {
                      return (
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                {movie.url ? (
                                  <img
                                    className="w-full h-full rounded-full"
                                    src={movie.url}
                                    alt=""
                                  />
                                ) : (
                                  <svg
                                    className="w-full h-full rounded-full"
                                    width="44"
                                    height="44"
                                    viewBox="0 0 24 24"
                                    stroke="#cbd5e0"
                                    fill="none"
                                  >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <rect
                                      x="4"
                                      y="4"
                                      width="16"
                                      height="16"
                                      rx="2"
                                    />
                                    <line x1="8" y1="4" x2="8" y2="20" />
                                    <line x1="16" y1="4" x2="16" y2="20" />
                                    <line x1="4" y1="8" x2="8" y2="8" />
                                    <line x1="4" y1="16" x2="8" y2="16" />
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <line x1="16" y1="8" x2="20" y2="8" />
                                    <line x1="16" y1="16" x2="20" y2="16" />
                                  </svg>
                                )}
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {movie.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p
                              className="text-gray-900 whitespace-no-wrap"
                              style={{ textAlign: "center" }}
                            >
                              {movie.author}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p
                              className="text-gray-900 whitespace-no-wrap"
                              style={{ textAlign: "center" }}
                            >
                              {moment(movie.date).format("MMM[, ]DD YYYY")}
                            </p>
                          </td>
                          <td
                            className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                            style={{ textAlign: "center" }}
                          >
                            {movie.ratings.map(rating => {
                              return (
                                <>
                                  <span className="inline-block hover:bg-gray-400 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">
                                    {rating.author[0].toUpperCase() +
                                      rating.author.slice(1)}
                                  </span>
                                </>
                              );
                            })}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <svg
                              style={{
                                margin: "auto"
                              }}
                              onClick={async () =>
                                (await removeMovie(movie.id))
                                  ? alert("Movie removed successfully ")
                                  : alert("Error removing movie")
                              }
                              height="10pt"
                              viewBox="0 0 365.71733 365"
                              width="10pt"
                            >
                              <g fill="#f44336">
                                <path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0" />
                                <path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0" />
                              </g>
                            </svg>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>Admins only mate</h1>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://movie-apixd.herokuapp.com/`);
  const data = await res.json();
  return { props: { data } };
}
