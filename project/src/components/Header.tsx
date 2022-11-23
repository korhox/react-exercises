import { FC } from "react";
import { NavLink } from "react-router-dom";

const About = () => (
    <header className="bg-viol text-white shadow-2xl pl-2">
        <nav className="flex container mx-auto">
            <LinkContainer to="/" label="Home" />
            <LinkContainer to="/settings" label="Settings" />
            <LinkContainer to="/about" label="About" />
        </nav>
    </header>
);

const LinkContainer: FC<{ to: string; label: string }> = ({ to, label }) => (
    <NavLink className={({ isActive }) => `p-5 pl-0 pr-10 text-xl transition-all ease-in-out duration-200 ${isActive ? "opacity-100" : "opacity-60"}`} to={to}>
        {label}
    </NavLink>
);

export default About;
