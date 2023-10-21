import React from 'react'

function Card({dataPrediction}) {
  return (
    <div className='flex justify-start flex-col'>
        <div>Position : {dataPrediction.position}</div>
        <div>Points : {dataPrediction.points}</div>
    </div>  
  )
}

export default Card