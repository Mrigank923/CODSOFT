import { FaArrowRight, FaLocationDot, FaRegCircle, FaRegCircleCheck } from "react-icons/fa6"
import Footer from "../components/landingPage/Footer"
import Header from "../components/landingPage/Header"
import { FaSearch } from "react-icons/fa"
import Card from "../components/landingPage/Card"
import Card2 from "../components/landingPage/Card2"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { UserState } from "../store/features/auth/UserState"
import RoleSelection from "../components/profile/RoleSelection"
import CandidateDetails from "../components/profile/CandidateDetails"
import { RoleSelectionState, setIsOpen } from "../store/features/roleSelection/RoleSelectionSlice"
import { getStats, LandingPageState } from "../store/features/LandingPageSlice"
import { AppDispatch } from "../store/store"
import RecruiterDetails from "../components/profile/RecruiterDetails"

const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [selectedType , setSelectedType] = useState<string>('Full Time');
  const [viewAll , setViewAll] = useState<boolean>(false);
  const [isLocked , setIsLocked] = useState<boolean>(false);

  const handleSelectChange = (selected : string) => {
    setSelectedType(selected);
  }

  const isOpen = useSelector((state: { roleSelection : RoleSelectionState}) => state.roleSelection.isOpen);
  const isCandidateOpen = useSelector((state: { candidate : {isCandidateOpen : boolean}}) => state.candidate.isCandidateOpen);
  const isRecruiterOpen = useSelector((state: { recruiter : {isRecruiterOpen : boolean}}) => state.recruiter.isRecruiterOpen);
  const IsAuthenticated = useSelector((state: { user : UserState}) => state.user.isAuthenticated);
  const role = useSelector((state: { user : UserState}) => state.user.userData.role);
  const count = useSelector((state: { landingPage : LandingPageState}) => state.landingPage.count);


  useEffect(() => {
    setIsLocked(false);
    dispatch(getStats())
    if(IsAuthenticated && role ==='user'){
      dispatch(setIsOpen(true));
    }
  },[ IsAuthenticated , dispatch , role , navigate ]);

  useEffect(() => {
    if(isOpen || isCandidateOpen || isRecruiterOpen || isLocked){
      window.scrollTo(0,0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'
    }
  },[isOpen ,isCandidateOpen , isRecruiterOpen , isLocked])

  return (
    <div className="
        flex flex-col
        relative
        min-h-screen
      bg-[#E7EDF8]
      ">
      <Header />
      <main className="flex-grow">
        <section className="md:flex justify-between items-center gap-2 p-4 lg:p-16">
          <div className="md:max-w-[48vw] flex flex-col justify-center items-start gap-5">
            <h1 className="text-4xl lg:text-[3.1rem] font-semibold max-w-[80vw] lg:max-w-[33vw] lg:leading-[3.8rem] mt-10 lg:-mt-2">
              Find a Job With Your Interests and Abilities
            </h1>
            <h3 className="max-w-[92vw] font-semibold text-[1.1rem] lg:text-lg text-[#3D3D3D]">
              <p>Find jobs that match your interests with us.</p>
              <p>Workify provides a place to find your jobs</p>
            </h3>
            <form className="flex items-center py-2 border-2 border-[#3C74BB] pl-2 lg:pl-4 pr-2 gap-2 rounded-2xl" onSubmit={(e) => { e.preventDefault(); setIsLocked(true); }}>
              <div className="p-2 rounded-full bg-[#2B5A9E] text-white hover:opacity-80 cursor-pointer">
                <FaSearch type="submit" size={18} onClick={() => setIsLocked(true)}/>
              </div>
              <input
                type="text"
                maxLength={30}
                placeholder="Find job here"
                className="bg-transparent flex-grow max-w-[45vw] lg:max-w-[30vw] text-[1.1rem] lg:text-xl font-medium text-[#3D3D3D] placeholder:text-[#3D3D3D] outline-none"
              />
              <button className="flex items-center gap-1 text-[1.1rem] lg:text-xl bg-[#C8D8EF] font-medium text-[#3D3D3D] px-2 py-1 rounded-xl hover:opacity-90">
                <span><FaLocationDot size={16}/></span>Location
              </button>
            </form>
            <div className="text-[#474C54] font-medium text-[0.9rem]">
              <span className="text-[#9199A3]">Suggestion: </span>
              <span>Designer</span>,
              <span> Programming</span>,
              <span className="text-[#0A65CC]"> Digital Marketing</span>,
              <span> Video</span>,
              <span> Animation</span>.
            </div>
            <div className="flex justify-evenly lg:justify-between gap-2 lg:gap-3 items-center flex-wrap md:flex-nowrap">
              <button onClick={() => handleSelectChange('Full Time')} className="bg-[#C8D8EF] text-[#2B5A9E] text-sm lg:text-[1rem] font-medium p-2 md:px-3 md:py-2 rounded-xl flex gap-2 items-center">
                {selectedType === 'Full Time' ?
                  <FaRegCircleCheck  size={20} className="text-[#213E6B]"/> :
                  <FaRegCircle  size={20} className="text-[#213E6B]"/>
                }<span>Full Time</span>
              </button>
              <button onClick={() => handleSelectChange('Part Time')} className="bg-[#C8D8EF] text-[#2B5A9E] text-sm lg:text-[1rem] font-medium p-2 md:px-3 md:py-2 rounded-xl flex gap-2 items-center">
                {selectedType === 'Part Time' ?
                  <FaRegCircleCheck  size={20} className="text-[#213E6B]"/> :
                  <FaRegCircle  size={20} className="text-[#213E6B]"/>
                }<span>Part Time</span>
              </button>
              <button onClick={() => handleSelectChange('Remote')} className="bg-[#C8D8EF] text-[#2B5A9E] text-sm lg:text-[1rem] font-medium p-2 md:px-3 md:py-2 rounded-xl flex gap-2 items-center">
                {selectedType === 'Remote' ?
                  <FaRegCircleCheck  size={20} className="text-[#213E6B]"/> :
                  <FaRegCircle  size={20} className="text-[#213E6B]"/>
                }<span>Remote</span>
              </button>
            </div>
          </div>
          <div className="hidden md:block scale-110">
            <img src="/images/landing-page/photo.png" alt="Home image" loading="lazy" className="mx-3 min-h-[40vh] max-w-[40vw] lg:max-w-[43vw]"/>
          </div>
        </section>
        <section className="my-10">
            <div className="flex justify-center items-center gap-8 flex-wrap px-2">
            <Card imageURL="/images/landing-page/briefcase.svg" count={count.liveJobCount ? (count.liveJobCount+1790).toString() : '2324'} description="Live Job"/>
            <Card imageURL="/images/landing-page/company.svg" count={count.companiesCount ? (count.companiesCount+7600).toString() : '97354'} description="Companies"/>
            <Card imageURL="/images/landing-page/users.svg" count={count.candidatesCount ? (count.candidatesCount+7360).toString() : '3847154'} description="Candidates"/>
            <Card imageURL="/images/landing-page/briefcase.svg" count={count.newJobCount ? (count.newJobCount+3774).toString() : '7532'} description="New Jobs"/>
            </div>
          <div className="bg-white my-28 ">
            <div className="flex justify-between items-center px-6 lg:px-16 py-10">
              <div className="text-xl lg:text-[2.5rem] font-medium">
                Popular category
              </div>
              <button className="hidden lg:flex text-sm lg:text-[1rem] gap-2 text-[#2B5A9E] font-medium py-3 px-8 border border-[#C8D8EF] items-center hover:bg-[#fafafb]" onClick={() => setViewAll(prev => !prev)}>
                {viewAll ? 'View Less': 'View All'}<FaArrowRight size={20} className="font-[100] text-[#487ac1]"/>
              </button>
            </div>
            <div className="flex justify-evenly items-center px-3 lg:px-16 flex-wrap gap-3 lg:gap-10 pb-20 shadow-md transition duration-1000">
              <Card2 imageURL={'/images/landing-page/pen.png'} title={'Graphics & Design'} description=""/>
              <Card2 imageURL={'/images/landing-page/code.png'} title={'Code & Programing'} description=""/>
              <Card2 imageURL={'/images/landing-page/megaphone.png'} title={'Digital Marketing'} description=""/>
              <Card2 imageURL={'/images/landing-page/monitor.png'} title={'Video & Animation'} description=""/>
              {viewAll && <>
                <Card2 imageURL={'/images/landing-page/music.png'} title={'Music & Audio'} description="" className={'lg:flex hidden'}/>
                <Card2 imageURL={'/images/landing-page/chart-bar.png'} title={'Account & Finance'} description="" className={'lg:flex hidden'}/>
                <Card2 imageURL={'/images/landing-page/first-aid.png'} title={'Health & Care'} description="" className={'lg:flex hidden'}/>
                <Card2 imageURL={'/images/landing-page/database.png'} title={'Data & Science'} description="" className={'lg:flex hidden'}/>
              </>}
            </div>
          </div>
        </section>
        <section className="lg:flex items-center gap-10 justify-center w-full hidden">
          <img src="/images/landing-page/card4.png" alt="image" className="max-w-[43%] cursor-pointer transition hover:scale-105" onClick={() => navigate('/auth/register')}/>
          <img src="/images/landing-page/card5.png" alt="image" width={650} className="max-w-[45%] cursor-pointer transition hover:scale-105" onClick={() => navigate('/auth/register')}/>
        </section>
        <section className="py-16 lg:py-32 text-center px-10 -mt-16 lg:mt-0">
          <h6 className="text-xl lg:text-[2.5rem] font-medium ">Get ahead with <span className="text-[#2B5A9E]">Workify</span></h6>
          <p className="lg:font-medium text-[.7rem] lg:text-lg lg:max-w-[57vw] mx-auto my-2 lg:my-5 ">
            We&apos;re serving up trusted insights and anonymous conversion, so you&apos;ll have the have the goods you need to succeed
          </p>
        </section>
      </main>
      <Footer/>
      {(isOpen || isCandidateOpen || isRecruiterOpen || isLocked) &&
        <div className="absolute min-h-screen w-full flex justify-center items-center z-50 bg-neutral-800/80 ">
          {isOpen && <RoleSelection/>}
          {isCandidateOpen && <CandidateDetails/>}
          {isRecruiterOpen && <RecruiterDetails/>}
          {isLocked && <LockedPage/>}
        </div>
      }
      <Outlet/>
    </div>
  )
}

const LockedPage = () => {
  return (
    <div className="bg-white p-10 rounded-xl flex flex-col items-center gap-2">
      <h1 className="text-2xl font-medium">Finally Last step to have a job.</h1>
      <h1 className="text-xl text-black/80">Please Register to continue.</h1>
      <Link to={'/auth/register'} className="mt-4 text-xl hover:opacity-80 text-white font-semibold bg-[#2B5A9E] px-4 py-2 rounded-xl">Sign up</Link>
    </div>
  )
}

export default LandingPage