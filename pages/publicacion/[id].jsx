import Router from "next/router"
import date from "date-and-time"
import toastr from "toastr"
import CardDetalleProducto from "../../components/card/CardDetalleProducto"
import React from "react"
import Layout from "../../components/layout/Layout"
// import PuedeInteresarte from "../../components/puedeInteresarte/PuedeInteresarte"
import { getFeed, transformarFeed } from "../../lib/utils"
import ModalHablarVendedor from "./ModalHablarVendedor"
import { connect } from "react-redux"
class PublicacionPage extends React.Component {
  static async getInitialProps({ req, query }) {
    let slug = query.id
    let datosPublicacion = await getFeed({ slug })
    return { datosPublicacion: datosPublicacion[0] }
  }

  state = {
    modalHablarVendedor: false,
    labelPagar: "Hablar con el vendedor",
    cuponDigitado: "",
    loadingProductPage: false
  };

  onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleCupon = () => {
    this.setState({ logIngresarCupon: true });
  }

  handleValidarCupon = async () => {
    const cuponDigitado = this.state.cuponDigitado;
    const id_publicacion = this.props.datosPublicacion.id;
    const res = await instanciaFunc.validarCupon({
      id_publicacion,
      cuponDigitado,
    });
    if (!res.estado) {
      toastr.warning("No se pudo validar el cupón 😕");
      this.setState({ logIngresarCupon: false, cuponDigitado: "" });
    } else {
      const valorCupon = res.valor;
      toastr.info("Para tí el precio más bajo 😋");
      const nuevoPrecio = this.props.datosPublicacion.precio - valorCupon;
      this.setState({
        logIngresarCupon: false,
        nuevoPrecio,
        precio: nuevoPrecio,
      });
    }
  }

  handleHablarVendedor = () => {
    // context = this.context
    this.props.user.id != 0 ? this.setState({ modalHablarVendedor: true }) : document.querySelector("#btnStart").click()
  }

  mostrarAlerta(mensaje) {
    toastr.warning(mensaje);
    return false;
  }

  handleResponder = async () => {
    const data = {
      comentario: {
        descripcion: document.getElementById("comentarPublicacion").value,
        id_usuario: JSON.parse(localStorage.getItem("user")).email,
      },
      id_publicacion: this.props.datosPublicacion.id,
    };
    const res = await instanciaFunc.saveRespuesta(data);
    return;
  }

  validarAntesPagar() {
    let result = true;
    if (!this.state.talla && this.state.tallas)
      result = this.mostrarAlerta("Debes seleccionar una talla");
    if (!this.state.identificacion)
      result = this.mostrarAlerta("Debe ingresar su número de identificación");
    if (!this.state.direccion)
      result = this.mostrarAlerta("Debe ingresar su dirección");
    if (!this.state.ciudad || !this.state.pais)
      result = this.mostrarAlerta("Debe configurar su ubicación");
    return result;
  }

  configUbicacion() {
    localStorage.setItem("url_pendiente", window.location.pathname);
    Router.push("/ubicacion");
  }

  componentDidMount() {
    // if (!this.props?.datosPublicacion) Router.push("/404")
  }

  render() {
    const datosPublicacion = this.props?.datosPublicacion
    // if (!datosPublicacion) return <div>Redireccionando...</div>
    const { description, title, slug } = datosPublicacion
    const { pais, ciudad } = this.state

    return <Layout image={datosPublicacion.image_link} title={title} descripcion={description} url={slug}>
      <div className="_publicacion">
        <CardDetalleProducto {...{ handleHablarVendedor: this.handleHablarVendedor }} meta_url={slug} handleResponder={this.handleResponder} nuevoPrecio={this.state.nuevoPrecio} handleCupon={this.handleCupon} doc_id={datosPublicacion} logDetalle={true} {...datosPublicacion} />
        {
          // Modal para confirmar datos
          this.state.modalHablarVendedor && <ModalHablarVendedor {...{ datosPublicacion, setIsModalHablarVendedor: () => this.setState({ modalHablarVendedor: !this.state.modalHablarVendedor }) }} />
        }
        {
          // Modal para ingresar cupón
          // this.state.logIngresarCupon && (
          //   <div className="_modalIngresoInfo">
          //     <div className="background"></div>
          //     <div className="Card">
          //       <TextField
          //         value={this.state.cuponDigitado}
          //         name="cuponDigitado"
          //         fullWidth={true}
          //         onChange={this.onChange}
          //         label="Cupón"
          //         margin="normal"
          //         size={25}
          //       />

          //       <div className="actions">
          //         <Button onClick={() => this.setState({ logIngresarCupon: false })} className="yellow small m-l-10" text="Cancelar" />
          //         <Button onClick={this.handleValidarCupon} className="green small m-l-10" text="Validar cupón" />
          //       </div>
          //     </div>
          //   </div>
          // )
        }
      </div>
    </Layout>
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(PublicacionPage)
