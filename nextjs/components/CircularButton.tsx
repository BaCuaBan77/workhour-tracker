import React from 'react'
import styles from '@/styles/circularbutton.module.css' // Import the CSS module
interface CircularButtonProps {
  onClick: () => void
  text: string
}
const CircularButton: React.FC<CircularButtonProps> = ({ onClick, text }) => {
  return (
    <button className={styles.circularButton} onClick={onClick}>
      {text}
    </button>
  )
}

export default CircularButton
