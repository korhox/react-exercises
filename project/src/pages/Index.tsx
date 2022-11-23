import BoardComponent from "../components/BoardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

const Index = () => (
    <>
        <div className="container mx-auto flex justify-between p-2 mt-8 mb-4">
            <h2 className="text-2xl">Home</h2>
            <button className="flex items-center p-2 px-4 bg-viol hover:contrast-150 text-white rounded-lg shadow">
                <FontAwesomeIcon icon={faPlus} color="#fff" className="pr-2" />
                <span>New Board</span>
            </button>
        </div>
        <div className="flex justify-center overflow-x-auto">
            <BoardComponent />
            <BoardComponent />
            <BoardComponent />
            <button className="bg-white/10 w-1/6 p-2 m-3 rounded-lg flex justify-center items-center shadow-md opacity-70 hover:opacity-100 transition-all ease-in-out duration-200">
                <FontAwesomeIcon icon={faPlus} size="6x" color="#00000088" />
            </button>
        </div>
    </>
);

export default Index;
