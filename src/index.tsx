import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import App404 from './components/404';

const container = document.getElementById('root')!;
ReactDOM.createRoot(container).render(<App />);

const container404 = document.getElementById('root404')!;
ReactDOM.createRoot(container404).render(<App404 />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
