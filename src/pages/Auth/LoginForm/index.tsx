import { useMutation, useQuery } from "@apollo/client";
import { client } from "../../../apollo";
import { setUserToken } from "../../../apollo/token";
import ErrorsBlock from "../../../components/ErrorsBlock";
import SuccessMessage from "../../../components/SuccessMessage";
import UIButton from "../../../components/UI/UIButton";
import UIForm from "../../../components/UI/UIForm";
import UIInput from "../../../components/UI/UIInput";
import { IS_REGISTER, LOGIN_MUTATION } from "../../../modules/auth";

interface IData {
	username: string;
	password: string;
}

interface IResponse {
	login: {
		ok: boolean;
		error?: string;
		token: string;
	}
}


const LoginForm = () => {
	const onCompleted = async ({ login: { ok, token } }: IResponse) => {
		if (ok) {
			setUserToken(token)
		}

		await client.resetStore();
	}

	const [login, { data, loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
	const { data: { isUserRegister = false, message = null } = {} } = useQuery(IS_REGISTER);

	const onSubmit = ({ username, password }: IData) => {
		if (!loading) {
			login({
				variables: {
					username,
					password
				}
			})
		}
	}

	return (
		<UIForm onSubmit={onSubmit}>
			{({ register, errors, isDisabled }) => {
				return (
					<>
						<ErrorsBlock errors={data?.login.error} />
						{isUserRegister && <SuccessMessage message={message} />}
						<UIInput
							register={register}
							name="username"
							type="text"
							placeholder="Имя пользователя"
							validation={{
								required: "Необходимо заполнить имя пользователя"
							}}
							errors={errors}
						/>
						<UIInput
							register={register}
							name="password"
							type="password"
							placeholder="Пароль"
							validation={{
								required: "Необходимо ввести пароль"
							}}
							errors={errors}
						/>
						<UIButton type="submit" disabled={isDisabled} loading={loading}>Войти</UIButton>
					</>
				)
			}}
		</UIForm>
	)
}

export default LoginForm;