import BoardComponent from '../components/BoardComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { useNavigate, useParams } from 'react-router-dom';
import { updateAPI, useBoards, useProjects, deleteProject, insertAPI } from '../util/fetchers';
import { useCallback, useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { DebounceInput } from 'react-debounce-input';
import { capitalizeWord } from '../util/utils';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Project = () => {
    const params = useParams<{ id: string }>();
    const { boards, isLoading, isError } = useBoards(params.id ?? '');
    const { projects, isLoading: projectLoading, isError: projectError } = useProjects();
    const curProject = projects?.find((el) => el.id + '' === params.id);

    const { mutate } = useSWRConfig();
    useEffect(() => {
        mutate('/boards/');
    }, [mutate, params.id]);

    document.body.style.background = curProject?.settings?.background ?? 'rgb(244, 230, 243)';

    const changeProjectName = useCallback(
        async (name: string) => {
            const tmpProject = projects?.find((project) => project.id === params.id);
            const remainingProjects = projects?.filter((project) => project.id !== params.id) ?? [];
            mutate('/projects/', [...remainingProjects, await updateAPI(`/projects/${params.id ?? ''}`, { name })], { optimisticData: [...remainingProjects, { ...tmpProject, name }] });
        },
        [mutate, params.id, projects]
    );

    const navigate = useNavigate();
    const delProject = useCallback(async () => {
        const remainingProjects = projects?.filter((project) => project.id !== params.id) ?? [];
        await mutate('/projects/', await deleteProject(params.id ?? ''), { optimisticData: [...remainingProjects] });
        navigate('/');
    }, [mutate, navigate, params.id, projects]);

    const addBoard = useCallback(async () => {
        const largest = boards?.length ?? 0;
        const tmpBoard = { name: `Board ${largest + 1}`, id: largest + 1 };
        mutate('/boards/', [...(boards ?? []), await insertAPI('/boards', { name: `Board ${largest + 1}`, projectId: params.id ?? '' })], { optimisticData: [...(boards ?? []), tmpBoard] });
    }, [boards, mutate, params.id]);

    const [query, setQuery] = useState('');

    return isError ? (
        <p>An unexpected error occurred.</p>
    ) : isLoading ? (
        <p>Loading...</p>
    ) : (
        <>
            <div className="w-full">
                <div className="flex w-full justify-between p-5 pb-1">
                    <div className="flex items-center">
                        <DebounceInput onChange={(e) => changeProjectName(e.target.value)} forceNotifyOnBlur debounceTimeout={500} minLength={2} value={capitalizeWord(curProject?.name ?? 'Unknown')} className="w-auto rounded-lg border-0 bg-transparent py-2 px-3 text-2xl font-medium text-white text-shadow-lg" />
                        <div className="group relative ml-2 flex flex-col items-center px-5 py-2">
                            <FontAwesomeIcon icon={faTrash} className="text-2xl text-white" />
                            <div className="group absolute top-0 mt-8 hidden flex-col items-center group-hover:flex">
                                <div className="-mb-2 h-3 w-3 rotate-45 rounded bg-white"></div>
                                <span className="whitespace-no-wrap relative z-10 rounded bg-white p-3 text-xs leading-none text-black shadow" style={{ width: '250px' }}>
                                    <strong>Permanently Remove the Project?</strong>
                                    <br />
                                    All the boards and issues attached to the project will be permanently removed.
                                    <button onClick={delProject} className="mt-2 rounded bg-red-800 py-1 px-2 text-white">
                                        Delete
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="group relative ml-2 flex flex-row items-center px-5 py-2">
                            <FontAwesomeIcon icon={faSearch} className="text-2xl text-white" />
                            <DebounceInput onChange={(e) => setQuery(e.target.value)} debounceTimeout={300} className="bg-white" style={{ width: '250px' }} />
                        </div>
                    </div>
                    <div>
                        <p></p>
                    </div>
                    <div>
                        <button onClick={addBoard} className="flex items-center rounded-lg bg-viol p-2 px-4 text-white shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:contrast-150">
                            <FontAwesomeIcon icon={faPlus} color="#fff" className="pr-2" />
                            <span>New Board</span>
                        </button>
                    </div>
                </div>
                <div className="flex items-start justify-center overflow-x-auto p-3">
                    {boards
                        ?.filter((board) => board.name.toLowerCase().includes(query.toLowerCase()))
                        ?.map((board) => (
                            <BoardComponent key={board.id} id={board.id} title={board.name} issues={board.issues ?? []} />
                        ))}

                    {!query && (
                        <button onClick={addBoard} className="m-3 flex w-full items-center justify-center rounded-lg bg-white/30 p-2 opacity-70 shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:opacity-100 hover:shadow-lg" style={{ minHeight: '200px', width: '300px' }}>
                            <FontAwesomeIcon icon={faPlus} size="6x" color="#00000088" />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Project;
