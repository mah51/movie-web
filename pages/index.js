import Grid from '../components/grid';



export default function Home({author, data}) {
  return <Grid author={author} movieData={data.data}/>

}

export async function getServerSideProps() {
  const res = await fetch(`https://movie-apixd.herokuapp.com/`)
  const data = await res.json();
  return { props: {data}}
}

