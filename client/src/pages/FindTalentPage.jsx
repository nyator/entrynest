import Button from "../elements/button";
import { logoHeadLeft, unh } from "../constants/assests";
import { logoHeadRight } from "../constants/assests";

const FindTalentPage = () => {
  return (
    <div>
      <section className="mx-auto my-20 w-5/6 ">
        <div className="flex flex-col text-center ">
          <h1 className="text-clampHead font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#af00ce]">
            Hire Smarter, Build Faster!
          </h1>
          <p className="text-clampHeadSm">
            Empower your business with exceptional interns and entry-level
            hires.
          </p>
        </div>
      </section>

      <section className="relative">
        <div className="flex flex-col justify-center items-center gap-3 bg-[#9B56E5]/30 px-5 md:px-20 py-10 my-20 overflow-hidden rounded-xl -z-10">
          <div className="flex gap-[0.5px] font-thin text-clampDesc text-center text-primaryStroke flex-row z-50">
            <p>#internship</p>
            <p>#mentorship</p>
            <p>#entry level</p>
          </div>

          <div className="flex flex-col md:items-start items-center justify-start gap-3">
            <h1 className="text-clampHead font-black leading-tight text-primaryStroke text-center md:text-left">
              Join us to scale and enhance student and graduate employability
            </h1>
            <div className="gap-2 flex flex-row z-50">
              <Button
                text="Join Us"
                className="border-primaryStroke bg-primary text-white"
                Link="/join_signup"
              />
              <Button
                text="Learn More"
                className="text-primaryStroke"
                Link="/support"
              />
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
        </div>
      </section>

      <section className="flex flex-col-reverse sm:flex-row-reverse gap-3 items-center justify-evenly my-20">
        <div>
          <h1 className="text-clampHeadXs font-medium">Find Your</h1>
          <h1 className="text-clampHeadXs font-medium bg-grayStroke border-black border-t-2 border-b-2 pl-2 text-white">
            Talents
          </h1>
          <h1 className="text-clampHeadXs font-medium">With Us</h1>
        </div>
        <div className="bg-mblack text-white p-10 rounded-xl">
          <h1 className="text-clampHeadSm font-medium">
            Get The Right Candidate
          </h1>
          <p className="">
            Easily post internships and jobs that attract top talent.
          </p>
          <Button
            text="Signup now"
            className="text-black bg-white border-none mt-2"
            Link="/join_signup"
          />
        </div>
        <img
          src={unh}
          className="size-56 object-cover rounded-xl bg-blend-luminosity"
        />
      </section>
    </div>
  );
};

export default FindTalentPage;
