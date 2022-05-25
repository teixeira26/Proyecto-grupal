import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
