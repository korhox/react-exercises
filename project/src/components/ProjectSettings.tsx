import { FC } from 'react';

export const ProjectSettings: FC<{ project: any }> = ({ project }) => {
    return (
        <>
            <h2 className="text-2xl font-bold">Project settings: {project.name}</h2>
            <div className="flex">
                <div className="w-1/3">
                    <div className="flex justify-between">
                        <label htmlFor="projectColor" className="">
                            Project color
                        </label>
                        <input type="color" name="projectColor" className="bg-transparent" />
                    </div>
                </div>
            </div>
        </>
    );
};
