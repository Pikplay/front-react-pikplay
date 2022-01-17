import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import moment from "moment"
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import Button from '../button/Button'
import { useSelector } from "react-redux"

moment.locale('es')

const Transacciones = (props) => {
  const loggedUser = useSelector((state) => state.user)
  const [transactions, setTransactions] = useState([])
  // Mutation confirmar transacción
  const TRANSACTION_CONFIRMED = gql`
    mutation transactionConfirmed($id: Int, $publication: Int, $user_request: Int){
      transactionConfirmed(id: $id, publication: $publication, user_request: $user_request)
    }`
  const [transactionConfirmed, { }] = useMutation(TRANSACTION_CONFIRMED, {
    onCompleted() {
      getTransactions()
    }
  });
  // Mutation crear notificación
  const MUTATION_NOTIFICATION = gql`
    mutation createNotification($user: Int, $detail: String, $coins: Int){
        createNotification(user: $user, detail: $detail, coins: $coins)
    }`
  const [createNotification, { }] = useMutation(MUTATION_NOTIFICATION, {
    onCompleted() {
      // context.getNotifications()
    }
  });
  // Query transacciones
  const GET_TRANSACTIONS = gql`
    query getTransactions($user: Int){
      getTransactions(user: $user){
        created
        detail
        id
        p_title
        publication
        status
        type
        type
        u_name
        user
        user_to
      }
    }`
  const [getTransactions] = useLazyQuery(GET_TRANSACTIONS, { // Obteniendo notificaciones
    fetchPolicy: "no-cache",
    variables: {
      user: loggedUser.id
    },
    onCompleted: ({ getTransactions }) => {
      const _transactions = getTransactions && getTransactions.map(t => {
        if (t.type == "Compra" && t.user_to == user.id) {
          t.type = "Venta"
        }
        return t
      })
      setTransactions(_transactions)
    }
  })
  //

  useEffect(() => {
    getTransactions()
  }, [])

  const handlePagarTransaccion = (id) => {
    window.open("https://checkout.wompi.co/l/ZCdlVO")
    // pagar({ idTransaccion: id })
  }

  const handleConfirmarTransaccion = (id, publication) => {
    transactionConfirmed({ variables: { id, publication, user_request: loggedUser.id } });
  }

  return <section className={`${styles.Transactions}`}>
    <h2>Transacciones
      <FontAwesomeIcon class="svg-question" icon={faQuestionCircle} onClick={() => {
        const message = {
          id: 0, message: <div>
            <p>Bienvenido a tus transacciones</p>
            <p style={{ textAlign: "right" }}>Juntos somos mejor 🤝</p>
          </div>
        }
        props.dispatch({ type: "SET_MESSAGE", payload: { message } })
      }} />
    </h2>
    <ul>
      {transactions && transactions.map(({ created, detail, id, p_title, publication, status, type, u_name, user, user_to }) => <ol className="Card" style={{ display: "flex" }}>
        <div className={styles.id}>T#{id}</div>
        {
          user_to == loggedUser.id && <div className={styles.user}>
            {u_name} (Comprador)
          </div>
        }
        <div>
          {user_to == loggedUser.id ? 'Venta' : 'Compra'}
        </div>
        <div>
          {p_title}
          {detail}
        </div>
        <div>
          <div className={styles.status}>
            <b>Estado</b></div>
          {status == 0 && "En conversación"}
          {status == 1 && "Transacción realizada y confirmada"}
          {status == 2 && "Transacción cancelada"}
        </div>
        <div>
          <div>
            {moment(parseInt(created)).format("MMMM DD YYYY, h:mm:ss a")}
          </div>
        </div>
        <div className={styles.actions}>
          {
            user_to == loggedUser.id && status == 0 && <Button color="blue" onClick={() => handleConfirmarTransaccion(id, publication)}>Confirmar transacción</Button>
          }
          {/* {type == "Venta" && status == 0 && <button onClick={() => handleConfirmarTransaccion(id)} title="El cliente podrá pagar en linea">Habilitar pago en linea</button>} */}
          {/* {type == "Compra" && status == 0 && <button onClick={() => handlePagarTransaccion(id)}>Pagar</button>} */}
        </div>
      </ol>
      )}
    </ul>
  </section>
}

export default Transacciones
