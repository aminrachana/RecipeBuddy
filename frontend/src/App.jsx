import { Provider } from 'react-redux'
import './App.css'
import { NavigationStack } from './navigation/NavigationStack'
import store from './redux/store'

function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationStack />
      </Provider>
    </>
  )
}

export default App
