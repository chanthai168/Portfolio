import naruto from '../../assets/narutov2.jpg'
const Intro:React.FC = () => {
    return (
        <>
            <div className=" flex justify-center gap-6 md:gap-24 flex-col sm:flex-row">
                <div className="flex flex-col rounded-3xl  w-full md:w-162 text-white h-auto  py-12 px-14 md:p-16 md:px-24
                crossxy after:bg-gray-400 before:bg-gray-400
                          dark:after:bg-gray-300 dark:before:bg-gray-300
                ">
                    <h3 className='my-name mb-6 text-4xl md:text-5xl font-semibold text-green-500'>San Chanthai</h3>
                    <p className=" md:text-xl mb-4 text-textColor">
                        Currently pursuing a Bachelor's degree in Computer Science (Software Engineering specialization). 
                        Experienced in full-stack web development. A team player at heart. 
                        Passionate about drawing and frame-by-frame (FBF) animation.
                    </p>

                    <button className='  font-semibold self-start rounded-xl text-green-500'>My Resume →</button>
                </div>

                <div className=" flex justify-center rounded-3xl items-center w-full md:w-140 -bg-linear-90 from-blue-500 to-green-500 text-white h-100  ">
                    <img src={naruto} alt="" className='w-[80%] md:w-[60%] rounded-3xl' />
                </div>
            </div>
        </>

    )
}

export default Intro;