import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Modal } from './components/Modal';
import Sidebar from './components/Sidebar';

import About from './pages/About';
import Index from './pages/Index';
import Project from './pages/Project';
import Settings from './pages/Settings';
import { modalContext, useModal } from './util/context';

const App = () => {
    const modal = useModal();
    return (
        <modalContext.Provider value={modal}>
            <div id="App" className="bg-bg flex flex-col bg-cover bg-fixed bg-center backdrop-blur-sm backdrop-opacity-50">
                <BrowserRouter>
                    <main className="flex flex-1">
                        <Sidebar />
                        <div className="max-h-screen w-full overflow-y-auto">
                            <Routes>
                                <Route index element={<Index />} />
                                <Route path="/project/:id" element={<Project />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/about" element={<About />} />
                            </Routes>
                        </div>
                    </main>
                </BrowserRouter>
                <Modal
                    show={!!modal.content}
                    onClickOutside={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        modal.setContent(undefined);
                    }}
                >
                    {modal.content as JSX.Element}
                </Modal>
            </div>
        </modalContext.Provider>
    );
};

export default App;
