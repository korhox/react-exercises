import { FC, useEffect, useCallback, useState } from 'react';
import { useBoards, useSummary } from '../util/fetchers';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export const ProjectSummary: FC<{ project: any }> = ({ project }) => {
    const { boards, isLoading: boardLoading, isError: boardError } = useBoards(project.id);
    const { summary, isLoading, isError } = useSummary(project.id);
    const [range, setRange] = useState<{ start?: Date; end?: Date }>({});

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
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return Math.round(context.parsed.y * 10) / 10 + ' h';
                    },
                },
            },
        },
    };

    const data = {
        datasets: [
            {
                label: 'Dataset 1',
                data: summary?.map((el) => ({ x: boards?.find((b) => b.id === el.boardId)?.name, y: el.total })),
                backgroundColor: '#542086',
                borderRadius: 4,
                borderSkipped: false,
            },
        ],
    };
    return (
        <>
            <h2 className="text-2xl font-bold">Summary: {project.name}</h2>
            <div className="flex">
                <div className="w-3/4">{data.datasets[0]?.data && <Bar data={data} options={options} />}</div>
                <div className="w-1/4">
                    <label className="mb-3 block">
                        <input
                            type="checkbox"
                            className="mr-3"
                            onChange={(e) =>
                                setRange({
                                    start: e.target.checked
                                        ? (() => {
                                              const time = new Date();
                                              time.setHours(0, 0, 0, 0);
                                              return time;
                                          })()
                                        : undefined,
                                    end: e.target.checked
                                        ? (() => {
                                              const time = new Date();
                                              time.setSeconds(0, 0);
                                              return time;
                                          })()
                                        : undefined,
                                })
                            }
                        />
                        Custom Range
                    </label>
                    {range.start !== undefined && range.end !== undefined && (
                        <div className="rounded bg-white/50 p-3">
                            <label className="block">
                                From
                                <p>{range.end.toISOString()}</p>
                                <input className="w-full rounded" type="datetime-local" onChange={(e) => setRange({ ...range, start: new Date(e.target.value) })} value={new Date(new Date(range.start).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1)} />
                            </label>
                            <label className="block">
                                To
                                <input className="w-full rounded" type="datetime-local" onChange={(e) => setRange({ ...range, end: new Date(e.target.value) })} value={new Date(new Date(range.end).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1)} />
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
