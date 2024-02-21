import { useReactiveVar } from "@apollo/client";
import {
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Home from "./pages/Home";
import LoginPage from "./pages/Auth/Login";
import RegistrationPage from "./pages/Auth/Registration";
import { isAuthVar } from "./apollo/token";

const App = () => {
	const isAuth = useReactiveVar(isAuthVar);

	return (
		<Routes>
			<Route path={ROUTES.HOME} element={
				isAuth ? <Home /> : <LoginPage />
			} />
			<Route path={ROUTES.SIGN_UP} element={
				isAuth ? <Navigate to={ROUTES.HOME} replace /> : <RegistrationPage />
			} />
			<Route path="*" element={
				<Navigate to={ROUTES.HOME} replace />
			} />
		</Routes>
	);
}

export default App;
