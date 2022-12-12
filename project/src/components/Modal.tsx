import { FC, MouseEventHandler } from 'react';

export const Modal: FC<{ show: Boolean; onClickOutside: MouseEventHandler<HTMLDivElement>; children: JSX.Element }> = ({ show, onClickOutside, children }) =>
    show && (
        <>
            <div id="backdrop" className="fixed top-0 bottom-0 left-0 right-0 z-40 bg-black/40" onClick={onClickOutside}></div>
            <div className="absolute flex h-full w-full items-center justify-center">
                <div className="z-50 mx-auto h-1/2 w-1/2 overflow-auto rounded bg-white/60 p-4 drop-shadow-xl backdrop-blur">{children}</div>
            </div>
        </>
    );
