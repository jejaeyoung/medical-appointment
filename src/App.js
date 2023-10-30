import logo from './logo.svg';
import './App.css';
import LandingPage from './components/landpage/LandingPage';
import Login from './components/login/Login';


function App() {
  return (
    <>
    <h1>Name/Position/GithubUsername</h1>
      <hr/>
      <p>Daniel Sebastian G. Quilatan</p>
      <p>Project Manager</p>
      <p>jejaeyoung</p>
      <hr/>
    <LandingPage/>
    <Login/>
    </>
  );
}

  
export default App;
