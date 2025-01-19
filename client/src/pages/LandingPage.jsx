import { Link } from "react-router";
import Button from "../elements/button";
import { logoHeadLeft } from "../constants/assests";
import { logoHeadRight } from "../constants/assests";



const LandingPage = () => {
  return (
    <div>
      <section className="relative flex flex-col justify-center items-center gap-3 bg-primary px-5 md:px-20 py-10 my-10 overflow-hidden -z-10">
        <div className="flex gap-[0.5px] font-thin text-clampDesc text-center text-gray flex-row z-50">
          <p>#internship</p>
          <p>#mentorship</p>
          <p>#entry level</p>
        </div>

        <div className="flex flex-col md:items-start items-center justify-start gap-3 z-50">
          <h1 className="text-clampHead font-bold text-white text-center md:text-left">
            Discover The Right Starting Point With “entrynest”
          </h1>
          <div className="gap-2 flex flex-row">
            <Link to="">
              <Button
                text="Find Jobs"
                className="border-primaryStroke bg-white text-primaryStroke"
              />
            </Link>
            <Link to="">
              <Button text="Learn More" className="border-white text-white" />
            </Link>
          </div>
        </div>
        <img
          src={logoHeadLeft}
          className="absolute bottom-0 left-0 size-80 z-0 object-fill"
        />
        <img
          src={logoHeadRight}
          className="absolute bottom-0 right-0 sm:visible invisible size-80 z-0  object-fill"
        />
      </section>

      
    </div>
  );
};

export default LandingPage;
