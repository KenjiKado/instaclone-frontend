import React, { KeyboardEvent } from 'react';
import cx from 'classnames';
import styles from './style.module.scss';
import InvalidFeedback from '../InvalidFeedBack';

interface IProps {
	register: any;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onChange?: (event: any) => void;
	className?: string;
	placeholder?: string;
	name: string;
	isRequired?: boolean;
	validation?: { [key: string]: any };
	showErrors?: boolean;
	errors?: any;
	disabled?: boolean;
	type?: string;
	onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
	maxLength?: number;
	id?: string;
}

const UITextarea = ({
	register,
	onBlur,
	onFocus,
	onChange,
	className,
	placeholder,
	name,
	validation,
	showErrors,
	errors,
	disabled,
	type,
	onKeyPress,
	maxLength,
	id
}: IProps) => {
	const handleChange = (e: any) => {
		if (onChange) {
			onChange(e.target.value)
		}
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (onBlur) {
			onBlur(e)
		}
	}

	return (
		<div className={styles.wrapper}>
			<textarea
				{...register(name, {
					...validation,
					onBlur: (e: React.FocusEvent<HTMLInputElement>) => handleBlur(e),
					onChange: (e: React.MouseEvent<HTMLInputElement>) => handleChange(e),
				})}
				id={id}
				name={name}
				placeholder={placeholder}
				type={type}
				onFocus={onFocus}
				onKeyPress={onKeyPress}
				maxLength={maxLength}
				className={cx(styles.textarea, {
					[styles.error]: errors && errors[name]
				}, className)}
				disabled={disabled}
			/>
			{showErrors && <InvalidFeedback name={name} errors={errors} />}
		</div>
	)
}

export default UITextarea;