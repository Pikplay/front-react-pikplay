import Button from "../button/Button"
import styles from "./styles.module.scss"
import { Chip, Dialog, DialogContent, TextField } from "@material-ui/core"
import { gql, useMutation, useQuery } from '@apollo/client'
import { interestsList } from './../../lib/utils'
import { useState } from "react"
import { toast } from "react-toastify"

const useField = ({ type }) => {
    const [value, setValue] = useState()

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type, value, onChange
    }
}

const MUTATION = gql`
	mutation createLead($email: String, $interests: String, $name: String, $phone: String){
		createLead(email: $email, interests: $interests, name: $name, phone: $phone)
	}
`

const ModalLead = () => {
    const [interests, setInterests] = useState(
        [...interestsList.map(item => ({ ...item, selected: false }))]
    )

    const [dispatch] = useMutation(MUTATION, {
        onCompleted: ({ createLead }) => {
            toast(createLead.message)
            setOpen(false)
        }
    })

    const name = useField({ type: "text" })
    const email = useField({ type: "text" })
    const phone = useField({ type: "text" })
    const handleClose = () => { setOpen(false) }
    const [open, setOpen] = useState(true)
    const handleInterests = (id) => {
        const _interests = [...interests]
        const state = _interests.find(item => item.id == id).selected
        _interests.find((item) => item.id == id).selected = !state
        setInterests(_interests)
    }

    const handleSubmit = () => {
        const _interests = interests.filter(item => item.selected == true).map(item => item.id).join(',')
        dispatch({
            variables: {
                email: email.value ? email.value : '',
                interests: _interests,
                name: name.value ? name.value : '',
                phone: phone.value ? phone.value : '',
            }
        })
    }

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
            <div className={`${styles.flex} flex`}>
                <div>
                    <h2>Bienvenido,
                        <small>
                            quisieramos conocerte mejor para darte una mejor experiencia 🤝
                        </small>
                    </h2>
                    <div>
                        <TextField {...name} fullWidth={true} label="Tú nombre o tú marca" margin="normal" />
                        <TextField {...email} fullWidth={true} label="Correo electrónico" margin="normal" />
                        <TextField {...phone} fullWidth={true} label="Número de contacto (celular)" margin="normal" />
                    </div>
                </div>
                <div>
                    <video autoplay controls={true} loop={true} style={{ borderRadius: "10px", marginTop: "20px" }} width="300">
                        <source src="/videos/No eres un comprador cualquiera, eres un comprador gamer.mp4" />
                    </video>
                </div>
            </div>
            <p className={styles.interets}>
                Ayúdanos a personalizar Pikplay para ti 😎 ¿Cuales son tus intereses?
                <div className={styles.content}>
                    {interests.map((item => {
                        return <Chip color={item.selected ? 'secondary' : ''} key={item.id} label={item.name} onClick={() => handleInterests(item.id)} />
                    }))}
                </div>
            </p>
            <div className={`${styles.actions} f-r m-b-10"`}>
                <Button color="link" onClick={handleClose}>Cancelar</Button>
                <Button color="blue" onClick={handleSubmit}>Enviar y continuar</Button>
            </div>
        </DialogContent>
    </Dialog>
}

export default ModalLead
