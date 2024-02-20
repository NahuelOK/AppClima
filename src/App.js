import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './views/Home.js';
import "./App.scss"

function App(){
  return(
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;