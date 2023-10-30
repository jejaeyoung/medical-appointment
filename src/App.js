import logo from './logo.svg';
import './App.css';
import LandingPage from './components/landpage/LandingPage';
import Login from './components/login/Login';


function App() {
  return (
    <>
    <h1>Name/Position/Github Username</h1>
      <hr/>
      <p>Daniel Sebastian G. Quilatan</p>
      <p>Project Manager</p>
      <p>jejaeyoung</p>
      <hr/>

      <p>Kiddah Ceri C. Nubla</p>
      <p>Documentor</p>
      <p>kiddahceri</p>
      <hr/>

      <p>Jazrene Vernique M. Aquino</p>
      <p>System Analyst</p>
      <p>dashrin</p>
      <hr/>
      
      <p> Alliah Maye T. Orca </p>
      <p> Programmer </p>
      <p> allitootz </p>
      <hr/>
    <LandingPage/>
    <Login/>
    </>
  );
}

  
export default App;
