import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

import styles from './style.module.scss';

interface IProps {
	onClick: () => void;
}

const MoreButton = ({ onClick }: IProps) => {
	return (
		<div className={styles.more}>
			<button className={styles.icon} onClick={onClick}><FontAwesomeIcon icon={faPlus} /></button>
		</div>
	)
}

export default memo(MoreButton);