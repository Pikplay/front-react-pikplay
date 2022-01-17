import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useRouter, withRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import rn from 'random-number'
import { slugify } from "../../lib/utils"
import { subirImagen } from '../../lib/utils'
import PublicationForminterface from './PublicationFormInterface'
import { useSelector } from "react-redux"

const QUERY_PUBLICATION = gql`
	query Publications($slug: String){
		publications(slug: $slug){
			accept_changues
			category
			description
			id
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
	mutation createPublication($input: PublicationInput){
		createPublication(input: $input)
	}
`

const PublicationForm = (props) => {
	const user = useSelector((state) => state.user)
	const isMobile = typeof window != "undefined" ? window.screen.width < 420 : false
	const router = useRouter()
	const [imageLoading, setImageLoading] = useState()
	const [dispatchCreate, { data: resCrePub, error: errCrePub, loading: loadingCrepub }] = useMutation(MUTATION_PUBLICATION);
	const [errors, setErrors] = useState()
	const screenWidth = typeof window != "undefined" ? screen.width : 0
	const slugPublication = router.query.id;
	const variables = slugPublication ? { slug: slugPublication } : {}
	const [publicationFormData, setPublicationFormData] = useState({})
	const { data: publicationEditData, errorPED, loading: loadingPED } = slugPublication ? useQuery(QUERY_PUBLICATION, { variables }) : {}
	const [time, setTime] = useState()
	const isEdit = props.router.query?.id ? true : false
	const [currentStep, setCurrentStep] = useState(1)
	let textButton = <>
		Siguiente
		<FontAwesomeIcon icon={faChevronRight} />
	</>
	if (currentStep == 4) textButton = <>
		Guardar
	</>

	useEffect(() => {
		if (publicationEditData?.publications) {
			setPublicationFormData(publicationEditData.publications[0])
			setTime(new Date)
		}
	}, [loadingPED])

	async function onChangeImage(idImageElement) {
		if (imageLoading) {
			alert("Espere que termine de cargar la imagen anterior")
			return
		}
		setImageLoading(true)
		let image = await subirImagen({ tipoArchivo: "publications", idImageElement, isEdit })
		let obj = { ...publicationFormData, [idImageElement]: image[1] }
		if (idImageElement == "image_1") obj.image_link = image[0] // Estableciendo miniatura
		setPublicationFormData(obj)
		setImageLoading(false)
	}

	function previusStep() {
		setCurrentStep(currentStep - 1)
	}

	function nextStep() {
		if (currentStep == 3) handleSubmit()
		else setCurrentStep(currentStep + 1)
	}

	function handleSubmit() {
		const validators = () => {
			if (!publicationFormData.title || !publicationFormData.description || !publicationFormData.quantity || !publicationFormData.category || !publicationFormData.image_link) {
				isMobile && alert("Por favor completa todos los campos de tu publicación")
				setErrors("Por favor completa todos los campos de tu publicación")
				return false
			}
			return true
		}

		const validateUser = () => {
			if (user.id == 0) {
				document.getElementById("btnStart").click()
				return false
			} else {
				return true
			}
		}

		if (!validators() || !validateUser()) return false // Validation
		const random_num = rn({ min: 0, max: 1000, integer: true })
		const slug_prepared = slugify(publicationFormData.title, 60)
		const slug = slug_prepared + "-" + random_num
		const phone = user.phone
		delete publicationFormData.__typename
		const variables = {
			input: {
				...publicationFormData,
				isEdit,
				phone,
				quantity: Number(publicationFormData.quantity),
				sale_price: Number(publicationFormData.sale_price),
				user: user.id
			}
		}
		if (!isEdit) variables.input.slug = slug
		dispatchCreate({
			variables
		})
		router.push("/publicaciones")
	}

	const handleRemoveImage = (item) => {
		const _publicationFormData = {
			...publicationFormData,
			[item]: null
		}
		setPublicationFormData(_publicationFormData)
	}

	return <PublicationForminterface {...{ currentStep, errors, handleRemoveImage, handleSubmit, imageLoading, isEdit, nextStep, onChangeImage, previusStep, publicationFormData, screenWidth, setPublicationFormData, textButton }} />
}

export default withRouter(PublicationForm)