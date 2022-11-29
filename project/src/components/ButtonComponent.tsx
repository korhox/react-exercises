import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const ButtonComponent: FC<{ title: string; icon: IconDefinition; url: string }> = ({ title, icon, url }) => (
    <button className="flex items-center p-2 px-4 bg-white hover:contrast-150 text-viol rounded-lg shadow mx-auto">
        <FontAwesomeIcon icon={icon} color="text-viol" size="2x" className="pr-3" />
        <span className="text-xl">{title}</span>
    </button>
);

export default ButtonComponent;
