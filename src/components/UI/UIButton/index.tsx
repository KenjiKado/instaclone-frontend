import { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, memo } from 'react';
import cx from 'classnames';
import styles from './style.module.scss';

interface IProps {
	children?: ReactNode;
	onClick?: (e: (MouseEvent | KeyboardEvent)) => void;
	onBlur?: (e: FocusEvent) => void;
	className?: string | string[];
	title?: string;
	type?: 'button' | 'submit' | 'reset';
	apperance?: 'default' | 'link'
	disabled?: boolean;
	loading?: boolean;
}

const UIButton = ({ children, onClick, onBlur, className, title, apperance = 'default', type = 'button', disabled = false, loading = false }: IProps) => {
	return (
		<button
			onClick={onClick}
			onBlur={onBlur}
			title={title}
			type={type}
			className={cx(styles.btn, className, styles[apperance], {
				[styles.disabled]: disabled,
				[styles.loading]: loading,
			})}
			disabled={disabled}>
			{children}
		</button>
	)
}

export default memo(UIButton);