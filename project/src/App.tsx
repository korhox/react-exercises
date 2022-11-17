import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import About from "./pages/About";
import Index from "./pages/Index";
import Settings from "./pages/Settings";

const App = () => (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route index element={<Index />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
);

export default App;
