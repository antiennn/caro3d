import React, { useContext, useEffect, useState } from "react";
import { logo } from "../assets/img";
import { FaFacebook } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { VscSignOut } from "react-icons/vsc";
import { LoginSocialFacebook } from "reactjs-social-login";
import { useCookies } from "react-cookie";
import Profile from "./Profile";
import { MyStateContext } from "../configs/MyContext";
export default function Starter() {
  const [positionY, setPositionY] = useState(0);
  const [isAuthentication, setisAuthentication] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [avatar, setavatar] = useState()
  const [name, setname] = useState()
  const [state,dispatch] = useContext(MyStateContext)
  useEffect(() => {
    if (cookies.access_token) {
      setisAuthentication(true);
      setavatar(cookies.avatar)
      setname(cookies.name)
    }else{
      removeCookie(["access_token"])
      removeCookie(["avatar"])
      removeCookie(["name"])
    }
  }, [isAuthentication]);
  const handleLogOut = () =>{
    removeCookie(["access_token"])
    setisAuthentication(false)
    setavatar("")
    setname("")
  }
  const handlePlay = () =>{
    setPositionY((prevPositionY) => prevPositionY - 1000);
    dispatch({
      type:"playing",
      payload:"playing",
    })
  }
  return (
    <div style={{transform: `translateY(${positionY}px)`,transition: "transform 0.5s ease"}} className="absolute top-0 w-[100vw] h-[100vh] bg-[#28282870] z-50 flex justify-start items-center flex-col gap-10">
        <Profile avatar={avatar} name={name}/>
      <img src={logo} className="w-25 h-25" alt="loading..." />
      <div class="option flex justify-center gap-10">
        <div onClick={handlePlay} className="font-mono flex items-center gap-3 bg-[#fbe64c] px-5 py-3 text-black font-semibold rounded-lg cursor-pointer">
          <RiRobot2Line />
          Play with AI
        </div>
        <div className="font-mono flex items-center gap-3 bg-[#fbe64c] px-5 py-3 text-black font-semibold rounded-lg cursor-pointer">
          <TbWorld />
          Play Online
        </div>
      </div>
      {!isAuthentication ? (
        <LoginSocialFacebook
          appId="809240777919447"
          onResolve={(response) => {
            setCookie("access_token", response.data.accessToken);
            setCookie("avatar", response.data.picture.data.url);
            setCookie("name",response.data.name);
            setisAuthentication(true)
            console.log(response)
          }}
          onReject={(error) => {
            console.log(error);
            removeCookie(["access_token"]);
          }}
        >
          <div className="font-mono flex items-center gap-5 bg-[#7066db] px-5 py-3 font-semibold rounded-lg cursor-pointer">
            <FaFacebook />
            Log in with facebook
          </div>
        </LoginSocialFacebook>
      ) : (
        <div onClick={handleLogOut} className="font-mono flex items-center gap-5 bg-[#626263] px-5 py-3 font-semibold rounded-lg cursor-pointer">
          <VscSignOut />
          Log out
        </div>
      )}
    </div>
  );
}
