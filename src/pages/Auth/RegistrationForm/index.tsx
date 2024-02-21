import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom'
import ErrorsBlock from "../../../components/ErrorsBlock";
import UIButton from "../../../components/UI/UIButton";
import UIForm from "../../../components/UI/UIForm";
import UIInput from "../../../components/UI/UIInput";
import { ROUTES } from "../../../constants/routes";
import { CREATE_ACCOUNT, setIsRegister } from "../../../modules/auth";


interface IData {
	email: string;
	firstName: string;
	lastName?: string;
	username: string;
	password: string;
}

interface IResponse {
	createAccount: {
		ok: boolean;
		error?: string;
	}
}

const RegistrationForm = () => {
	const navigate = useNavigate();

	const onCompleted = ({ createAccount: { ok } }: IResponse) => {
		if (ok) {
			navigate(ROUTES.HOME, { replace: true },);

			setIsRegister(true, "Вы были успешно зарегистрированы в системе. \n Пожалуйста войдите используя свой логин и пароль");
		}
	};

	const [createAccount, { data, loading }] = useMutation(CREATE_ACCOUNT, { onCompleted });

	const onSubmit = (values: IData) => {
		if (!loading) {
			createAccount({
				variables: values
			});
		}
	}

	return (
		<UIForm onSubmit={onSubmit}>
			{({ register, errors, isDisabled }) => (
				<>
					<ErrorsBlock errors={data?.createAccount.error} />
					<UIInput
						name="email"
						register={register}
						type="email"
						placeholder="Эл. адрес"
						validation={{
							required: "Необходимо ввести email"
						}}
						errors={errors}
					/>
					<UIInput
						name="firstName"
						register={register}
						type="text"
						placeholder="Имя"
						validation={{
							required: "Введите свое имя"
						}}
						errors={errors}
					/>
					<UIInput
						name="lastName"
						register={register}
						type="text"
						placeholder="Фамилия"
					/>
					<UIInput
						name="username"
						register={register}
						type="text"
						placeholder="Имя пользователя"
						validation={{
							required: "Необходимо заполнить имя пользователя"
						}}
						errors={errors}
					/>
					<UIInput
						name="password"
						register={register}
						type="password"
						placeholder="Пароль"
						validation={{
							required: "Необходимо ввести пароль",
							minLength: {
								value: 6,
								message: "Пароль должен быть не менее 6 символов"
							}
						}}
						errors={errors}
					/>
					<UIButton type="submit" disabled={isDisabled}>Регистрация</UIButton>
				</>
			)}
		</UIForm>
	)
}

export default RegistrationForm;