import naruto from '../../assets/narutov2.jpg'
const Intro:React.FC = () => {
    return (
        <>
            <div className=" flex justify-center gap-6 md:gap-24 flex-col sm:flex-row">
                <div className="flex flex-col  w-full md:w-162 text-white h-auto rounded-[160px] md:rounded-[200px] py-12 px-14 md:p-16 md:px-24
                glass
                ">
                    <h3 className='my-name mb-6 text-4xl md:text-5xl font-semibold text-green-500'>San Chanthai</h3>
                    <p className=" md:text-xl mb-4 text-textColor">
                        Currently pursuing a Bachelor's degree in Computer Science (Software Engineering specialization). 
                        Experienced in full-stack web development. A team player at heart. 
                        Passionate about drawing and frame-by-frame (FBF) animation.
                    </p>

                    <button className='  font-semibold self-start rounded-xl text-green-500'>My Resume →</button>
                </div>

                <div className=" flex justify-center items-center w-full md:w-140 bg-black/20 text-white h-100 rounded-[100px] ">
                    <img src={naruto} alt="" className='w-[80%] md:w-[60%] rounded-4xl' />
                </div>
            </div>
        </>

    )
}

export default Intro;