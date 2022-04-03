import ReactDOM from 'react-dom/client';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import App from './app';
import App404 from './components/404';

const RouterApp = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/standhub" element={<App />} />
            <Route path="*" element={<App404 />} />
        </Routes>
    </BrowserRouter>
);

const container = document.getElementById('root')!;
ReactDOM.createRoot(container).render(<RouterApp />);
