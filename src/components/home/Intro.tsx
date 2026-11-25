import naruto from '../../assets/me.png'
import Profile from './Profile';
const Intro:React.FC = () => {
    return (
        <>
            <div className=" pt-18 flex gap-24 justify-center md:gap-8 lg:gap-24 flex-col sm:flex-row">
                <div className="flex flex-col rounded-3xl  w-full md:w-162 text-white h-auto py-6 sm:py-12 p-10  md:p-16 lg:px-24
                crossxy after:bg-gray-400 before:bg-gray-400
                          dark:after:bg-gray-300 dark:before:bg-gray-300
                          
                          
                ">
                    <h3 className='my-name mb-6 text-4xl md:text-5xl font-semibold text-green-500'>San Chanthai</h3>
                    <p className=" lg:text-xl mb-4 text-textColor">
                        Currently pursuing a Bachelor's degree in Computer Science (Software Engineering specialization). 
                        Experienced in full-stack web development. A team player at heart. 
                    </p>

                    <button className='  font-semibold self-start rounded-xl text-green-500'>My Resume →</button>
                </div>

                <Profile/>
            </div>
        </>

    )
}

export default Intro;