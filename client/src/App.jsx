import {Route, Routes, useLocation} from "react-router-dom"
import './App.css';
import LandingPage from './views/LandingPage/LandingPage.jsx';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getAllCountries, getAllActivities} from './redux/actions/actions';
import HomePage from './views/HomePage/HomePage';
import FormPage from './views/FormPage/FormPage';
import DetailPage from './views/DetailPage/DetailPage';
import ErrorPage from './views/ErrorPage/ErrorPage';

function App() {
  
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const dictionary = {'/home': true, '/activity': true};


  return (
    
      <div className="App">
       
       <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path='/activity' element={<FormPage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='*' element={<ErrorPage />} />
       </Routes>
      </div>
      
  )
}

export default App

