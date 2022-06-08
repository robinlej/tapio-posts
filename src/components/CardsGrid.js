import Card from "./Card"

const CardsGrid = ({ articles }) => {

  return(
    <section className='cards__grid'>

      {articles.map((article) => {
        return <Card key={article.id} article={article} />
      })}

    </section>
  )
}

export default CardsGrid