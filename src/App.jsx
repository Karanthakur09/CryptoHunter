import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import Alerts from './components/Alerts';

function App() {

  return (
    <div style={{
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    }}>
      <BrowserRouter>
      <Header />
      
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
        <Alerts/>
      </BrowserRouter >
    </div>
  );
}

export default App;
