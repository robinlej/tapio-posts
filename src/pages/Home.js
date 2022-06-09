import CardsGrid from '../components/CardsGrid'

const Home = ({ posts }) => {
  if (posts) {
    return (
      <main>
        <h1>Articles</h1>

        <CardsGrid articles={posts} />
      </main>
    )
  }
}

export default Home