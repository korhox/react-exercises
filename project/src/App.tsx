import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

import About from "./pages/About";
import Index from "./pages/Index";
import Settings from "./pages/Settings";

const App = () => (
    <div id="App" className="flex flex-col">
        <BrowserRouter>
            <Header />
            <main className="flex-1">
                <Routes>
                    <Route index element={<Index />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    </div>
);

export default App;
