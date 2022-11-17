import { FC } from "react";
import { NavLink } from "react-router-dom";

const About = () => (
    <header className="bg-viol text-white">
        <nav className="flex container mx-auto">
            <LinkContainer to="/" label="Home" />
            <LinkContainer to="/settings" label="Settings" />
            <LinkContainer to="/about" label="About" />
        </nav>
    </header>
);

const LinkContainer: FC<{ to: string; label: string }> = ({ to, label }) => (
    <NavLink className={({ isActive }) => `p-5 text-xl ${isActive ? "opacity-100" : "opacity-60"}`} to={to}>
        {label}
    </NavLink>
);

export default About;
