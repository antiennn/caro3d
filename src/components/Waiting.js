import React, { useContext } from 'react'
import { FaHourglassHalf } from "react-icons/fa";
import { MyWaitingContext } from '../configs/MyContext';

export default function Waiting() {
  const [waiting,dispatchqwaiting] = useContext(MyWaitingContext);
  if(waiting){
    return (
      <div className='absolute flex justify-center items-center z-50 transform -translate-x-1/2 -translate-y-1/2  w-20 h-20 animate-hourglass'>
          <FaHourglassHalf color='orange' size={50} />
      </div>
    )
  }else{
    return (
      <></>
    )
  }
}
