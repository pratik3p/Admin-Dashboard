import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import Course from './pages/Course';
import Advertisement from './pages/Advertisement';
import Routings from './Routings';
import FirstComp from './pages/FirstComp';

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='/dash' element={<Dashboard/>}>

        <Route index element={<FirstComp/>}/>
        {Routings.map((item,index)=>{
          return <Route key={index} exact path={item.path} element={item.element}/> 
        })}
      </Route>
      

     
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
