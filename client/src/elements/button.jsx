import React from 'react'

const Button = (props) => {
  return (
    <button className={`px-3 py-1 rounded-lg border-[1.5px] border-blue-500 text-blue-500  ${props.className}`}> 
      {props.text}
    </button>
  )
}

export default Button