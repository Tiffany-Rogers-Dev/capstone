import React from 'react'

function Cruise(props) {
    console.log("from each cruise", props)
  return (
    <div>{props.cruise.cruiseLine}</div>
  )
}

export default Cruise