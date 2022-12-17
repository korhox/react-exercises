import { FC, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { insertAPI, useProjects } from '../util/fetchers';
import { useSWRConfig } from 'swr';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const { projects, isLoading, isError } = useProjects();
    const { mutate } = useSWRConfig();
    const addProject = useCallback(async () => {
        const largest = projects?.map((project) => Number((project?.name.match(/Project (\d+)/) ?? [0, 0])[1])).reduce((acc, cur) => (acc > cur ? acc : cur), 0) ?? 0;
        const tmpProject = { name: `Project ${largest + 1}`, id: largest + 1 };
        mutate('/projects/', [...(projects ?? []), await insertAPI('/projects', { name: `Project ${largest + 1}` })], { optimisticData: [...(projects ?? []), tmpProject] });
    }, [mutate, projects]);

    return isError ? (
        <p>An unexpected error occurred.</p>
    ) : isLoading ? (
        <div className="flex h-full w-20 items-center justify-center">
            <FontAwesomeIcon icon={faCircleNotch} spin size="2x" color="#541F87" />
        </div>
    ) : (
        <header className="relative z-10 bg-white/30 pt-2 text-white backdrop-blur" style={{ height: '100%', boxShadow: '0 0 20px #0002' }}>
            <nav className="container mx-auto flex flex-col items-center justify-between" style={{ height: '100%' }}>
                <div className="h-[200px] overflow-y-auto">
                    <LinkContainer to="/" label="Home" icon={faHouse} />
                    {projects?.map((project) => (
                        <ProjectContainer key={project.id} to={`/project/${project.id}`} label={project.name} />
                    ))}
                    <ButtonContainer action={addProject} label="Create a New Project" icon={faPlus} />
                </div>
                <div className="h-auto">
                    <LinkContainer to="/settings" label="Settings" icon={faGear} />
                    <LinkContainer to="/about" label="About" icon={faInfo} />
                </div>
            </nav>
        </header>
    );
};

const LinkContainer: FC<{ to: string; label: string; icon: IconDefinition }> = ({ to, label, icon }) => (
    <NavLink className={({ isActive }) => `group relative flex items-center p-3 text-xl transition-all duration-200 ease-in-out`} to={to}>
        <div className="flex items-center justify-center rounded-3xl bg-viol font-extrabold text-white shadow-xl group-hover:rounded-2xl" style={{ width: '60px', height: '60px' }}>
            <FontAwesomeIcon icon={icon} size="lg" fixedWidth />
        </div>
        <span className="absolute left-20 min-w-max origin-left scale-0 rounded-xl bg-white/60 px-4 py-2 font-bold text-black opacity-0 shadow-lg drop-shadow-lg backdrop-blur transition-all text-shadow group-hover:scale-100 group-hover:opacity-100">{label}</span>
    </NavLink>
);

const ButtonContainer: FC<{ action: () => void; label: string; icon: IconDefinition }> = ({ action, label, icon }) => (
    <div onClick={action} className="group relative flex items-center p-3 text-xl transition-all duration-200 ease-in-out">
        <div className="flex items-center justify-center rounded-3xl bg-viol font-extrabold text-white shadow-xl transition-all text-shadow group-hover:rounded-2xl" style={{ width: '60px', height: '60px' }}>
            <FontAwesomeIcon icon={icon} size="lg" fixedWidth />
        </div>
        <span className="absolute left-20 min-w-max origin-left scale-0 rounded-xl bg-white/60 px-4 py-2 font-bold text-black opacity-0 shadow-lg drop-shadow-lg backdrop-blur transition-all text-shadow group-hover:scale-100 group-hover:opacity-100">{label}</span>
    </div>
);

const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names[1] ? names[0].charAt(0) + names[1].charAt(0) : names[0].charAt(0) + names[0].charAt(1);
    return initials.toUpperCase();
};

const ProjectContainer: FC<{ to: string; label: string; img?: string; initials?: string }> = ({ to, label, img, initials }) => (
    <NavLink className={({ isActive }) => `relative flex items-center p-3 text-xl transition-all duration-200 ease-in-out ${isActive ? 'opacity-100' : 'opacity-60 contrast-125'} group`} to={to}>
        {img ? (
            <img src={img} alt={label} className="rounded-3xl shadow-xl group-hover:rounded-2xl" style={{ width: '60px', height: '60px' }} />
        ) : (
            <div className="flex items-center justify-center rounded-3xl bg-white font-extrabold text-viol shadow-xl transition-all text-shadow group-hover:rounded-2xl" style={{ width: '60px', height: '60px' }}>
                <span>{initials ? initials : getInitials(label)}</span>
            </div>
        )}
        <span className="absolute left-20 min-w-max origin-left scale-0 rounded-xl bg-white/60 px-4 py-2 font-bold text-black opacity-0 shadow-lg drop-shadow-lg backdrop-blur transition-all text-shadow group-hover:scale-100 group-hover:opacity-100">{label}</span>
    </NavLink>
);

export default Sidebar;
