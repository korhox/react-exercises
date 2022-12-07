import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

export const ErrorComponent: FC<{}> = () => (
    <div className="text-4xl text-white">
        <h2>
            <FontAwesomeIcon icon={faExclamationTriangle} fixedWidth /> Error
        </h2>
        <p>An unexcepted error occurred. We're sorry for the inconvenience. Please try again in a few moments.</p>
    </div>
);
