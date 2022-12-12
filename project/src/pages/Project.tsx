import BoardComponent from '../components/BoardComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { useNavigate, useParams } from 'react-router-dom';
import { updateAPI, useBoards, useProjects, deleteProject, insertAPI, updateBoardOrder } from '../util/fetchers';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import { DebounceInput } from 'react-debounce-input';
import { capitalizeWord } from '../util/utils';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faSearch, faCircleNotch, faCog, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ErrorComponent } from '../components/ErrorComponent';
import { modalContext } from '../util/context';
import { ProjectSettings } from '../components/ProjectSettings';
import { ProjectSummary } from '../components/ProjectSummary';

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
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';

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
        const tmpBoard = { name: `Board ${largest + 1}`, id: largest + 1, order: largest };
        mutate('/boards/', [...(boards ?? []), await insertAPI('/boards', { name: `Board ${largest + 1}`, projectId: params.id ?? '', order: largest })], { optimisticData: [...(boards ?? []), tmpBoard] });
    }, [boards, mutate, params.id]);

    const project = useRef<HTMLDivElement>(null);
    const moveBoard = useCallback(
        async (e: React.DragEvent<HTMLDivElement>) => {
            const [event, boardId] = e.dataTransfer.getData('text/plain').split('-');
            if (event !== 'board') return;
            let position = null;
            let distance = Infinity;
            project.current?.childNodes.forEach((child) => {
                if (!(child instanceof HTMLElement)) return;
                if (!child.id.includes('board-')) return;
                const rect = child.getClientRects()[0];
                const fromLeft = Math.abs(e.clientX - rect.left);
                const fromRight = Math.abs(e.clientX - rect.right);
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                fromRight > fromLeft && fromLeft < distance && ((distance = fromLeft), (position = parseInt(child.getAttribute('data-order') ?? '0')));
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                fromLeft > fromRight && fromRight < distance && ((distance = fromRight), (position = parseInt(child.getAttribute('data-order') ?? '0') + 1));
            });
            if (position === null) return;
            await updateBoardOrder(params.id ?? '', boardId, position);
            mutate('/boards/');
        },
        [mutate, params.id]
    );

    const [query, setQuery] = useState('');
    const modal = useContext(modalContext);

    return isError ? (
        <ErrorComponent />
    ) : isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
            <FontAwesomeIcon icon={faCircleNotch} spin size="4x" color="#541F87" />
        </div>
    ) : (
        <>
            <div className="flex w-full justify-between p-5 pb-1">
                <div className="flex items-center">
                    <div>
                        <DebounceInput onChange={(e) => changeProjectName(e.target.value)} forceNotifyOnBlur debounceTimeout={500} minLength={2} value={capitalizeWord(curProject?.name ?? 'Unknown')} className="w-full max-w-full border-0 border-b-2 border-white/50 bg-transparent py-1 px-2 text-2xl font-medium text-white text-shadow-lg" style={{ maxWidth: '300px' }} />
                    </div>
                    <div className="group relative ml-2 flex flex-col items-center px-3 py-2">
                        <FontAwesomeIcon onClick={() => modal.setContent(<ProjectSummary project={curProject} />)} icon={faChartLine} fixedWidth className="text-2xl text-white opacity-80 transition-opacity group-hover:opacity-100" style={{ filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }} />
                        <div className="group absolute top-0 mt-8 hidden flex-col items-center group-hover:flex">
                            <div className="z-20 -mb-2 h-3 w-3 rotate-45 rounded bg-white"></div>
                            <span className="whitespace-no-wrap relative z-10 w-auto rounded bg-white p-3 text-xs text-black shadow" style={{ inlineSize: 'max-width', maxWidth: '250px', filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }}>
                                <strong>Summary</strong>
                            </span>
                        </div>
                    </div>
                    <div className="group relative ml-2 flex flex-col items-center px-3 py-2">
                        <FontAwesomeIcon onClick={() => modal.setContent(<ProjectSettings project={curProject} />)} icon={faCog} fixedWidth className="text-2xl text-white opacity-80 transition-opacity group-hover:opacity-100" style={{ filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }} />
                        <div className="group absolute top-0 mt-8 hidden flex-col items-center group-hover:flex">
                            <div className="z-20 -mb-2 h-3 w-3 rotate-45 rounded bg-white"></div>
                            <span className="whitespace-no-wrap relative z-10 w-auto rounded bg-white p-3 text-xs text-black shadow" style={{ inlineSize: 'max-width', maxWidth: '250px', filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }}>
                                <strong>Project settings</strong>
                            </span>
                        </div>
                    </div>
                    <div className="group relative ml-2 flex flex-col items-center px-3 py-2">
                        <FontAwesomeIcon icon={faTrash} className="text-2xl text-white opacity-80 transition-opacity group-hover:opacity-100" />
                        <div className="group absolute top-0 mt-8 hidden flex-col items-center group-hover:flex">
                            <div className="z-20 -mb-2 h-3 w-3 rotate-45 rounded bg-white"></div>
                            <span className="whitespace-no-wrap relative z-10 rounded bg-white p-3 text-xs text-black shadow" style={{ inlineSize: 'max-width', minWidth: '250px', filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }}>
                                <strong className="block">Permanently Remove the Project?</strong>
                                All the boards and issues attached to the project will be permanently removed.
                                <button onClick={delProject} className="mt-2 rounded bg-red-800 py-1 px-2 text-white">
                                    Delete
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="group relative ml-2 flex flex-row items-center px-3 py-2">
                        <FontAwesomeIcon icon={faSearch} fixedWidth className="text-2xl text-white opacity-80 transition-opacity group-hover:opacity-100" style={{ filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }} />
                        <DebounceInput onChange={(e) => setQuery(e.target.value)} debounceTimeout={300} placeholder="Filter boards..." className={`ml-5 w-0 rounded border-0 bg-white/80 opacity-0 shadow transition-all group-hover:w-full group-hover:opacity-100`} style={{ maxWidth: '250px' }} />
                    </div>
                </div>
                <div>
                    <button onClick={addBoard} className="flex items-center rounded-lg bg-viol p-2 px-4 text-white shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:contrast-150">
                        <FontAwesomeIcon icon={faPlus} color="#fff" className="pr-2" />
                        <span>New Board</span>
                    </button>
                </div>
            </div>
            <div ref={project} onDrop={moveBoard} onDragOver={(e) => e.preventDefault()} className="flex w-full snap-x snap-mandatory items-start justify-center overflow-x-scroll p-3">
                {boards
                    ?.filter((board) => board.name.toLowerCase().includes(query.toLowerCase()))
                    ?.map((board) => (
                        <BoardComponent key={board.id} id={board.id} title={board.name} issues={board.issues ?? []} order={board.order} />
                    ))}

                {/* Breaks the width of the board container
                    {!query && (
                        <button aria-label="Create Board" tabIndex={-1} onClick={addBoard} className="m-3 flex w-[300px] items-center justify-center rounded-lg bg-white/30 p-2 opacity-70 shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:opacity-100 hover:shadow-lg">
                            <FontAwesomeIcon icon={faPlus} size="6x" color="#00000088" />
                        </button>
                    )}
                */}
            </div>
        </>
    );
};

export default Project;
