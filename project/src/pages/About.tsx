import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FC } from "react";

const About = () => (
    <>
        <div className="container mx-auto flex justify-between p-2 mt-8 mb-4">
            <h2 className="text-2xl">About</h2>
            <button className="flex items-center p-2 px-4 bg-viol hover:contrast-150 text-white rounded-lg shadow">
                <FontAwesomeIcon icon={faGithub} color="#fff" className="pr-3" />
                <span>Open GitHub</span>
            </button>
        </div>
        <div className="container p-2 mx-auto flex mt-20">
            <div className="w-1/2 flex flex-col justify-center lg:pr-20">
                <span className="text-6xl mb-5">
                    Plan and manage time with <strong>eezeePlan</strong>.
                </span>
                <p className="text-xl mb-5">This is simple, Open Source app for managing and tracking time with projects in work and in real life.</p>
                <p className="text-xl">Organize your projects in to boards which acts as categories and issues which acts as todo items.</p>
            </div>
            <div className="w-1/2">
                <img src="assets/img/illustrations/board.svg" alt="Board" width="100%" />
            </div>
        </div>
        <div className="bg-viol text-white">
            <div className="container p-2 mx-auto mt-20 text-center py-20">
                <h3 className="text-6xl mb-10">Fueled by Open Source Contributors</h3>
                <p className="text-2xl md:w-1/2 mx-auto mb-10">The project has started as Open Source project for a react course. After grading project will be released as public Open Source project under MIT license.</p>
                <button className="flex items-center p-2 px-4 bg-white hover:contrast-150 text-viol rounded-lg shadow mx-auto">
                    <FontAwesomeIcon icon={faGithub} color="text-viol" size="2x" className="pr-3" />
                    <span className="text-xl">Open GitHub</span>
                </button>
            </div>
        </div>
        <div className="container p-2 mx-auto mt-20 py-20">
            <h3 className="text-5xl mb-10">Built with</h3>
            <p className="text-xl mb-5">The project utilizes a variety of different public, Open Source libraries to ease development process.</p>
            <ul className="text-2xl flex flex-wrap">
                {Object.keys(DepedencyList)
                    .sort()
                    .map((key) => (
                        <ListItem to={"https://www.npmjs.com/package/" + key} name={key} version={DepedencyList[key]} />
                    ))}
            </ul>
        </div>
        <div className="container p-2 mx-auto mt-20 py-20">
            <h3 className="text-5xl mb-10">Other assets used</h3>
            <p className="text-xl mb-5">We don't like to miss anything from being credited. Thank you for these asset creators as well.</p>
            <ul className="text-2xl flex flex-wrap">
                <ListItem to="https://fonts.google.com/specimen/Lobster?preview.text=eezeePlan&preview.size=79&preview.text_type=custom" name="Lobster" />
            </ul>
        </div>
    </>
);

type Depedencies = { [key: string]: string };
const DepedencyList: Depedencies = {
    "@fortawesome/fontawesome-svg-core": "^6.2.1",
    "@fortawesome/free-brands-svg-icons": "^6.2.1",
    "@fortawesome/free-regular-svg-icons": "^6.2.1",
    "@fortawesome/free-solid-svg-icons": "^6.2.1",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@types/node": "^16.18.3",
    "@types/react": "^18.0.25",
    "@types/react-dom": "^18.0.9",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    typescript: "^4.9.3",
    uuid: "^9.0.0",
    "@types/react-router-dom": "^5.3.3",
    autoprefixer: "^10.4.13",
    postcss: "^8.4.19",
    "react-router-dom": "^6.4.3",
    tailwindcss: "^3.2.4",
};

const ListItem: FC<{ to: string; name: string; version?: string }> = ({ to, name, version }) => (
    <li className="w-1/3">
        <a href={to} target="_blank" rel="noreferrer" key={name + version}>
            {name} <span className="opacity-50 text-lg">{version}</span>
        </a>
    </li>
);

export default About;
