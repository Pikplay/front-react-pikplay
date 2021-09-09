import Layout from "../../components/layout/Layout"

const Start = () => {
  const url = "https://pik-play.com/start"
  const meta_title = "Pik-Play"
  const descripcion = "Pik-Play es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas de venta de videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch de alto prestigio en Colombia"
  return <Layout meta_url={url} meta_descripcion={descripcion} meta_title={meta_title}>
    Bienvenido a Pik-Play
  </Layout>
}

export default Start