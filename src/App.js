import { Provider } from 'react-redux/es/exports'
import './App.css'
import Checkout from './JS/Checkout'
import { store } from './JS/store'
// import Checkout from './TS/Checkout';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Checkout />
            </Provider>
        </div>
    )
}

export default App
