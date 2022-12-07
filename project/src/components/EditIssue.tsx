import { FC } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useSWRConfig } from 'swr';
import { Issue, updateAPI } from '../util/fetchers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';

const EditIssue: FC<{ issue: Issue }> = ({ issue }) => {
    const { mutate } = useSWRConfig();
    const updateIssue = async (data: { title?: string; description?: string }) => {
        await updateAPI(`/issues/${issue.id}`, data);
        mutate('/boards/');
    };
    return (
        <>
            <div className="flex">
                <div className="w-3/4 p-3">
                    <DebounceInput onChange={(e) => updateIssue({ title: e.target.value })} value={issue.title} debounceTimeout={500} forceNotifyOnBlur className="mb-3 block w-full rounded text-2xl" placeholder="Issue Title" />
                    <DebounceInput onChange={(e) => updateIssue({ description: e.target.value })} element="textarea" value={issue.description} debounceTimeout={500} forceNotifyOnBlur className="block w-full rounded" placeholder="Description" />
                </div>
                <div className="w-1/4 p-3">
                    <button className="mb-2 w-full rounded bg-viol p-2 pl-3 text-left font-bold text-white">
                        <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-2" />
                        <span>Start</span>
                    </button>
                    <button className="mb-2 w-full rounded bg-viol p-2 pl-3 text-left font-bold text-white">
                        <FontAwesomeIcon icon={faTrash} fixedWidth className="mr-2" />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditIssue;