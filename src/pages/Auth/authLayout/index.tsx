import { ComponentType } from "react"
import { Helmet } from "react-helmet-async"
import styles from './style.module.scss';

interface IProps {
	title?: string;
}
export const withAuthLayout = (Component: ComponentType, { title }: IProps) => {
	return () => {
		return (
			<div className={styles.container}>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<div className={styles.wrapper}>
					<Component />
				</div>
			</div>
		)
	}
}