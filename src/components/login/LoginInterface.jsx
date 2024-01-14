import ReCAPTCHA from 'react-google-recaptcha'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '../button/Button'
import styles from './login.module.scss'
import Link from 'next/link'

export default function LoginInterface({
  buttonText,
  isCodeSended,
  isHuman,
  isOpen,
  handleClickOpen,
  handleEnviar,
  handleKeyUp,
  handleCloseDialog,
  handleTengoCodigo,
  onChangeReCaptcha,
  phone,
  setIsCodeSended,
  setPhone,
}) {
  return (
    <div id={styles.LoginComponent}>
      <Button
        alt='Ingersar con número de teléfono'
        className={styles.playButton}
        color='blue'
        id='btnStart'
        onClick={handleClickOpen}
      >
        Play
      </Button>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={isOpen}
        onClose={handleCloseDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent>
          <DialogContentText>Ingresa a tu cuenta</DialogContentText>
          {/* Fields */}
          <div
            className={styles.flex}
            style={{ display: isCodeSended ? 'none' : 'flex' }}
          >
            <img
              height='42'
              width='40'
              className={styles.icon_colombia}
              src='/images/icons/colombia.png'
              alt=''
            />
            <span>(+57)</span>
            <TextField
              onKeyUp={e => setPhone(e.target.value)}
              margin='dense'
              id='phoneLogin'
              label='Número de celular'
              type='number'
              fullWidth
            />
          </div>
          {!isCodeSended && (
            <center className='m-t-10'>
              <ReCAPTCHA
                sitekey='6Ldyz98eAAAAAFCJEbBSdSRqNu4Kn1XqZugCi9Qg'
                onChange={onChangeReCaptcha}
              />
            </center>
          )}
          {isCodeSended && (
            <>
              <TextField
                autoComplete={false}
                type='number'
                disabled={buttonText == 'Validando...' ? true : false}
                onKeyUp={handleKeyUp}
                margin='dense'
                id='verificationCode'
                label={`Código de 4 dígitos`}
                fullWidth
              />
              <small>
                <a
                  href='https://api.whatsapp.com/send?phone=573054202450&text=Tengo problemas al recibir mi código de ingreso'
                  target='_BLANK'
                >
                  Tengo problemas al recibir mi código de ingreso
                </a>
              </small>
            </>
          )}
          <small className={styles.terminos_condiciones}>
            Al ingresar en Pikplay aceptas nuestros
            <Link href='/articulo/[id]' as='/articulo/terminos-y-condiciones'>
              <a>términos y condiciones</a>
            </Link>
            <br />
            Es posible que te enviemos notificaciones por SMS, que puedes
            desactivar cuando quieras.
          </small>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='normal'>
            Cancelar
          </Button>
          {!isCodeSended && (
            <Button
              onClick={isHuman ? handleTengoCodigo : null}
              color={isHuman ? 'yellow' : 'normal'}
            >
              Ya tengo código
            </Button>
          )}
          <Button
            color={isHuman ? 'blue' : 'normal'}
            onClick={!isCodeSended && isHuman ? handleEnviar : null}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
