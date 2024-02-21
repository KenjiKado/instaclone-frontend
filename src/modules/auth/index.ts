import { gql } from "@apollo/client";
import { cache } from "../../apollo";

export const LOGIN_MUTATION = gql`
		mutation login($username: String!, $password: String!) {
			login(username: $username, password: $password) {
				ok
				error
				token
			}
		}
	`;

export const CREATE_ACCOUNT = gql`
	mutation createAccount(
		$email: String!,
		$firstName: String!,
		$lastName: String!,
		$username: String!,
		$password: String!
	) {
		createAccount(
			email: $email,
			firstName: $firstName,
			lastName: $lastName,
			username: $username,
			password: $password,
		) {
			ok
			error
		}
	}
`;

export const IS_REGISTER = gql`
  query IsUserRegister {
    isUserRegister @client
		message @client
  }
`;

export const setIsRegister = (isUserRegister: boolean, message: string | null) => {
	cache.writeQuery({
		query: IS_REGISTER,
		data: {
			isUserRegister,
			message,
		},
	});
}