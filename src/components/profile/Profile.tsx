
import me from '../../assets/myface.jpg'
import CosmicImageFrame from '../public/OrbitSpinner';
import ContributionGraph from './Contribute';
import RepoGrid from './ProjectGrid';
const Profile:React.FC =()=>{
    return (
        <>
        <section className=" flex  items-center justify-center my-56">

            <div className=' flex flex-col items-center'>

                <div>
                    <CosmicImageFrame borderRadius='40px' width={400} height={300}>
                        <img src={me} alt="Me" className=" h-70 absolute "/>
                    </CosmicImageFrame>

                </div>


                
                <div>
                    
                    <RepoGrid/>

                    <ContributionGraph/>
                </div>

            </div>

            
        </section>
        </>
    );
}

export default Profile;