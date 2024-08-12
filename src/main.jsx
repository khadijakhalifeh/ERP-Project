import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProviderComponent } from './theme/ThemeContext.jsx';
import './index.css'
import {Provider} from 'react-redux'
import store from './redux/store.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderComponent>
      <Provider store = {store}>
      <App />
      </Provider>
    </ThemeProviderComponent>
  </StrictMode>,
)
