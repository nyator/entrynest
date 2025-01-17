import { Link } from "react-router";
import Button from "../elements/button";


const LandingPage = () => {
  return (
    <div>
      <banner className="flex flex-col justify-start items-center gap-3 left-0 bg-primary px-32 pt-10 pb-28">
        <div className="flex gap-[0.5px] font-thin text-clampDesc text-center justify-start text-gray flex-col sm:flex-row">
          <p>#internship</p>
          <p>#mentorship</p>
          <p>#entry level</p>
        </div>

        <div className="flex flex-col justify-start gap-3">
          <h1 className="text-clampHead text-white">
            Discover The Right Starting Point With “entrynest”
          </h1>
          <div className="gap-2 flex flex-col sm:flex-row">
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
      </banner>
    </div>
  );
};

export default LandingPage;
