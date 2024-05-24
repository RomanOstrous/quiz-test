import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import GeneralPage from './components/GeneralPage';
import './index.css';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<GeneralPage />}/>
        <Route path="quiz/:id?" element={<QuizPage/>} />
        <Route path="result" element={<ResultPage/>} />
      </Route>
    </Routes>
  </HashRouter>
);

