import styles from './category.module.scss'
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core'
import { blue, green, red } from '@material-ui/core/colors'
import { getCategories } from '../../../lib/utils'
import { withStyles } from '@material-ui/core/styles'

const CategoryControl = ({ category, handleCategory }) => {
  const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Radio color='default' {...props} />)

  const BlueRadio = withStyles({
    root: {
      color: blue[400],
      '&$checked': {
        color: blue[600],
      },
    },
    checked: {},
  })(props => <Radio color='default' {...props} />)

  const RedRadio = withStyles({
    root: {
      color: red[400],
      '&$checked': {
        color: red[600],
      },
    },
    checked: {},
  })(props => <Radio color='default' {...props} />)

  return (
    <div className={styles.CategoryControl}>
      <FormLabel component='legend'>Categoria</FormLabel>
      <RadioGroup
        aria-label='category'
        name='category'
        value={category}
        onChange={handleCategory}
      >
        {getCategories().map(item => {
          switch (item.id) {
            case 2:
              return (
                <FormControlLabel
                  control={<RedRadio />}
                  label={item.name}
                  value={item.id}
                />
              )
            case 3:
              return (
                <FormControlLabel
                  control={<BlueRadio />}
                  label={item.name}
                  value={item.id}
                />
              )
            case 4:
              return (
                <FormControlLabel
                  control={<GreenRadio />}
                  label={item.name}
                  value={item.id}
                />
              )
            default:
              return (
                <FormControlLabel
                  control={<Radio />}
                  label={item.name}
                  value={item.id}
                />
              )
          }
        })}
      </RadioGroup>
    </div>
  )
}

export default CategoryControl
