/* eslint-disable no-tabs */
import 'date-and-time/locale/es'
import VARS from './variables'
import date from 'date-and-time'
import fetch from 'node-fetch'
import rn from 'random-number'
import { connect, useDispatch } from 'react-redux'
import { gql } from '@apollo/client'
import { storage } from './storage'
import { datadogRum } from '@datadog/browser-rum'

date.locale('es')

// export default connect(null, useDispatch)(Functions)
const env = process.env.NODE_ENV
/* datadogRum.init({
  applicationId: 'e070617f-1352-46e4-9c21-4cb715efd297',
  clientToken: 'pubffdccfc89da2b7156acfb7c7e44e317f',
  site: 'datadoghq.com',
  service: 'pikplay',
  env,
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 50,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'allow'
})

datadogRum.startSessionReplayRecording() */

export const getNotifications = async props => {
  const { closed, user } = props
  const query = `query {
    getNotifications(user: ${user}, closed: ${closed}){
      closed
      coins
      created
      detail
      id
      type
      user
    }
  }`

  try {
    const res = await fetch(VARS.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Operation-Name': 'getNotifications',
      },
      body: JSON.stringify({ query }),
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log('Ha ocurrido un error en getNotifications', err)
  }
}

export const getHome = async props => {
  const { attempt = 1, seller = null, user_request = null } = props

  const getCache = () => {
    const withoutCache = !!slug || !!category || !!subcategory || !!title
    console.log('Sin cache: ', withoutCache)
    if (withoutCache) return 'no-cache'
    else return 'max-age=300000'
  }

  const query = `query {
      home (seller: ${seller}, user_request: ${user_request}){
        accept_changes
        apply_cashback
        banner_bottom
        banner_top
        category
        certificate
        city
        description
        following
        id
        image_1
        image_2
        image_3
        image_4
        image_5
        image_link
        is_new
        price
        quantity
        sale_price
        slug
        tags
        title
        user {
          apply_cashback
          certificate
          id
          name
          phone
          picture
        }
        views
        warranty
      }
    }`
  let data = []
  try {
    console.log('No entro por SSR')
    const res = await fetch(VARS.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': getCache(),
        fetchPolicy: 'cache-first',
        'Operation-Name': 'home',
      },
      body: JSON.stringify({ query }),
    })
    const _data = await res.json()
    data = _data?.data?.home
  } catch (err) {
    console.log('Error in fetch. Operation name: home, try number: #', attempt)
    console.log(err)
    props = { ...props, attempt: 2 }
    if (attempt === 1) getFeed(props)
  }
  return data
}

export const getFeed = async props => {
  const {
    attempt = 1,
    category = null,
    city = '',
    isSSR = false,
    is_verified = true,
    limit = 12,
    origin,
    seller = null,
    slug = '',
    status = true,
    subcategory = null,
    title = '',
    user_request = 0,
  } = props
  const getCache = () => {
    const withoutCache = !!slug || !!category || !!subcategory || !!title
    console.log('Sin cache: ', withoutCache)
    if (withoutCache) return 'no-cache'
    else return 'max-age=300000'
  }

  const query = `query {
      publications(
        category: ${category}, 
        city: "${city}",
        is_verified: ${is_verified},
        limit: ${limit}, 
        seller: ${seller},
        slug: "${slug}",
        status: ${status},
        subcategory: ${subcategory},
        title: "${title}",
        user_request: ${user_request}
      ) {
        accept_changes
        apply_cashback
        banner_bottom
        banner_top
        category
        certificate
        city
        description
        id
        image_1
        image_2
        image_3
        image_4
        image_5
        image_link
        is_new
        price
        quantity
        sale_price
        slug
        tags
        title
        user {
          apply_cashback
          certificate
          id
          name
          phone
          picture
        }
        views
        warranty
      }
    }`
  let data = []
  try {
    if (isSSR && false) {
      console.log('Entro por SSR')
      // Haciendo fetch al JSON cacheado de productos
      const url = VARS.API_URL + '/products'
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      data = await res.json()
    } else {
      console.log('No entro por SSR')
      const res = await fetch(VARS.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': getCache(),
          fetchPolicy: 'cache-first',
          'Operation-Name': 'publications',
        },
        body: JSON.stringify({ query }),
      })
      const _data = await res.json()
      data = _data?.data?.publications
    }
  } catch (err) {
    console.log('Ha ocurrido un error, intento #', attempt)
    console.log(err)
    props = { ...props, attempt: 2 }
    if (attempt == 1) getFeed(props)
  }
  return data
}

export const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const subirImagen = ({ tipoArchivo, idImageElement }) =>
  new Promise(async (resolve, reject) => {
    const arrayURLS = []
    // const $imagenes = document.getElementById("subir_imagen");
    const $imagenes = document.getElementById(idImageElement)
    Array.from($imagenes.files).forEach(file => {
      const d = new Date()
      const datestring =
        d.getDate() +
        '_' +
        (d.getMonth() + 1) +
        '_' +
        d.getFullYear() +
        '_' +
        d.getHours() +
        '_' +
        d.getMinutes() +
        '_' +
        d.getSeconds()
      const random = rn({ min: 0, max: 100, integer: true })
      const nombre_archivo = `${datestring}_${random}`
      let ubicacionGuardar = storage.ref(
        '/images/' + tipoArchivo + '/' + nombre_archivo + '.jpg',
      )
      const uploadTask = ubicacionGuardar.put(file)
      uploadTask.on(
        'state_changed',
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          if (document.querySelector('#progressUploadImage')) {
            document.querySelector('#progressUploadImage').innerHTML =
              progress + '%'
          }
          console.log('Upload is ' + progress + '% done')
        },
        function (err) {
          reject(err)
        },
        async function (snapshot) {
          const getIURL = async () => {
            console.log('entro en getIURL')
            try {
              return [
                await ref_thumbnail.getDownloadURL(),
                await ref_full.getDownloadURL(),
              ]
            } catch (err) {
              return null
            }
          }

          let url_thumbnail
          let url_full = null
          const ref_thumbnail = storage.ref(
            '/images/' + tipoArchivo + '/' + nombre_archivo + '_320x320.jpg',
          )
          const ref_full = storage.ref(
            '/images/' + tipoArchivo + '/' + nombre_archivo + '_1080x1080.jpg',
          )
          const myInterval = setInterval(async () => {
            const images = await getIURL(ref_thumbnail, ref_full)
            if (images) {
              console.log('entro e imagenes')
              clearInterval(myInterval)
              url_thumbnail = images[0]
              url_full = images[1]
              arrayURLS.push(url_thumbnail)
              arrayURLS.push(url_full)
              // if (arrayURLS.length == $imagenes.files.length)
              resolve(arrayURLS)
              return arrayURLS
            } else {
              console.log('entro y no imagenes')
            }
          }, 2000)
          /*const file_name = uploadTask.snapshot.ref.name
      // uploadTask.snapshot.ref*/
        },
      )
    })
  })

export const loadAudio = function (fuente) {
  // const fuente = "/audios/noti.mp3"
  // const sonido = document.querySelector("audio")
  // sonido.src = fuente
  // sonido.volume = 0.2
  // sonido.play()
}

export function getPaises() {
  return [
    { id: 'colombia', nombre: 'Colombia' },
    { id: 'mexico', nombre: 'México' },
    { id: 'argentina', nombre: 'Argentina' },
    { id: 'españa', nombre: 'España' },
    { id: 'salvador', nombre: 'Salvador' },
  ]
}

export function getCiudades() {
  // Los paises que se coloquen en el campo ID deben ser separados por -
  return [
    { pais: '', id: 'all', label: 'Cualquier lugar' },
    { pais: 'colombia', id: 'bogota', label: 'Bogotá' },
    { pais: 'colombia', id: 'medellin', label: 'Medellín' },
    { pais: 'colombia', id: 'pereira', label: 'Pereira' },
    { pais: 'colombia', id: 'cartagena', label: 'Cartagena' },
    { pais: 'colombia', id: 'barranquilla', label: 'Barranquilla' },
    { pais: 'colombia', id: 'cali', label: 'Cali' },
    { pais: 'mexico', id: 'ciudad-mexico', label: 'Ciudad de México' },
    { pais: 'mexico', id: 'guadalajara', label: 'Guadalajara' },
    { pais: 'mexico', id: 'puebla-zaragoza', label: 'Puebla de Zaragoza' },
    { pais: 'mexico', id: 'ecatepec', label: 'Ecatepec' },
    { pais: 'mexico', id: 'tijuana', label: 'Tijuana' },
    { pais: 'argentina', id: 'buenos_aires', label: 'Buenos Aires' },
    { pais: 'españa', id: 'madrid', label: 'Madrid' },
    { pais: 'salvador', id: 'san_salvador', label: 'San Salvador' },
    { pais: 'chile', id: 'santiago-chile', label: 'Santiago de Chile' },
  ]
}

export function shuffle(array) {
  // Ordenar aleatoriamente un array
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export function getScreenOrientation(setOrientation) {
  function handleOrientationChange(event) {
    const { matches, media } = event;
    if (matches) {
      setOrientation(media);
    }
  }

  const mediaQueryPortrait = window.matchMedia('(orientation: portrait)');
  const mediaQueryLandscape = window.matchMedia('(orientation: landscape)');

  if (mediaQueryPortrait.matches) {
    setOrientation('portrait');
  } else if (mediaQueryLandscape.matches) {
    setOrientation('landscape');
  }

  mediaQueryPortrait.addListener(handleOrientationChange);
  mediaQueryLandscape.addListener(handleOrientationChange);

  return () => {
    mediaQueryPortrait.removeListener(handleOrientationChange);
    mediaQueryLandscape.removeListener(handleOrientationChange);
  };

}

export function formatNumber(input) {
  input = String(input)
  let num = input.replace(/\./g, '')
  if (!isNaN(num)) {
    num = num
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/(?=\d*\.?)(\d{3})/g, '$1.')
    num = num.split('').reverse().join('').replace(/^[\.]/, '')
    input = num
  } else {
    input = input.replace(/[^\d\.]*/g, '')
  }
  return input
}

export function slugify(string, lenght) {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  const cadena = string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
  return lenght ? cadena.substring(0, lenght) : cadena
}

export function checkIsMobile(userAgent) {
  var ua = userAgent.toLowerCase()
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      ua,
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      ua.substr(0, 4),
    )
  )
}

export const GET_CHALLENGES = gql`
  query getChallenges {
    getChallenges {
      currentPoints
      deadLine
      description
      finished
      id
      image
      prizeCoins
      targetPoints
      title
    }
  }
`

export const GET_ARTICLES = gql`
  query getArticles($id: Int, $limit: Int, $slug: String) {
    getArticles(id: $id, limit: $limit, slug: $slug) {
      content
      mobile_content
      id
      image_card
      slug
      summary
      title
    }
  }
`

export function getCategories(id) {
  const categories = [
    { id: 1, name: 'Accesorios', image: '/images/icons/accesorios.svg' },
    { id: 2, name: 'Nintendo Switch', image: '/images/icons/nintendo.svg' },
    { id: 3, name: 'Playstation', image: '/images/icons/play.svg' },
    { id: 4, name: 'Xbox', image: '/images/icons/xbox.svg' },
    { id: 5, name: 'Otros', image: '/images/icons/otros1.svg' },
    { id: 6, name: 'PC Gamer', image: '/images/icons/desktop.svg' },
  ]
  if (id) return categories.find(item => item.id == id)
  return categories
}

export function getSubcategories(id) {
  const subcategories = [
    {
      id: 1,
      name: 'Membresias Nintendo Switch',
      url: '/subcategoria/membresias-nintendo-switch',
    },
    {
      id: 2,
      name: 'Membresias Playstation',
      url: '/subcategoria/membresias-playstation',
    },
    { id: 3, name: 'Promociones', url: '/subcategoria/promociones' },
    { id: 4, name: 'Juegos Clasicos', url: '/subcategoria/juegos-clasicos' },
    { id: 5, name: 'Combos', url: '/subcategoria/combos' },
    { id: 6, name: 'Sorteos', url: '/subcategoria/sorteos' },
  ]
  if (id) return subcategories.find(item => item.id == id)
  return subcategories
}

export const CREATE_COIN = gql`
  mutation createCoin($id: Int) {
    createCoin(id: $id)
  }
`

export const CREATE_FAVORITE = gql`
  mutation createFavorite($publication: Int, $user: Int) {
    createFavorite(publication: $publication, user: $user)
  }
`

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id: Int, $userId: Int) {
    deleteNotification(id: $id, userId: $userId)
  }
`

export const DELETE_FOLLOWINED_PUBLICATION = gql`
  mutation deleteFollowinedPublication($publication: Int, $user: Int) {
    deleteFollowinedPublication(publication: $publication, user: $user)
  }
`

export const GET_NOTIFICATIONS = gql`
  query getNotifications($user: Int, $closed: String) {
    getNotifications(user: $user, closed: $closed) {
      closed
      coins
      created
      detail
      id
      link
      type
      user
    }
  }
`

export const VALIDATE_COUPON = gql`
  mutation validateCoupon($coupon: String, $publication: Int, $user: Int) {
    validateCoupon(coupon: $coupon, publication: $publication, user: $user)
  }
`

export const GET_CLAIMED_COUPONS = gql`
  query getClaimedCoupons($coupon: String, $publication: Int, $user: Int) {
    getClaimedCoupons(coupon: $coupon, publication: $publication, user: $user) {
      coins
      coupon
    }
  }
`

export const validateLoginToken = async ({ token }) => {
  // const validUser = await fetch(process.env.API_URL, {
  //   method: "POST",
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: `{
  //       validateLoginToken(token: "${token}")
  //     }`
  //   })
  // })

  // const { data } = await validUser.json()
  // return data?.validateLoginToken
  return true
}

export const GET_FOLLOWED_PUBLICATIONS = gql`
  query getFollowedPublications($user: Int) {
    getFollowedPublications(user: $user)
  }
`

const slug = null,
  category = null,
  subcategory = null,
  title = null,
  status = true
export const GET_PUBLICATIONS = gql`
  query publications(
    $status: Boolean
    $slug: String
    $category: Int
    $subcategory: Int
    $title: String
  ) {
    publications(
      status: $status
      slug: $slug
      category: $category
      subcategory: $subcategory
      title: $title
    ) {
      accept_changes
      apply_cashback
      banner_bottom
      banner_top
      category
      certificate
      description
      following
      id
      image_1
      image_2
      image_3
      image_4
      image_5
      image_link
      is_new
      price
      quantity
      sale_price
      slug
      tags
      title
      user
      user_name
      user_phone
      user_picture
      user_transactions
      views
      warranty
    }
  }
`

export const notifierOptions = {
  labels: {
    success: '',
  },
}

export const interestsList = [
  { name: 'Nintendo Switch', id: 1 },
  { name: 'PC', id: 2 },
  { name: 'Playstation', id: 3 },
  { name: 'XBOX', id: 4 },
  { name: 'Comprar', id: 5 },
  { name: 'Vender', id: 6 },
  { name: 'Truques', id: 7 },
]

export const versions = ['1.1.1']

export const animatePrince = (HTMLElement, targetNumber, fromNumber) => {
  var target = parseFloat(fromNumber);
  var number = targetNumber // parseFloat(HTMLElement.value);
  console.log(number + "  " + target + " " + (number > target));
  if (number > target) { // Aumentando
    var interval = setInterval(function () {
      HTMLElement.innerHTML = target
      if (number <= target) clearInterval(interval)
      target = Number(target + 1)
    }, 100);
  } else { // Disminuyendo
    var interval = setInterval(function () {
      HTMLElement.innerHTML = target
      if (number >= target) clearInterval(interval)
      target = Number(target - 1)
    }, 80)
  }
}