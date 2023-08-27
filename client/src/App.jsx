import { Route, Routes, useLocation } from 'react-router-dom'
import { Detail, Form, Home, Landing, Nav } from './views'

const App = () => {
	const { pathname } = useLocation()

	return (
		<>
			{pathname !== '/' && <Nav />}

			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path="/create" element={<Form />} />
			</Routes>
		</>
	)
}

export default App
