import Grid from '../components/grid';



export default function Home({author, data}) {
  return <Grid author={author} movieData={data.data}/>

}

export async function getServerSideProps() {
  const res = await fetch(`http://127.0.0.1:8000/`)
  const data = await res.json();
  return { props: {data}}
}

