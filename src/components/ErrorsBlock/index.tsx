import styles from './style.module.scss';

const ErrorsBlock = ({ errors }: { errors?: string[] | string }) => {
	if (!errors) {
		return null
	}

	if (typeof errors === 'string') {
		return (
			<div className={styles.invalidBlock}>
				<ul>
					<li>{errors}</li>
				</ul>
			</div>
		)
	}

	return (
		<div>
			<ul>
				{errors.map((error) => {
					return (
						<li>{error}</li>
					)
				})}
			</ul>
		</div>
	)
}

export default ErrorsBlock;