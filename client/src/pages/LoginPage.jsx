import React from "react";
import { loginPhoto } from "../constants/assests";

import InputField from "../elements/inputField";

function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row w-full mt-10 bg-slate-500 justify-center items-center">
      <img src={loginPhoto} className="object-fill w-1/2 " />

      <div className="bg-white w-1/2">
        <div className="leading-tight justify-center text-center">
          <h1 className="font-bold text-clampHeadSm">LOGIN</h1>
          <p className="text-clampDesc">ENTER THE NEST</p>
        </div>
        <div>
          <div className="flex flex-col">
            <h1>Email</h1>
            <InputField
              placeholder="Type Email"
              onChange={handlePasswordChange}
            />
          </div>
          
          <div className="flex flex-col">
            <h1>Email</h1>
            <InputField
              placeholder="Type Email"
              onChange={handlePasswordChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
