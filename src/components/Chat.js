import React, { useContext, useEffect, useRef, useState } from "react";
import { MyStateContext } from "../configs/MyContext";
import { getCurrentTime } from "../utils/constants";
import { IoSend } from "react-icons/io5";

export default function Chat() {
  const [positionY, setPositionY] = useState(384);
  const [state, dispatch] = useContext(MyStateContext);
  const [text, settext] = useState("");
  const [conversation, setconversation] = useState([]);

  const myRef = useRef(null);
  const idle = useRef(null);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollTo({
        top: myRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversation]);

  useEffect(() => {
    if (state === "playing") {
      setPositionY(0);
    }
  }, [state]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendmess()
    }
  };
  const sendmess = () =>{
    setconversation((prev) => [
      ...prev,
      { date: getCurrentTime(), content: text, isYou: true },
    ]);
    settext("");
  }
  return (
    <div
      style={{
        transform: `translateX(${positionY}px)`,
        transition: "transform 0.5s ease",
      }}
      className="absolute flex flex-col items-center gap-5 bottom-[5vh] right-5 w-[25vw] h-[50vh] bg-[#3c373791] rounded-md z-40"
    >
      <p className="text-2xl font-bold">Chat</p>
      <div
        ref={state == "playing" ? myRef : idle}
        className="w-11/12 h-60 text-white overflow-auto text-base px-5 text-left"
      >
        {conversation.map((c, idx) => {
          return (
            <div>
              <div>{c.date}:</div>
              <div className="ml-5">
                {c.isYou ? "You" : "Opponent"}: {c.content}
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative w-11/12">
        <input
          name="myInput"
          onKeyDown={handleKeyDown}
          onChange={(e) => settext(e.target.value)}
          value={text}
          className="w-full text-white p-3 text-sm rounded-2xl outline-none bg-[#a6a6a68c]"
        />
        <div onClick={sendmess} className="absolute top-2.5 right-2 cursor-pointer">
          <IoSend />
        </div>
      </div>
    </div>
  );
}
