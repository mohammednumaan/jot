import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="h-[45vh]">
      {/* this is the landing page's background oval element */}
      <div
        className="
            absolute top-0 left-0 w-full
            h-[60%]
            bg-gradient-to-br from-black from-20% via-[#1F122E] to-[#826684]                    
            rounded-b-[100%]
            z-[-1]
        "
      ></div>

      <div className="flex justify-between items-center">
        <h2>Jot.</h2>
        <div className="flex justify-center items-center">
          <Link to="/login">
            <button className="text-xs w-30 border-none">Login</button>
          </Link>
          <Link to="signup">
            <button className="text-xs w-20 border border-[#352745] shadow-2xl shadow-[#2D2D61]">
              Signup
            </button>
          </Link>
        </div>
      </div>

      {/* this is the landing page's hero section */}
      <div className="h-full text-[2vw] flex justify-center items-center flex-col gap-5">
        <div className="mt-[-5%]">
          <h2>
            create and share code, <br /> fast and simple.
          </h2>
          <p className="text-[#6D6FA6] text-sm">
            With Jot, you can create, search and share <br />
            code, notes and snippets.
          </p>
        </div>

        <div className="flex justify-center items-center gap-5">
          <Link to="/login">
            <button className="bg-white text-black text-xs w-30 flex justify-center items-center gap-2 shadow-2xl shadow-[#2D2D61]">
              Try it now
              <img
                src="/public/icons/chevron_right_black.svg"
                alt="chevron right"
              />
            </button>
          </Link>
          <Link className="flex justify-center items-center" to="/signup">
            <button className="text-xs w-30 border border-[#58489B] shadow-2xl shadow-[#2D2D61]">
              Register
            </button>
          </Link>
        </div>

        {/* this is the landing page's image */}
        <div className="absolute top-[42%]">
          <img width="850px" src="/public/images/sample.png"></img>
        </div>
      </div>
    </div>
  );
}
