import { FC } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useSWRConfig } from 'swr';
import { Issue, updateAPI } from '../util/fetchers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faArchive, faClock, faRectangleList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const EditIssue: FC<{ issue: Issue }> = ({ issue }) => {
    const { mutate } = useSWRConfig();
    const updateIssue = async (data: { title?: string; description?: string }) => {
        await updateAPI(`/issues/${issue.id}`, data);
        mutate('/boards/');
    };

    const rand = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const { times, isLoading, isError } = useTimes(issue.id);

    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scaleLineColor: 'rgba(0,0,0,0)',
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
            },
            y: {
                stacked: true,
                min: 0,
                max: 24,
                reverse: true,
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
            },
        },
    };
    const labels = ['1.12.', '3.12.', '4.12.', '5.12.', '6.12.', '7.12.', '8.12.', '9.12.', '10.12.'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => {
                    return [rand(0, 24), rand(0, 24)];
                }),
                backgroundColor: '#542086',
                borderRadius: 4,
                borderSkipped: false,
            },
        ],
    };
    return (
        <>
            <div className="flex">
                <div className="over w-3/4 px-3 pb-3">
                    <div className="items-top mb-3 flex">
                        <FontAwesomeIcon icon={faRectangleList} fixedWidth className="my-4 mr-3 opacity-60" />
                        <DebounceInput
                            onChange={(e) => updateIssue({ title: e.target.value })} //
                            value={issue.title}
                            debounceTimeout={500}
                            forceNotifyOnBlur
                            className="duration-all block w-full rounded border-0 bg-transparent p-2 text-2xl font-bold duration-200 focus:scale-[102%] focus:bg-white focus:shadow-xl"
                            placeholder="Issue Title"
                        />
                    </div>
                    <div className="items-top mb-3 flex">
                        <FontAwesomeIcon icon={faAlignLeft} fixedWidth className="my-3 mr-3 opacity-60" />
                        <DebounceInput
                            onChange={(e) => updateIssue({ description: e.target.value })} //
                            element="textarea"
                            value={issue.description}
                            debounceTimeout={500}
                            forceNotifyOnBlur
                            className="block w-full rounded border-0 bg-transparent p-2 transition-all duration-200 focus:scale-[102%] focus:bg-white focus:shadow-xl"
                            placeholder="Description"
                        />
                    </div>
                    <div className="items-top mb-3 flex">
                        <FontAwesomeIcon icon={faClock} fixedWidth className="my-3 mr-3 opacity-60" />
                        <div className="w-full">
                            <Bar data={data} options={options} className="" width={'100%'} height={250} />
                        </div>
                    </div>
                </div>
                <div className="w-1/4 p-3">
                    <button className="mb-2 w-full rounded bg-white p-2 pl-3 text-left font-bold opacity-70 shadow transition-opacity hover:opacity-100">
                        <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-2" />
                        <span>Start</span>
                    </button>
                    <button className="mb-2 w-full rounded bg-white p-2 pl-3 text-left font-bold opacity-70 shadow transition-opacity hover:opacity-100">
                        <FontAwesomeIcon icon={faArchive} fixedWidth className="mr-2" />
                        <span>Archive</span>
                    </button>
                    <button className="mb-2 w-full rounded bg-white p-2 pl-3 text-left font-bold opacity-70 shadow transition-opacity hover:opacity-100">
                        <FontAwesomeIcon icon={faTrash} fixedWidth className="mr-2" />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditIssue;
function useTimes(id: string): { times: any; isLoading: any; isError: any } {
    throw new Error('Function not implemented.');
}
