import React, { useEffect, useState } from 'react'
import Button from '../../components/button/Button'
import Card from '../card/Card'
import ChangeSeller from './ChangeSeller'
import Link from 'next/link'
// import Notification from '../../components/notification'
import Router from 'next/router'
import moment from 'moment'
import styles from './styles.module.scss'
import {
  Box,
  Card as CardMat,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faRocket } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import {
  DELETE_FOLLOWINED_PUBLICATION,
  formatNumber,
  GET_FOLLOWED_PUBLICATIONS,
  GET_PUBLICATIONS,
} from '../../lib/utils'
import { toast } from 'react-toastify'
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client'
import { useSelector, useDispatch } from 'react-redux'

moment.locale('es')

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const CakeReport = ({ publications = [] }) => {
  const data = {
    labels: !publications ? [] : publications.map(item => item.title),
    datasets: [
      {
        label: '# of Votes',
        data: !publications ? [] : publications.map(item => item.views),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className={`${styles.report} m-20`}>
      <div className='Card main'>
        <div className={styles.graphic}>
          <Doughnut data={data} />
        </div>
        <table cellSpacing='0'>
          <tr>
            <td>Publicación</td>
            <td>Visualizaciones</td>
            {/* <td>Ciudades</td> */}
          </tr>
          {publications &&
            publications.map(item => {
              return (
                <tr>
                  <td>{item.title}</td>
                  <td>{item.views}</td>
                  <td>
                    <a
                      target='_BLANK'
                      className='a_whatsapp'
                      href='https://api.whatsapp.com/send?phone=573052665725&text=Quiero impulsar una publicación en Pikplay'
                    >
                      <Button color='blue'>
                        Impulsar&nbsp;
                        <FontAwesomeIcon icon={faRocket} />
                      </Button>
                    </a>
                  </td>
                  {/* <td>
                            Barranquilla
                            <br />
                            Medellín
                        </td> */}
                </tr>
              )
            })}
        </table>
      </div>
    </div>
  )
}

const Publicacion = ({ item, ind, getPublications }) => {
  const [changeSeller, setChangeSeller] = useState(false)
  const [showAdminOptions, setShowAdminOptions] = useState(false)
  const { is_admin } = useSelector(state => state.user)
  const seller_id = !!item?.user?.id ? item.user.id : 0
  const moreOptions = is_admin || true

  const changeSellerHandle = sellerUpdated => {
    item.user = sellerUpdated
  }

  const DELETE_PUBLICATION = gql`
    mutation deletePublication($id_publication: Int) {
      deletePublication(id_publication: $id_publication)
    }
  `

  const VERIFY_PUBLICATION = gql`
    query verifyPublication($id_publication: Int) {
      verifyPublication(id_publication: $id_publication)
    }
  `

  const UPDATE_MUTATION = gql`
    mutation ChangeStatePublication($id: Int!, $status: Boolean!) {
      changeStatePublication(id: $id, status: $status)
    }
  `

  const [changeStatePublication, { }] = useMutation(UPDATE_MUTATION)

  const handleChangeState = status => {
    changeStatePublication({
      variables: { id: item.id, status },
      fetchPolicy: 'no-cache',
    })
    setTimeout(() => {
      getPublications()
    }, 500)
  }

  const handleEdit = slug => {
    Router.push('/publicacion/' + slug + '/editar')
  }

  const [handleChangeApprove, { loading, error, data }] = useLazyQuery(
    VERIFY_PUBLICATION,
    {
      variables: { id_publication: item.id },
      fetchPolicy: 'no-cache',
      onCompleted: () => {
        setTimeout(() => {
          getPublications()
        }, 500)
      },
    },
  )

  const [handleDelete] = useMutation(DELETE_PUBLICATION, {
    variables: { id_publication: item.id },
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      setTimeout(() => {
        getPublications()
      }, 500)
    },
  })

  return (
    <li className={`${item.status ? '' : styles.disabled}`}>
      <div className={`Card ${styles['flex-table']}`}>
        <div className={styles.image_link}>
          <img alt='Imagen de articulo' src={item.image_link} />
        </div>
        <div className={styles['flex-row']} title={`ID: ${item.id}`}>
          {item.title}
        </div>
        <div className={styles['flex-row']}>
          ${formatNumber(item.sale_price)}
        </div>
        <div className={styles['flex-row']} title='Fecha de creación'>
          {moment(parseInt(item.created)).format('MMMM DD YYYY, h:mm:ss a')}
        </div>
        <div className={styles['flex-row']}>{item.views} visitas</div>
        <div className={styles['flex-row']}>
          {item.is_verified
            ? item.status
              ? 'Activa'
              : 'Pausada'
            : 'En revisión'}
        </div>
        <div className={`${styles['flex-row']} ${styles.actions}`}>
          {item.status && (
            <Link href='/publicacion/[id]' as={`/publicacion/${item.slug}`}>
              <a target='_BLANK'>
                <Button color='blue'>Ver</Button>
              </a>
            </Link>
          )}
          {!item.status && (
            <span className={styles.verPublicacion} onClick={() => { }}>
              <FontAwesomeIcon
                style={{ position: 'relative', left: '-5px', top: '2px' }}
                icon={faQuestionCircle}
                onClick={() => {
                  const message = (
                    <div>
                      <p className='m-0'>
                        Normalmente no es posible ir a la publicación cuando aún
                        esta siendo revisada por Pikplay o porque esta
                        desactivada
                      </p>
                    </div>
                  )
                  toast(message)
                }}
              />
              {/* No es posible ver la publicación */}
            </span>
          )}
          <Button onClick={() => handleEdit(item.slug)} color='yellow'>
            Editar
          </Button>
          <Button
            onClick={() =>
              item.is_verified ? handleChangeState(!item.status) : null
            }
            color={
              item.is_verified ? (item.status ? 'red' : 'green') : 'disabled'
            }
          >
            {item.status == true ? <>Desactivar</> : <>Activar</>}
          </Button>
          {!!is_admin && (
            <Button
              color='link'
              onClick={() => setShowAdminOptions(!showAdminOptions)}
            >
              Opciones
            </Button>
          )}
        </div>
      </div>
      {moreOptions && (
        <div className={styles.more_options}>
          {!item.is_verified && (
            <div className={styles.pending_aprove}>
              <p>Gracias por tu paciencia.</p>
              <p>
                Recibimos tu publicación. Debe de ser aprobada por uno de los
                moderadores de Pikplay para que puedan verla otras personas.
              </p>
            </div>
          )}

          {!!is_admin && showAdminOptions && (
            <div className={styles.adminActions}>
              <ChangeSeller
                changeSellerHandle={changeSellerHandle}
                user_id={seller_id}
                id_publication={item.id}
              />
              <Button
                disabled={item.is_verified}
                color='blue'
                onClick={handleChangeApprove}
              >
                Dar de alta
              </Button>
              <Button color='red' onClick={handleDelete}>
                Eliminar
              </Button>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

const Publicaciones = () => {
  const dispatch = useDispatch()
  const [tryAgain, setTryAgain] = useState(false)
  const { id: user_id, is_admin } = useSelector(state => state.user)
  const [followedPublications, setFollowedPublications] = useState([])

  const PUBLICATIONS_QUERY = gql`
    query Publications(
      $is_admin: Boolean
      $order: Boolean
      $title: String
      $user_id: Int
    ) {
      publications(
        is_admin: $is_admin
        is_verified: false
        limit: 20
        order: $order
        status: false
        title: $title
        user_id: $user_id
      ) {
        accept_changes
        created
        id
        is_verified
        image_link
        sale_price
        slug
        status
        title
        user {
          id
        }
        views
      }
    }
  `

  const [getFollowedPublications] = useLazyQuery(GET_FOLLOWED_PUBLICATIONS, {
    variables: { user: user_id },
    fetchPolicy: 'no-cache',
    onCompleted: ({ getFollowedPublications }) => {
      getFollowedPublications.status == 200 &&
        setFollowedPublications(getFollowedPublications.data)
    },
  })

  const [
    getPublications,
    { loading: loadingPublications, error, data: reqPublications },
  ] = useLazyQuery(PUBLICATIONS_QUERY, {
    variables: {
      is_admin: !!is_admin,
      user_id,
      order: true,
    },
    fetchPolicy: 'no-cache',
    onError: error => setTryAgain(true),
    onCompleted: () => setTryAgain(false),
  })

  useEffect(async () => {
    getPublications({ variables: { status: false } })
    getFollowedPublications()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [value, setValue] = React.useState(0)

  const [handleFavorite] = useMutation(DELETE_FOLLOWINED_PUBLICATION, {
    onCompleted: data => {
      toast(
        <p className='m-0'>
          Ya no te llegarán notificaciones sobre esta publicación
        </p>,
      )
      getFollowedPublications()
    },
  })

  return (
    <section className={`page ${styles.content}`}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          textColor='primary'
          style={{ background: 'white' }}
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          indicatorColor='primary'
        >
          <Tab label='Publicaciones' />
          <Tab label='Informe' />
          <Tab
            label={
              <span>
                Publicaciones que sigo &nbsp;
                <FontAwesomeIcon icon={faHeart} />
              </span>
            }
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0} className='m-20'>
        <div className={styles.controls}>
          <div className={styles.search}>
            <TextField
              fullWidth={true}
              id='box-search-text'
              label='Buscar publicación'
            />
          </div>
          <Button
            color='blue'
            onClick={() =>
              getPublications({
                variables: {
                  title: document.getElementById('box-search-text').value,
                },
              })
            }
          >
            Buscar
          </Button>
        </div>
        <center>
          {loadingPublications && <div>Cargando publicaciones...</div>}
          {tryAgain && !loadingPublications && (
            <Button color='normal' onClick={getPublications}>
              Intentar nuevamente
            </Button>
          )}
        </center>
        <ul className=''>
          {reqPublications?.publications &&
            reqPublications.publications.map((item, ind) => {
              return (
                <Publicacion
                  item={item}
                  ind={ind}
                  getPublications={getPublications}
                />
              )
            })}
        </ul>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <CakeReport {...{ publications: reqPublications?.publications }} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div className={styles.followedPublications}>
          {followedPublications &&
            followedPublications.map((item, ind) => {
              return (
                <Card
                  handleFavorite={handleFavorite}
                  icon_favorite={false}
                  {...item}
                  ind={ind}
                />
              )
            })}
        </div>
      </TabPanel>
    </section>
  )
}

export default Publicaciones
