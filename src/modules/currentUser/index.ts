import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isAuthVar, useLogout } from "../../apollo/token";

const CURRENT_USER = gql`
	query getCurrentUser {
		currentUser {
			username,
			avatar
		}
	} 
`;

export const useCurrentUserData = () => {
	const isLogin = useReactiveVar(isAuthVar);
	const logout = useLogout();

	const { data } = useQuery(CURRENT_USER, {
		skip: !isLogin
	});

	useEffect(() => {
		if (data?.currentUser === null) {
			logout();
		}
	}, [data, logout]);

	return data?.currentUser;
}