
import me from '../../assets/myface.jpg'
import CosmicImageFrame from '../public/OrbitSpinner';
const Profile:React.FC =()=>{
    return (
        <>
        <section className=" flex items-center justify-center">
            <CosmicImageFrame width={400} height={400}>
                <img src={me} alt="Me" className=" h-70 absolute "/>
            </CosmicImageFrame>
            
        </section>
        </>
    );
}

export default Profile;