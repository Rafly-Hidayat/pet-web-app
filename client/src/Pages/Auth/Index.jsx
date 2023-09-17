import { useEffect, useState } from "react";
// import logo from "../../Assets/Image/logo.png";
import Login from "./Login";
import Signup from "./Signup";

export default function Index() {
  const [isSignUpPage, setIsSignUpPage] = useState(false);

  useEffect(() => {
    console.log(isSignUpPage, 'isSignUpPage isStatement')
  }, [isSignUpPage])

  return (
    <div className="bg-[#F6FFFD] w-full h-full flex justify-center items-center">
      <div className="w-[80%] flex flex-col items-center space-y-4">
        {/* <div className="flex space-x-4 items-center">
          <img src={logo} alt="Logo" className="w-10" />
        </div> */}
        <div className="text-center">
          <div className="text-2xl text-slate-700">Petwebcare</div>
          <div className="text-slate-700">
            Untuk Hewan Peliharan Anda
          </div>
        </div>

        {/* <img src={logo} alt="Logo" className="w-16" /> */}

        {
          isSignUpPage ? (
            <Signup onLogin={() => setIsSignUpPage(false)} />
          ) : (
            <Login onSignUp={() => setIsSignUpPage(true)} />
          )
        }

      </div>
    </div>
  );
}
