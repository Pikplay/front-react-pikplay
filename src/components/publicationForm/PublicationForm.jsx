import PublicationForminterface from './PublicationFormInterface'
import React, { useEffect, useState } from 'react'
import rn from 'random-number'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation, useQuery } from '@apollo/client'
import { slugify } from '../../lib/utils'
import { subirImagen } from '../../lib/utils'
import { useRouter, withRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const QUERY_PUBLICATION = gql`
  query Publications($is_edit: Boolean, $slug: String) {
    publications(is_edit: $is_edit, slug: $slug) {
      accept_changes
      category
      description
      id
      image_1
      image_2
      image_3
      image_4
      image_link
      is_new
      quantity
      sale_price
      title
      warranty
    }
  }
`

const MUTATION_PUBLICATION = gql`
  mutation createPublication($input: PublicationInput) {
    createPublication(input: $input)
  }
`

const PublicationForm = props => {
  const dispatch = useDispatch()
  const [imageLoading, setImageLoading] = useState()
  const isMobile =
    typeof window != 'undefined' ? window.screen.width < 420 : false
  const user = useSelector(state => state.user)
  const router = useRouter()
  const [dispatchCreate] = useMutation(MUTATION_PUBLICATION, {
    onCompleted: ({ createPublication }) => {
      if (createPublication == '401')
        toast('Se venció la sessión, ingresa nuevamente a tu cuenta')
      if (createPublication == '200') {
        toast(
          <span>
            <FontAwesomeIcon
              className='secunday-color m-r-10 p-r t-2'
              icon={faCheck}
            />
            Se guardo la publicación
          </span>,
        )
        dispatch({ type: 'PUBLICATION_FORM', payload: {} })
        setTimeout(() => {
          router.push('/publicaciones')
        }, 2000)
      }
    },
  })
  const screenWidth = typeof window != 'undefined' ? screen.width : 0
  const slugPublication = router.query.id
  const publicationFormSaved =
    useSelector(state => state.publication_form) || {}
  const [publicationFormData, setPublicationFormData] =
    useState(publicationFormSaved)
  const isEdit = props.router.query?.id ? true : false
  const variables = slugPublication
    ? { is_edit: true, slug: slugPublication }
    : {}
  const { data: publicationEditData } = slugPublication
    ? useQuery(QUERY_PUBLICATION, {
        fetchPolicy: 'no-cache',
        variables,
        onCompleted: data => {
          if (data.publications.length > 0) {
            setPublicationFormData(publicationEditData.publications[0])
            setTime(new Date())
          }
        },
      })
    : {}
  const [time, setTime] = useState()
  const [currentStep, setCurrentStep] = useState(1)
  let textButton = (
    <>
      Siguiente
      <FontAwesomeIcon icon={faChevronRight} />
    </>
  )
  if (currentStep == 4) textButton = <>Guardar</>

  async function onChangeImage(idImageElement) {
    if (imageLoading) {
      alert('Espere que termine de cargar la imagen anterior')
      return
    }
    setImageLoading(true)
    let image = await subirImagen({
      tipoArchivo: 'publications',
      idImageElement,
      isEdit,
    })
    let obj = { ...publicationFormData, [idImageElement]: image[1] }
    if (idImageElement == 'image_1') obj.image_link = image[0] // Estableciendo miniatura
    setPublicationFormData(obj)
    setImageLoading(false)
  }

  function previusStep() {
    setCurrentStep(currentStep - 1)
  }

  function nextStep() {
    if (currentStep == 4) handleSubmit()
    else setCurrentStep(currentStep + 1)
  }

  function handleSubmit() {
    const validators = () => {
      if (!publicationFormData.title) {
        toast('Añade un título a tu publicación')
        return false
      }
      return true
    }

    const validateUser = () => {
      if (user.id == 0) {
        document.getElementById('btnStart').click()
        return false
      } else {
        return true
      }
    }

    if (!validators() || !validateUser()) return false // Validation
    const random_num = rn({ min: 0, max: 1000, integer: true })
    const slug_prepared = slugify(publicationFormData.title, 60)
    const slug = slug_prepared + '-' + random_num
    const phone = user.phone
    if (publicationFormData?.__typename) delete publicationFormData.__typename
    const variables = {
      input: {
        ...publicationFormData,
        isEdit,
        phone,
        quantity: Number(publicationFormData.quantity),
        sale_price: Number(publicationFormData.sale_price),
        user: user.id,
      },
    }

    if (!isEdit) variables.input.slug = slug
    dispatchCreate({
      variables,
    })
  }

  const handleRemoveImage = item => {
    const _publicationFormData = {
      ...publicationFormData,
      [item]: '',
    }
    setPublicationFormData(_publicationFormData)
  }

  useEffect(() => {
    if (Object.keys(publicationFormData).length > 0) {
      dispatch({ type: 'PUBLICATION_FORM', payload: publicationFormData })
    }
  }, [publicationFormData])

  return (
    <PublicationForminterface
      {...{
        currentStep,
        handleRemoveImage,
        handleSubmit,
        imageLoading,
        isEdit,
        nextStep,
        onChangeImage,
        previusStep,
        publicationFormData,
        screenWidth,
        setPublicationFormData,
        textButton,
        setCurrentStep,
      }}
    />
  )
}

export default withRouter(PublicationForm)
