import { ReactNode } from "react";
import cx from 'classnames';
import styles from './style.module.scss'

interface IProps {
	children: ReactNode;
	className?: string | string[];
}

const UIBlock = ({ children, className }: IProps) => {
	return (
		<div className={cx(styles.block, className)}>
			{children}
		</div>
	)
}

export default UIBlock;