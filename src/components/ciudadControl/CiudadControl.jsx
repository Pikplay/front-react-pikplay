import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSelector, useDispatch } from 'react-redux'
import { getCiudades } from '../../lib/utils'

const CiudadControl = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const listadoCiudades = getCiudades()
  const defaultValue = user.city
    ? listadoCiudades.find(item => item.id === user.city)
    : listadoCiudades[0]
  const onInputChange = (event, value) => {
    dispatch({
      type: 'CHANGE_PROPERTY',
      payload: { property: 'user', value: { ...user, city: value.id } },
    })
  }

  return (
    <div className='contentCiudad'>
      <Autocomplete
        options={listadoCiudades}
        defaultValue={defaultValue}
        onChange={onInputChange}
        getOptionLabel={option => option.label && option.label}
        style={{ width: '100%' }}
        renderInput={params => (
          <TextField {...params} label='Ciudad en la que te encuentras' />
        )}
      />
    </div>
  )
}

export default CiudadControl
