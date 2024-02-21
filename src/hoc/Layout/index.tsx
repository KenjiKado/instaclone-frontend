import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentType } from "react";
import { useCurrentUserData } from "../../modules/currentUser";
import Avatar from "../../components/Avatar";
import styles from "./style.module.scss";

export const withLayout = (Component: ComponentType) => {
	return () => {
		const currentUser = useCurrentUserData();
		return (
			<>
				<header className={styles.header}>
					<div className={styles.wrapper}>
						<div>
							<FontAwesomeIcon icon={faInstagram} size="2x" />
						</div>

						<div>
							{currentUser?.avatar ? <Avatar url={currentUser.avatar} /> : <FontAwesomeIcon icon={faUser} size="2x" />}
						</div>
					</div>
				</header>
				<div className={styles.container}>
					<Component />
				</div>
			</>
		)
	}
}