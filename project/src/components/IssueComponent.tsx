import { FC, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { useSWRConfig } from 'swr';
import { deleteAPI, Issue, updateAPI } from '../util/fetchers';
import { modalContext } from '../util/context';
import EditIssue from './EditIssue';
import { DebounceInput } from 'react-debounce-input';

const IssueComponent: FC<{ issue: Issue }> = ({ issue }) => {
    const { mutate } = useSWRConfig();
    const removeIssue = async () => {
        mutate('/boards/', await deleteAPI(`/issues/${issue.id ?? ''}`, `/boards?_embed=issues`));
    };
    const modal = useContext(modalContext);
    const updateIssue = async (data: { title?: string; description?: string }) => {
        await updateAPI(`/issues/${issue.id}`, data);
        mutate('/boards/');
    };
    return (
        <>
            <div
                draggable
                onDragStart={(e) => {
                    e.stopPropagation();
                    e.dataTransfer.setData('text/plain', `issue-${issue.id}-${issue.boardId}`);
                }}
                data-order={issue.order}
                className="group relative mb-2 flex w-full rounded bg-white/70 text-left shadow transition-all duration-200 ease-in-out hover:bg-white/90 hover:shadow-lg "
                id={'issue-' + issue.id}
            >
                <DebounceInput onChange={(e) => updateIssue({ title: e.target.value })} forceNotifyOnBlur debounceTimeout={500} className="focus:box-shadow group w-full rounded border-0 bg-transparent transition-all focus:scale-[103%] focus:bg-white" value={issue.title} />

                <div className="absolute top-0 bottom-0 right-0 flex justify-end bg-gradient-to-l from-white/90 via-white/90 to-transparent pr-1 pl-20 align-middle opacity-0 transition-opacity group-hover:opacity-100">
                    <button aria-label="Delete" tabIndex={-1} onClick={removeIssue} className="p-1 opacity-70 contrast-75 drop-shadow-sm transition-all duration-200 ease-in-out hover:scale-125 hover:text-red-500 hover:opacity-100">
                        <FontAwesomeIcon icon={faTrash} size="lg" fixedWidth={true} />
                    </button>
                    <button aria-label="Edit" tabIndex={-1} onClick={() => modal.setContent(<EditIssue issue={issue} />)} className="p-1 opacity-70 contrast-75 drop-shadow-sm transition-all duration-200 ease-in-out hover:scale-125 hover:text-orange-500 hover:opacity-100">
                        <FontAwesomeIcon icon={faPen} size="lg" fixedWidth={true} />
                    </button>
                    <button aria-label="Start" tabIndex={-1} className="p-1 opacity-70 contrast-50 drop-shadow-sm transition-all duration-200 ease-in-out hover:scale-125 hover:text-green-500 hover:opacity-100">
                        <FontAwesomeIcon icon={faPlay} size="lg" fixedWidth={true} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default IssueComponent;
