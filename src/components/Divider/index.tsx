import { ReactNode } from "react";
import styles from './style.module.scss';

interface IProps {
	children: ReactNode;
}

const Divider = ({ children }: IProps) => {
	return (
		<div className={styles.divider}>
			<span>{children}</span>
		</div>
	)
}

export default Divider;