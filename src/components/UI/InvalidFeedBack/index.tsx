import styles from './style.module.scss';

interface IProps {
	name: string;
	errors?: { [key: string]: { message: string } }
}

const InvalidFeedback = ({ name, errors }: IProps) => {
	if (!errors || !errors[name]) {
		return null
	}
	return (
		<div className={styles.invalidMessage}>
			{errors[name].message}
		</div>
	)
}

export default InvalidFeedback;