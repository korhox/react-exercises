import Board from "../components/Board";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

const Index = () => (
    <>
        <div className="container mx-auto flex justify-between p-2 mt-8 mb-4">
            <h2 className="text-2xl">Home</h2>
            <button className="flex items-center p-2 px-4 bg-viol hover:contrast-150 text-white rounded-lg shadow">
                <FontAwesomeIcon icon={faPlus} color="#fff" />
                <span>New Board</span>
            </button>
        </div>
        <div className="flex justify-center overflow-x-auto">
            <Board />
            <Board />
            <Board />
            <button className="bg-white/10 w-1/6 p-2 m-3 rounded-lg flex justify-center items-center shadow-md opacity-70 hover:opacity-100 transition-all ease-in-out duration-200">
                <FontAwesomeIcon icon={faPlus} size={64} color="#00000088" />
            </button>
        </div>
    </>
);

export default Index;
