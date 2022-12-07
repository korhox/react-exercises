import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FC } from 'react';
import ButtonComponent from '../components/ButtonComponent';
import Footer from '../components/Footer';

const About = () => {
    document.body.style.background = 'rgb(244, 230, 243)';
    return (
        <>
            <div className="container mx-auto mt-8 mb-4 flex justify-between p-2">
                <h2 className="text-3xl font-bold">About</h2>
                <div>
                    <button className="flex items-center rounded-lg bg-viol p-2 px-4 text-white shadow hover:contrast-150">
                        <FontAwesomeIcon icon={faGithub} color="#fff" className="pr-3" />
                        <span className="block">Open GitHub</span>
                    </button>
                </div>
            </div>
            <div className="container mx-auto mt-20 flex p-2">
                <div className="flex w-1/2 flex-col justify-center lg:pr-20">
                    <span className="mb-5 text-6xl">
                        Plan and manage time with <strong>eezeePlan</strong>.
                    </span>
                    <p className="mb-5 text-xl">This is simple, Open Source app for managing and tracking time with projects in work and in real life.</p>
                    <p className="text-xl">Organize your projects in to boards which acts as categories and issues which acts as todo items.</p>
                </div>
                <div className="w-1/2">
                    <img src="assets/img/illustrations/board.svg" alt="Board" width="100%" />
                </div>
            </div>
            <div className="bg-viol text-white">
                <div className="container mx-auto mt-20 p-2 py-20 text-center">
                    <h3 className="mb-10 text-6xl">Fueled by Open Source Contributors</h3>
                    <p className="mx-auto mb-10 text-2xl md:w-1/2">The project has started as Open Source project for a react course. After grading project will be released as public Open Source project under MIT license.</p>
                    <ButtonComponent icon={faGithub} title="Open GitHub" url="" />
                </div>
            </div>
            <div className="container mx-auto mt-20 p-2 py-20">
                <h3 className="mb-10 text-5xl">The Project Team</h3>
                <p className="mb-5 text-xl">Currently, only Juuso Korhonen. Hopefully soon more! ❤️</p>
            </div>
            <div className="container mx-auto mt-20 p-2 py-20">
                <h3 className="mb-10 text-5xl">Built with</h3>
                <p className="mb-5 text-xl">The project utilizes a variety of different public, Open Source libraries to ease development process.</p>
                <ul className="flex flex-wrap text-2xl">
                    {Object.keys(DepedencyList)
                        .sort()
                        .map((key) => (
                            <ListItem to={'https://www.npmjs.com/package/' + key} key={'npm-' + key} name={key} version={DepedencyList[key]} />
                        ))}
                </ul>
            </div>
            <div className="container mx-auto mt-20 p-2 py-20">
                <h3 className="mb-10 text-5xl">Other assets used</h3>
                <p className="mb-5 text-xl">We don't like to miss anything from being credited. Thank you for these asset creators as well!</p>
                <ul className="flex flex-wrap text-2xl">
                    <ListItem to="https://fonts.google.com/specimen/Lobster" name="Lobster (Google Fonts)" />
                    <ListItem to="https://fonts.google.com/specimen/Ubuntu" name="Ubuntu (Google Fonts)" />
                </ul>
            </div>
            <Footer />
        </>
    );
};

type Depedencies = { [key: string]: string };
const DepedencyList: Depedencies = {
    '@fortawesome/fontawesome-svg-core': '^6.2.1',
    '@fortawesome/free-brands-svg-icons': '^6.2.1',
    '@fortawesome/free-regular-svg-icons': '^6.2.1',
    '@fortawesome/free-solid-svg-icons': '^6.2.1',
    '@fortawesome/react-fontawesome': '^0.2.0',
    '@types/node': '^16.18.3',
    '@types/react': '^18.0.25',
    '@types/react-dom': '^18.0.9',
    'normalize.css': '^8.0.1',
    react: '^18.2.0',
    'react-debounce-input': '^3.3.0',
    'react-dom': '^18.2.0',
    'react-scripts': '5.0.1',
    swr: '^1.3.0',
    'tailwindcss-textshadow': '^2.1.3',
    typescript: '^4.9.3',
    uuid: '^9.0.0',
    '@tailwindcss/forms': '^0.5.3',
    '@tailwindcss/typography': '^0.5.8',
    '@types/react-router-dom': '^5.3.3',
    '@types/uuid': '^8.3.4',
    autoprefixer: '^10.4.13',
    postcss: '^8.4.19',
    prettier: '^2.8.0',
    'prettier-plugin-tailwindcss': '^0.2.0',
    'react-router-dom': '^6.4.3',
    tailwindcss: '^3.2.4',
};

const ListItem: FC<{ to: string; name: string; version?: string }> = ({ to, name, version }) => (
    <li className="w-1/3">
        <a href={to} target="_blank" rel="noreferrer" key={name + version}>
            {name} <span className="text-lg opacity-50">{version}</span>
        </a>
    </li>
);

export default About;
