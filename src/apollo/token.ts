import { makeVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export const TOKEN = 'TOKEN';
const userToken = localStorage.getItem(TOKEN);

export const isAuthVar = makeVar(!!userToken);

export const setUserToken = (token: string) => {
	if (token) {
		localStorage.setItem(TOKEN, token);
		isAuthVar(true)
	}
}

export const removeUserToken = () => {
	localStorage.removeItem(TOKEN);
	isAuthVar(false)
}

export const useLogout = () => {
	const navigate = useNavigate();

	const logout = () => {
		removeUserToken();
		navigate(ROUTES.HOME, { replace: false, state: {} });
	}

	return logout;
}