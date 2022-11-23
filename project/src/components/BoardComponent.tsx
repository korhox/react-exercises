import IssueComponent from "./IssueComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

const BoardComponent = () => (
    <div className="bg-white sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-2 pb-0 m-3 rounded-lg shadow-md">
        <h3 className="text-xl mb-2 ml-1 ">BoardTitle</h3>
        <IssueComponent />
        <IssueComponent />
        <IssueComponent />
        <IssueComponent />
        <IssueComponent />
        <div className="flex items-center mb-2 bg-neutral-100/80 shadow">
            <span className="pl-2 pr-1">
                <FontAwesomeIcon icon={faPlus} size="xl" color="#00000088" />
            </span>
            <input className="p-2 bg-transparent flex-1" placeholder="New Issue..."></input>
        </div>
    </div>
);

export default BoardComponent;
