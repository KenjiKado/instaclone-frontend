import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import UIBlock from "../../components/UI/UIBlock";
import { ROUTES } from "../../constants/routes";
import { withAuthLayout } from "./authLayout";
import RegistrationForm from "./RegistrationForm";
import styles from './style.module.scss';

const RegistrationPage = () => {
	return (
		<>
			<UIBlock className={styles.topBlock}>
				<FontAwesomeIcon icon={faInstagram} size="4x" className={styles.icon} />
				<span className={styles.title}>Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.</span>
				<RegistrationForm />
			</UIBlock>
			<UIBlock className={styles.bottomBlock}>
				<span>Уже есть аккаунт? <Link to={ROUTES.HOME} className={styles.link}>Войти </Link></span>
			</UIBlock>
		</>
	)
}

export default withAuthLayout(RegistrationPage, { title: 'Регистрация' });