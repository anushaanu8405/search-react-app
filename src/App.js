import logo from './logo.svg';
import './App.css';
import SearchBox from './containers/search-box/search-box';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="container">
        <ErrorBoundary>
          <SearchBox />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
