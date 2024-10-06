import React, { useContext, useEffect, useRef, useState } from "react";
import { MyStateContext } from "../configs/MyContext";
import { FaSearch } from "react-icons/fa";
import { endpoint, matchApi } from "../configs/API";
import { useCookies } from "react-cookie";

export default function Loading() {
  const socket = useRef(null);
  const [positionY, setPositionY] = useState(0);
  const [state, dispatch] = useContext(MyStateContext);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [room, setroom] = useState();
  useEffect(() => {
    const gettemproom = async () => {
      if (state === "waiting") {
        try {
          let res = await matchApi().get(
            endpoint["find_match"](cookies.access_token)
          );
          setroom(res.data.id);
        } catch (error) {
          console.log(error);
        }
      }
    };
    gettemproom();
  }, [state]);
  useEffect(() => {
    if (room) {
      socket.current = new WebSocket(
        `ws://127.0.0.1:8001/ws/chat/${room}/?access_token=${encodeURIComponent(
          cookies.access_token
        )}`
      );
      socket.current.onmessage = function (e) {
        const data = JSON.parse(e.data);
        dispatch({ type: "playonline", payload: "playonline" });
        console.log(data);
      };
    }
  }, [room]);

  const handleCancel = () => {
    socket.current.close();
    setroom()
    dispatch({ type: "start", payload: "start" });
  };
  useEffect(()=>{
    if(state=="waiting"){
      setPositionY(0)
    }else{
      setPositionY(-1000)
    }
  },[state])

  return (
    <>
        <div style={{transform: `translateY(${positionY}px)`,transition: "transform 0.5s ease"}} className="absolute flex flex-col gap-20 justify-center items-center top-0 left-0 w-full h-full bg-black opacity-70 z-50">
          <FaSearch className="animate-circle" size={100} color="white" />
          <p className="text-5xl p-5 after:content-['.'] after:absolute after:ml-1 after:animate-dot-flash">
            Finding Opponent
          </p>
          <div
            onClick={handleCancel}
            className="px-5 py-2 bg-white text-gray-700 rounded-xl cursor-pointer"
          >
            Cancel
          </div>
        </div>
    </>
  );
}
