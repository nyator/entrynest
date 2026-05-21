import Button from "../elements/button";
import { logoHeadLeft, to } from "../constants/assests";
import { logoHeadRight } from "../constants/assests";
import { shadowBox } from "../constants/styles";

import { LiaLaptopCodeSolid } from "react-icons/lia";
import { BsVectorPen, BsArrowUpRight } from "react-icons/bs";
import { MdOutlineAnalytics, MdTrackChanges } from "react-icons/md"; // Added for extra visual categories

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white font-sans antialiased selection:bg-primary selection:text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* 1. Explore Jobs Category (Modern Bento Grid Layout) */}
      <section className="mx-auto max-w-6xl pt-24 pb-16 text-center">
        <div className="space-y-4 max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#d946ef] to-[#af00ce]">
            Explore Job Categories
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg lg:text-xl font-light">
            Search through curated professional paths to find your absolute perfect match.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          {/* Card 1: Development */}
          <div className="group relative backdrop-blur-md bg-white/[0.03] border border-white/[0.08] hover:border-primary/50 p-6 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(175,0,206,0.15)]">
            <div>
              <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 w-fit mb-4 text-primary group-hover:scale-110 transition-transform">
                <LiaLaptopCodeSolid size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Development & IT</h3>
              <p className="text-neutral-400 text-sm font-light">Software engineering, DevOps, and cloud architecture.</p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-primary gap-1 group-hover:underline">
              Explore Roles <BsArrowUpRight size={12} />
            </div>
          </div>

          {/* Card 2: Finance */}
          <div className="group relative backdrop-blur-md bg-white/[0.03] border border-white/[0.08] hover:border-[#af00ce]/50 p-6 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(175,0,206,0.15)]">
            <div>
              <div className="rounded-xl bg-[#af00ce]/10 border border-[#af00ce]/20 p-3 w-fit mb-4 text-[#af00ce] group-hover:scale-110 transition-transform">
                <BsVectorPen size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Finance & Accounting</h3>
              <p className="text-neutral-400 text-sm font-light">Corporate financial management and market analysis.</p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-[#af00ce]/90 gap-1 group-hover:underline">
              Explore Roles <BsArrowUpRight size={12} />
            </div>
          </div>

          {/* Card 3: Design/Product (Added Element for balanced structural layout) */}
          <div className="group relative backdrop-blur-md bg-white/[0.03] border border-white/[0.08] hover:border-neutral-400/50 p-6 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1">
            <div>
              <div className="rounded-xl bg-neutral-800 border border-neutral-700 p-3 w-fit mb-4 text-white group-hover:scale-110 transition-transform">
                <MdTrackChanges size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Design & Creative</h3>
              <p className="text-neutral-400 text-sm font-light">UI/UX interface engineering, branding, and motion graphic design.</p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-neutral-300 gap-1 group-hover:underline">
              Explore Roles <BsArrowUpRight size={12} />
            </div>
          </div>

          {/* Card 4: Marketing (Added Element for balanced structural layout) */}
          <div className="group relative backdrop-blur-md bg-white/[0.03] border border-white/[0.08] hover:border-neutral-400/50 p-6 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1">
            <div>
              <div className="rounded-xl bg-neutral-800 border border-neutral-700 p-3 w-fit mb-4 text-white group-hover:scale-110 transition-transform">
                <MdOutlineAnalytics size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Marketing & Growth</h3>
              <p className="text-neutral-400 text-sm font-light">Data analytics, strategic growth engineering, and SEO.</p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-neutral-300 gap-1 group-hover:underline">
              Explore Roles <BsArrowUpRight size={12} />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Hero Action Section (Modernized High-Contrast Container) */}
      <section className="mx-auto max-w-5xl my-16 relative">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-primary to-[#6d0082] px-8 py-12 md:p-16 overflow-hidden rounded-3xl shadow-2xl border border-white/10">
          
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent)] pointer-events-none" />
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-xl z-10">
            <div className="flex gap-2 font-mono text-xs tracking-wider uppercase text-white/70 bg-white/10 px-3 py-1 rounded-full w-fit">
              <span>#internship</span>
              <span>•</span>
              <span>#mentorship</span>
              <span>•</span>
              <span>#entry-level</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
              Discover The Right Starting Point With “entrynest”
            </h2>
            
            <div className="gap-3 flex flex-row mt-4">
              <Button
                text="Find Jobs"
                className="border-none bg-white text-neutral-950 font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:bg-neutral-100"
                Link="/login"
              />
              <Button
                text="Learn More"
                className="border border-white/40 text-white backdrop-blur-sm bg-white/5 font-medium px-6 py-3 rounded-xl transition-all hover:bg-white/10"
                Link="/support"
              />
            </div>
          </div>

          {/* Modern absolute imagery framing */}
          <img
            src={logoHeadLeft}
            className="absolute bottom-[-20%] left-[-10%] size-56 opacity-20 pointer-events-none z-0 object-contain"
            alt=""
          />
          <img
            src={logoHeadRight}
            className="absolute top-[-20%] right-[-10%] hidden md:block size-72 opacity-20 pointer-events-none z-0 object-contain"
            alt=""
          />
        </div>
      </section>

      {/* 3. Pitch Sub-Header */}
      <section className="mx-auto max-w-5xl my-20 text-center">
        <div className="inline-block h-px w-24 bg-gradient-to-r from-transparent via-neutral-600 to-transparent mb-8" />
        <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
          Your Career, Your Future!
        </h2>
        <p className="text-neutral-400 mt-2 text-base sm:text-lg font-light">
          Explore production-grade opportunities designed explicitly to accelerate your trajectory.
        </p>
      </section>

      {/* 4. Split Recruitment CTA Section */}
      <section className="mx-auto max-w-5xl my-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Side: Modern Asymmetrical Text Block */}
        <div className="md:col-span-4 flex flex-col justify-center text-center md:text-left py-4">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Employers</span>
          <h2 className="text-3xl font-light text-neutral-300 mt-1 leading-none">Find Your</h2>
          <div className="inline-block my-2 bg-gradient-to-r from-primary to-[#af00ce] px-4 py-2 rounded-xl text-white font-extrabold text-4xl w-fit mx-auto md:mx-0 shadow-lg shadow-primary/10">
            Talents
          </div>
          <h2 className="text-3xl font-light text-neutral-300 leading-none">With Us</h2>
        </div>

        {/* Center Card: High-contrast Dark Container */}
        <div className="md:col-span-5 relative group overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/[0.08] p-8 md:p-10 rounded-3xl flex flex-col justify-between h-full shadow-xl">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Get The Right Candidate
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              Easily catalog engineering internships and targeted opportunities to attract top global tier talent instantly.
            </p>
          </div>
          <div className="mt-8">
            <Button
              text="Signup now"
              className="text-neutral-950 bg-white border-none font-semibold px-5 py-2.5 rounded-xl transition-all hover:bg-neutral-100"
              Link="/signup"
            />
          </div>
        </div>

        {/* Right Side: Framed Image asset */}
        <div className="md:col-span-3 hidden md:block h-full min-h-[240px] relative rounded-3xl overflow-hidden border border-white/[0.08] group">
          <img
            src={to}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100"
            alt="Talent illustration"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
        </div>

      </section>
    </div>
  );
};

export default LandingPage;
