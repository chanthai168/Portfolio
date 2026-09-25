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
const Home:React.FC = () => {
    return (
        <>

        <IceParticles
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
        />

        <div >
            <NavBar/>
        </div>
        <div className=" flex pt-24 sm:pt-12 justify-center relative ">
            <h1 className="my-name  md:block text-2xl text-green-500  absolute left-20 top-18">Junior</h1>
            <h1 className="text-[50px] sm:text-[160px] text-textColor text-center font-bold flex p-0">PORTFOLIO</h1>
        </div>
        <div className=" flex flex-col items-center text-xl relative  md:-top-8">
            <p>My <span className=" bg-gray-300 glass p-1 px-2 rounded-full">intention</span> is to build the Sofware </p>
            <p>that feel like a piece of the <span className=" bg-gray-300 glass p-1 px-2 rounded-full">future.</span></p>
        </div>
        
        <div className="p-4 md:px-15">
            <Intro/> 
        </div>

        <div className=" text-textColor flex flex-col gap-6 mt-32 mb-48">
            <h2 className=" text-center font-semibold  text-6xl">The agenda for today.</h2>
            <div className=" flex justify-center gap-6 ">
                <Link to="#" className=" text-lg">Project→</Link>
                <Link to="#" className=" text-lg">Tools→</Link>
                <Link to="#" className=" text-lg">Contact→</Link>
            </div>

        </div>

        <div>
            <ProjectSection/>
        </div>

        <div>
            <SkillsSection/>
        </div>

        <div>
            <Footer/>
        </div>

        <div>
            <TextureShaderBackground/>
        </div>
        
        </>

    )
}

export default Home;