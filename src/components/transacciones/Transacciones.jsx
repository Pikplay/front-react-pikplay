import Button from '../button/Button'
import moment from 'moment'
import styles from './styles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MyTable from './Table'

moment.locale('es')

const Transacciones = props => {
  const loggedUser = useSelector(state => state.user)
  const [transactions, setTransactions] = useState([])
  // Mutation confirmar transacción
  const TRANSACTION_CONFIRMED = gql`
    mutation transactionConfirmed(
      $id: Int
      $publication: Int
      $user_request: Int
    ) {
      transactionConfirmed(
        id: $id
        publication: $publication
        user_request: $user_request
      )
    }
  `
  const [transactionConfirmed, {}] = useMutation(TRANSACTION_CONFIRMED, {
    onCompleted() {
      getTransactions()
    },
  })
  // Mutation crear notificación
  const MUTATION_NOTIFICATION = gql`
    mutation createNotification($user: Int, $detail: String, $coins: Int) {
      createNotification(user: $user, detail: $detail, coins: $coins)
    }
  `
  const [createNotification, {}] = useMutation(MUTATION_NOTIFICATION, {
    onCompleted() {
      // context.getNotifications()
    },
  })
  // Query transacciones
  const GET_TRANSACTIONS = gql`
    query getTransactions($user: Int) {
      getTransactions(user: $user) {
        created
        detail
        id
        p_image
        p_title
        publication
        status
        slug
        type
        type
        u_name
        u_phone
        user
        user_to
      }
    }
  `
  const [getTransactions] = useLazyQuery(GET_TRANSACTIONS, {
    // Obteniendo notificaciones
    fetchPolicy: 'no-cache',
    variables: {
      user: loggedUser.id,
    },
    onCompleted: ({ getTransactions }) => {
      const _transactions =
        getTransactions &&
        getTransactions.map(t => {
          if (t.type == 'Compra' && t.user_to == user.id) {
            t.type = 'Venta'
          }
          return t
        })
      setTransactions(_transactions)
    },
  })

  useEffect(() => {
    getTransactions()
  }, [])

  const handlePagarTransaccion = id => {
    window.open('https://checkout.wompi.co/l/ZCdlVO')
    // pagar({ idTransaccion: id })
  }

  const handleConfirmarTransaccion = (id, publication) => {
    transactionConfirmed({
      variables: { id, publication, user_request: loggedUser.id },
    })
  }

  return (
    <section className={`page ${styles.Transactions}`}>
      <h2 className='Card main'>
        Transacciones
        <FontAwesomeIcon
          class='svg-question'
          icon={faQuestionCircle}
          onClick={() => {
            const message = (
              <div className='m-0'>
                <p className='m-0'>
                  Bienvenido a tus <b>transacciones</b>
                </p>
                <p className='m-b-0'>Juntos somos mejor 🤝</p>
              </div>
            )
            toast(message)
          }}
        />
      </h2>

      <div className='content m-t-20'>
        <MyTable loggedUser={loggedUser} transactions={transactions} />
      </div>
    </section>
  )
}

export default Transacciones
