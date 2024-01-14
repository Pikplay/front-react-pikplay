import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '../button/Button'
import moment from 'moment'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.scss'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export default function MyTable({ loggedUser, transactions }) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell align='right'>Publicación</TableCell>
            <TableCell align='right'>Vistas</TableCell>
            <TableCell align='right'>Estado</TableCell>
            <TableCell align='right'>Tipo transacción</TableCell>
            <TableCell align='right'>Otra información</TableCell>
            <TableCell align='right'>Fecha creación</TableCell>
            <TableCell align='right'>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions &&
            transactions.map(
              ({
                created,
                detail,
                id,
                p_image,
                p_title,
                publication,
                status,
                type,
                u_name,
                u_phone,
                user,
                user_to,
                slug,
              }) => (
                <TableRow key={id}>
                  <TableCell align='right'>
                    <img src={p_image} width={100} />
                  </TableCell>
                  <TableCell align='right'>
                    <small className='block'>#PIK{id}</small>
                    <Link href={`/publicacion/${slug}`}>{p_title}</Link>
                  </TableCell>
                  <TableCell align='right'>{publication}</TableCell>
                  <TableCell align='right'>
                    {status == 0 && (
                      <span>
                        <FontAwesomeIcon
                          className='m-r-10 primary-color'
                          icon={faUserFriends}
                        />
                        En conversación
                      </span>
                    )}
                    {status == 1 && (
                      <span>
                        <FontAwesomeIcon
                          className='m-r-10 primary-color'
                          icon={faCheck}
                        />
                        Transacción confirmada
                      </span>
                    )}
                    {status == 2 && 'Transacción cancelada'}
                  </TableCell>
                  <TableCell align='right'>
                    {user_to == loggedUser.id ? (
                      <span>Venta</span>
                    ) : (
                      <span>Compra</span>
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    {user_to == loggedUser.id && (
                      <p className={styles.customer_box}>
                        Cliente:
                        <br />
                        {u_name}
                        <br />
                        <a
                          href={`https://api.whatsapp.com/send?phone=${u_phone}`}
                          target='_BLANK'
                        >
                          <FontAwesomeIcon
                            className='p-r t-2'
                            icon={faWhatsapp}
                          />
                          &nbsp;Contactar cliente
                        </a>
                      </p>
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    {moment(parseInt(created)).format(
                      'MMMM DD YYYY, h:mm:ss a',
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    {user_to == loggedUser.id && (
                      <>
                        <Button
                          color='blue'
                          disabled={status != 0}
                          onClick={() =>
                            handleConfirmarTransaccion(id, publication)
                          }
                        >
                          Confirmar transacción
                        </Button>
                        <Button color='yellow'>Subir comprobante</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ),
            )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
