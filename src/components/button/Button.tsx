import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Button as ButtonMat } from '@material-ui/core'
import styles from './button.module.scss'

interface ButtonProps {
  animation?: boolean
  children?: React.ReactNode
  className?: string
  color?: string
  databutton?: string
  disabled?: boolean
  id?: string
  isLink?: boolean
  onClick?: () => void
  outline?: boolean
  style?: React.CSSProperties
}

const Button = ({
  animation,
  border,
  children,
  className,
  color,
  databutton,
  disabled,
  isLink,
  id,
  onClick,
  outline,
  style,
}: ButtonProps) => {
  className = `${className} ${animation ? styles.animation : null}`

  return (
    <motion.button
      className={`
      ${styles.btn} 
      ${border ? styles.border : null}
      ${styles[color]}
      ${className}
      ${outline ? styles.outline : null}
      ${isLink ? styles.link : null}
    `}
      databutton={databutton}
      id={id}
      onClick={disabled ? null : onClick}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <ButtonMat>{children}</ButtonMat>
    </motion.button>
  )
}

export default Button
