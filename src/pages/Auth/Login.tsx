import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Divider from "../../components/Divider";
import UIBlock from "../../components/UI/UIBlock";
import { withAuthLayout } from "./authLayout";
import styles from './style.module.scss';
import LoginForm from "./LoginForm";


const LoginPage = () => {
	return (
		<>
			<UIBlock className={styles.topBlock}>
				<FontAwesomeIcon icon={faInstagram} size="4x" className={styles.icon} />
				<LoginForm />
				<Divider>или</Divider>
				<div className={styles.facebookLogin}>
					<FontAwesomeIcon icon={faFacebookSquare} />
					<span>Войти через <a href="/">Facebook</a></span>
				</div>
			</UIBlock>
			<UIBlock className={styles.bottomBlock}>
				<span>У вас еще нет аккаунта? <Link to={ROUTES.SIGN_UP} className={styles.link}>Зарегистрироваться </Link></span>
			</UIBlock>
		</>
	)
}

export default withAuthLayout(LoginPage, { title: 'Вход в аккаунт' });