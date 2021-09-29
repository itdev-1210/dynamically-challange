import { Provider } from "react-redux";
import { store } from './redux/configureStore'
import Expense from './expense/Expense'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <Expense />
        </div>
      </div>
    </Provider>
  );
}

export default App;
