import React from 'react'

const Button = (props) => {
  return (
    <button className={`px-3 py-1 rounded-lg border-[1.5px] border-primaryStroke ${props.className}`}> 
      {props.text}
    </button>
  )
}

export default Button