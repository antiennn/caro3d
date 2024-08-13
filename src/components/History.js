import React, { useContext, useEffect, useState } from "react";
import { SlFlag } from "react-icons/sl";
import { LiaHandshake } from "react-icons/lia";
import MyContext from "../configs/MyContext";

export default function History() {
  const [positionY, setPositionY] = useState(384);
  const [state,dispatch] = useContext(MyContext)
  useEffect(() => {
    if(state==="playing"){
      setPositionY(0);
    }
  }, [state]);
  return (
    <div style={{transform: `translateX(${positionY}px)`,transition: "transform 0.5s ease"}} className="absolute top-[5vh] right-5 w-[25vw] h-[30vh] bg-[#3c373791] rounded-md z-40">
      <header className="flex justify-start w-full gap-5 ml-5">
        <item className="flex items-center gap-1 cursor-pointer">
          <LiaHandshake size={20}/>
          <p className="text-lg">Suggest Draw</p>
        </item>
        <item className="flex items-center gap-1 cursor-pointer">
          <SlFlag size={20}/>
          <p className="text-lg">Surrender</p>
        </item>
      </header>
      <p className="text-xl font-bold">History</p>
    </div>
  );
}
