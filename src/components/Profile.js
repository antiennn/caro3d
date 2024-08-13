import React from "react";
import { guest } from "../assets/img";
import { FaMedal } from "react-icons/fa";

export default function Profile({ avatar, rank, name }) {
  return (
    <div className="absolute top-0 -left-5 bg-[#fff] rounded-md w-80 h-20 overflow-visible flex flex-col justify-center items-center gap-2">
      <div className="w-24 h-24 absolute top-5 left-10 border-4 border-white rounded-md">
        <img className="h-full object-fill" src={avatar?avatar:guest} alt="None" />
      </div>
      <p className="text-black font-segoe font-semibold ml-24">
        {name ? name : "Guest"}
      </p>
      <div className="flex ml-25 gap-2 ml-24">
        <FaMedal color="black" />
        <p className="text-black font-mono text-lg">
          {rank ? rank : "Beginner"}
        </p>
      </div>
    </div>
  );
}
