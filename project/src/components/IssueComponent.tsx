import { FC, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { useSWRConfig } from 'swr';
import { deleteAPI, Issue } from '../util/fetchers';
import { modalContext } from '../util/context';
import EditIssue from './EditIssue';

const IssueComponent: FC<{ issue: Issue }> = ({ issue }) => {
    const { mutate } = useSWRConfig();
    const removeIssue = async () => {
        mutate('/boards/', await deleteAPI(`/issues/${issue.id ?? ''}`, `/boards?_embed=issues`));
    };
    const modal = useContext(modalContext);
    return (
        <>
            <div draggable data-order={issue.order} className="group relative mb-2 flex w-full rounded bg-white/70 p-2 text-left shadow transition-all duration-200 ease-in-out hover:bg-white hover:shadow-lg" id={'issue-' + issue.id}>
                <div>
                    <h4 className="text-xl">{issue.title}</h4>
                </div>
                <div className="absolute top-0 bottom-0 right-0 flex justify-end pr-1 align-middle opacity-0 transition-opacity group-hover:opacity-100">
                    <button onClick={removeIssue} className="p-1 opacity-60 contrast-75 drop-shadow-sm transition-all duration-200 ease-in-out hover:scale-125 hover:text-red-500 hover:opacity-100">
                        <FontAwesomeIcon icon={faTrash} size="lg" fixedWidth={true} />
                    </button>
                    <button onClick={() => modal.setContent(<EditIssue issue={issue} />)} className="p-1 opacity-60 contrast-75 drop-shadow-sm transition-all duration-200 ease-in-out hover:scale-125 hover:text-orange-500 hover:opacity-100">
                        <FontAwesomeIcon icon={faPen} size="lg" fixedWidth={true} />
                    </button>
                    <button className="p-1 opacity-60 contrast-50 drop-shadow-sm transition-all duration-200 ease-in-out hover:scale-125 hover:text-green-500 hover:opacity-100">
                        <FontAwesomeIcon icon={faPlay} size="lg" fixedWidth={true} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default IssueComponent;
