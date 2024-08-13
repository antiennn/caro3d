import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../configs/MyContext';

export default function Chat() {
  const [positionY, setPositionY] = useState(384);
  const [state,dispatch] = useContext(MyContext)
  useEffect(() => {
    if(state==="playing"){
      setPositionY(0);
    }
  }, [state]);
  return (
    <div style={{transform: `translateX(${positionY}px)`,transition: "transform 0.5s ease"}} className='absolute bottom-[5vh] right-5 w-[25vw] h-[50vh] bg-[#3c373791] rounded-md z-40'>
        <p className='text-2xl font-bold'>Chat</p>
    </div>
  )
}
