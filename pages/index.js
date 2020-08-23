import Grid from '../components/grid';

export default function Home({author, data}) {
  return <Grid author={author} movieData={data}/>
}

export async function getServerSideProps() {
  const res = await fetch(`https://movie-apixd.herokuapp.com/`)
  const unOrganised = await res.json();
  const data = unOrganised.data
  for (let i = 0; i < data.length; i += 1) {
    data[i].average = Math.round(data[i].ratings.map(rating => rating.rating).reduce((a,b) => a+b) / data[i].ratings.length * 10 ) / 10
  }
  data.sort((a, b) => a.average - b.average).reverse()
  return { props: {data}}
}

