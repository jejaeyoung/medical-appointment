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
      
    <LandingPage/>
    <Login/>
    </>
  );
}

  
export default App;
