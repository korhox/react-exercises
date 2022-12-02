import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

const Index = () => {
    document.body.style.background = 'rgb(244, 230, 243)';
    return (
        <>
            <div className="container mx-auto mt-8 mb-4 flex justify-between p-2">
                <h2 className="text-3xl font-bold">Home</h2>
            </div>
            <div className="flex items-start justify-center overflow-x-auto p-3">
                <div className="m-3 flex w-full flex-col items-center justify-center rounded-lg bg-white p-2 opacity-80 shadow-md backdrop-blur transition-all duration-200 ease-in-out hover:scale-105 hover:opacity-95 hover:shadow-lg" style={{ minHeight: '200px', width: '300px' }}>
                    <h3 className="mb-4 text-xl font-bold">Create a New Project</h3>
                    <FontAwesomeIcon icon={faPlus} size="6x" color="#00000088" />
                </div>
            </div>
        </>
    );
};

export default Index;
