import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './main.css'
import store from './redux/store/store.js'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')

createRoot(rootElement).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)
