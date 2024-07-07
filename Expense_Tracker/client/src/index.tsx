import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ExpenseTrackerForm from './components/ExpenseTrackerForm';
import ShowList from './components/ShowList';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <Router>
<Routes>

  <Route path='/' element={<ExpenseTrackerForm onClose={() => {}}/>}></Route>
  <Route path='/home' element={<ShowList/>}></Route>

</Routes>
</Router>
  </React.StrictMode>
)
