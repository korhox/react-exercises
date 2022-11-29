import IssueComponent from './IssueComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FC, useCallback, useState } from 'react';
import { Board, deleteAPI, insertAPI, Issue, updateAPI } from '../util/fetchers';
import useSWR, { useSWRConfig } from 'swr';
import { DebounceInput } from 'react-debounce-input';
import { capitalizeWord } from '../util/utils';

const BoardComponent: FC<{ id: string; title: string; issues: Issue[] }> = ({ id, title, issues }) => {
    const { data: boards, error } = useSWR<Board[]>('/boards/');
    const { mutate } = useSWRConfig();

    const changeBoardName = useCallback(
        async (name: string) => {
            const tmpBoard = boards?.find((board) => board.id === id);
            const remainingBoards = boards?.filter((board) => board.id !== id) ?? [];
            mutate('/boards/', [...remainingBoards, await updateAPI(`/boards/${id ?? ''}`, { name })], { optimisticData: [...remainingBoards, { ...tmpBoard, name }] });
        },
        [boards, id, mutate]
    );

    const deleteBoard = useCallback(async () => {
        const remainingBoards = boards?.filter((board) => board.id !== id) ?? [];
        mutate('/boards/', await deleteAPI(`/boards/${id ?? ''}`, '/boards?_embed=issues'), { optimisticData: [...remainingBoards] });
    }, [boards, id, mutate]);

    const [newIssue, setNewIssue] = useState('');
    const addIssue = useCallback(async () => {
        await insertAPI('/issues', { content: newIssue, boardId: id });
        mutate('/boards/');
        setNewIssue('');
    }, [id, mutate, newIssue]);

    return (
        <div id={'board-' + id} className="m-3 w-full rounded-lg bg-white/60 p-2 pb-0 shadow-md backdrop-blur" style={{ width: '300px' }}>
            <div className="mb-2 flex w-full">
                <DebounceInput onChange={(e) => changeBoardName(e.target.value)} forceNotifyOnBlur debounceTimeout={500} minLength={2} value={capitalizeWord(title)} className="mb-0 ml-1 w-3/4 text-xl uppercase text-shadow" />
                <button onClick={deleteBoard} className="ml-2 rounded bg-white p-2 py-1">
                    Delete
                </button>
            </div>
            {issues.map((issue) => (
                <IssueComponent key={'issue-' + issue.id} id={issue.id} content={issue.content} />
            ))}
            <div className="mb-2 flex items-center rounded bg-white opacity-60 shadow backdrop-blur transition-all duration-200 ease-in-out focus-within:scale-[102%] focus-within:opacity-100 focus-within:shadow-xl hover:cursor-text hover:opacity-80">
                <span className="pl-2 pr-1">
                    <FontAwesomeIcon icon={faPlus} size="xl" color="#00000088" />
                </span>
                <input
                    value={newIssue}
                    onChange={(e) => setNewIssue(e.target.value)}
                    onKeyUp={(e) => {
                        e.key === 'Enter' && addIssue();
                    }}
                    className="flex-1 bg-transparent p-2"
                    placeholder="New Issue..."
                ></input>
            </div>
        </div>
    );
};

export default BoardComponent;
