import { FC, useEffect } from 'react';
import { useSummary } from '../util/fetchers';

export const ProjectSummary: FC<{ project: any }> = ({ project }) => {
    const { summary, isLoading, isError } = useSummary(project.id);
    useEffect(() => {
        console.log(summary);
    }, [summary]);
    return (
        <>
            <h2 className="text-2xl font-bold">Summary: {project.name}</h2>
            <div className="flex"></div>
        </>
    );
};
