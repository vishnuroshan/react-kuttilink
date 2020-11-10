
import './App.css';
import UrlShortener from './containers/UrlShortener/UrlShortener';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <UrlShortener />
      </BrowserRouter>
    </div>
  );
}

export default App;
