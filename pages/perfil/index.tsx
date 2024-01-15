import Perfil from './Perfil'
import Layout from '../../src/components/layout/Layout'
import { gql, useMutation } from '@apollo/client'
import { subirImagen, validateLoginToken } from '../../src/lib/utils'
import { toast } from 'react-toastify'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const CHANGE_PROFILE = gql`
  mutation ChangeProfileData($input: UserInput) {
    changeProfileData(input: $input)
  }`

const Index = props => {
  const descripcion =
    'Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas e independientes de alta confiabilidad ofreciendo videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch con los mejores precios del mercado en Colombia'
  const image = ''
  const title = 'Pikplay | Perfil'
  const url = 'https://pikplay.co/perfil'
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const router = useRouter()
  const showSavedMessage = !!Object.keys(router.query).find(x => x == 'updated')
  const [changeProfileData, { data, error, loading }] =
    useMutation(CHANGE_PROFILE)
  const [userData, setUserData] = useState({
    ...user,
    // coins: context?.coins
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(true)
  const loadUserInformation = () => {
    const user = user
    delete user.login_code
    if (!user.name || !user.email || !user.picture) setIsProfileComplete(false)
    else setIsProfileComplete(true)
    setUserData(user)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // saving image in firebase
    let picture = document.getElementById('profileElement')
    if (picture.value) {
      picture = await subirImagen({
        tipoArchivo: 'profiles',
        idImageElement: 'profileElement',
      })
      picture = picture[0]
    } else picture = null

    let variables = { id: userData.id }
    if (user.city) variables.city = user.city
    if (userData.email) variables.email = userData.email
    if (userData.name) variables.name = userData.name
    if (userData.document_number)
      variables.document_number = userData.document_number
    if (picture) variables.picture = picture // Setting picture
    dispatch({
      type: 'CHANGE_PROPERTY',
      payload: {
        property: 'user',
        value: { ...userData, ...variables },
      },
    })
    changeProfileData({ variables: { input: variables } }) // Guardando en BD

    // Message to user
    setTimeout(() => {
      setIsSaving(false)
      toast('Perfil actualizado')
    }, 1000)
  }

  return (
    <Layout image={image} descripcion={descripcion} title={title} url={url}>
      <Perfil {...{ dispatch, userData, isSaving, handleSave, setUserData }} />
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const { token } = ctx.req.cookies
  const res = await validateLoginToken({ token })
  if (!res) {
    return {
      redirect: {
        destination: '/?action=not_authorized',
        permanent: false,
      },
    }
  }
  return { props: {} }
}

export default Index
