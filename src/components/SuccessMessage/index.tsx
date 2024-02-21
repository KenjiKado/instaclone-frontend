import styles from './style.module.scss'

const SuccessMessage = ({ message }: { message?: string }) => {
	if (!message) {
		return null;
	}
	return (
		<div className={styles.message}>
			{message}
		</div>
	)
}

export default SuccessMessage;