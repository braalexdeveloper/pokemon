import './App.css';
import Landing from './components/landing/landing';
import Home from './components/home/home';
import { Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      
      <Route exact path={'/'} component={Landing}/>
      <Route path={'/home'} component={Home}/>
            
    </div>
  );
}

export default App;
