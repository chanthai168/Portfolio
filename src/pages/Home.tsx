import NavBar from "../components/public/NavBar";
import Intro from "../components/home/Intro";
import { Link } from "react-router-dom";
import ProjectSection from "../components/home/projectSection";
import Footer from "../components/home/Footer";
import SkillsSection from "../components/home/SkillSection";
import IceParticles from "../components/public/IceParticleV2";
import snowFlake from "../assets/snowFlake.png";

import ShaderBackground from "../components/shader/ShaderBackground";
import MouseInteractionMaskShaderBackground from "../components/shader/ColorMaskBGShader";
import TextureShaderBackground from "../components/shader/Texture2d";
import UnstoppableBackground from "../components/public/CicleBackground";
import OrbitSpinner from "../components/public/OrbitSpinner";
import Profile from "../components/profile/Profile";
import ProfileShowcase from "../components/profile/ProfileShowCase";
import SkillShowcase from "../components/skill/SkillShowcase";
const Home:React.FC = () => {
    return (
        <>

        {/* <IceParticles
        layer="background"
        spriteSrc={[snowFlake, snowFlake]}
        particleCount={10}
        scrollReactive
        scrollSensitivity={1}
        scrollDownBoosts        // scroll down → faster fall (default)
        maxScrollBoost={4}
        scrollDecay={0.40}      // longer tail; try 0.85 for snappier
        minSize={10}
        maxSize={20}
        /> */}

        <UnstoppableBackground/>
        

        <div >
            <NavBar/>
        </div>
        <div className=" flex pt-24 sm:pt-12 justify-center relative ">
            <h1 className="my-name sm:top-10 lg:block text-2xl text-green-500  absolute left-20 top-18">Junior</h1>
            <h1 className="text-[50px] sm:text-[100px] md:text-[130px] lg:text-[160px] text-textColor text-center font-bold flex p-0">MY PORTFOLIO</h1>
        </div>
        <div className=" flex text-textColor/70 flex-col items-center text-xl relative  md:-top-8">
            <p>My <span className=" bg-gray-300 glass p-1 px-2 rounded-full">intention</span> is to build the Sofware </p>
            <p>that feel like a piece of the <span className=" bg-gray-300 glass p-1 px-2 rounded-full">future.</span></p>
        </div>
        
        <div className="p-4 lg:px-15">
            <Intro/> 
        </div>
        
        <div className=" mt-24">
            <ProfileShowcase/>
        </div>

        

        <div className=" text-black/80 bg-layer1 flex flex-col gap-6 pt-32 pb-48">
            <h2 className=" text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-6xl">The agenda for today.</h2>
            <div className=" flex justify-center gap-6 ">
                <Link to="#" className=" text-lg">Project→</Link>
                <Link to="#" className=" text-lg">Tools→</Link>
                <Link to="#" className=" text-lg">Contact→</Link>
            </div>

        </div>




        <div>
            <ProjectSection/>
            <ProjectSection/>
        </div>

        <div>
            <SkillShowcase/>
        </div>
 

        {/* <div>
            <ShaderBackground/>
            <TextureShaderBackground/>
        </div> */}

        <div className=" mt-128">
            <Footer/>
        </div>
        </>

    )
}

export default Home;