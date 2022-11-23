import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

const About = () => (
    <>
        <div className="container mx-auto flex justify-between p-2 mt-8 mb-4">
            <h2 className="text-2xl">Home</h2>
            <button className="flex items-center p-2 px-4 bg-viol hover:contrast-150 text-white rounded-lg shadow">
                <FontAwesomeIcon icon={faGithub} color="#fff" className="pr-3" />
                <span>Open GitHub</span>
            </button>
        </div>
    </>
);

export default About;
