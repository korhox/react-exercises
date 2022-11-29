import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface Modal {
    content: JSX.Element | undefined;
    setContent: Dispatch<SetStateAction<JSX.Element> | undefined>;
}

export const modalContext = createContext<Modal>({
    content: undefined,
    setContent: () => {},
});

export const useModal = () => {
    const [content, setContent] = useState<JSX.Element | undefined>(undefined);
    return { content, setContent } as Modal;
};
