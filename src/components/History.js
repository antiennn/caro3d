import React, { useContext, useEffect, useRef, useState } from "react";
import { SlFlag } from "react-icons/sl";
import { LiaHandshake } from "react-icons/lia";
import { MyHistoryContext, MyStateContext } from "../configs/MyContext";

export default function History() {
  const [positionY, setPositionY] = useState(384);
  const [state, dispatch] = useContext(MyStateContext);
  const [history, dispatchHistory] = useContext(MyHistoryContext);
  const myRef = useRef(null);
  const idle = useRef(null);

  useEffect(() => {
    if (state === "playing") {
      setPositionY(0);
    }
  }, [state]);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollTo({
        top: myRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  return (
    <div
      style={{
        transform: `translateX(${positionY}px)`,
        transition: "transform 0.5s ease",
      }}
      className="absolute top-[10vh] right-5 w-[25vw] h-[30vh] bg-[#3c373791] rounded-md z-40"
    >
      <header className="flex justify-center w-full gap-5">
        <item className="flex items-center gap-1 cursor-pointer">
          <LiaHandshake size={20} />
          <p className="text-lg">Suggest Draw</p>
        </item>
        <item className="flex items-center gap-1 cursor-pointer">
          <SlFlag size={20} />
          <p className="text-lg">Surrender</p>
        </item>
      </header>
      <p className="text-xl font-bold">History</p>
      <div ref={state == "playing" ? myRef : idle} className="overflow-y-auto h-36 py-2">
        <div>
          {history.map((e, idx) => {
            return (
              <div key={idx} className="text-base w-full text-start ml-5">
                {e.date}: {e.content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
