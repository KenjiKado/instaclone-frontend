import { memo } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import styles from "./style.module.scss";

interface IProps {
	url?: string,
	alt?: string,
	size?: 'lg' | 'md' | 'sm'
}

const Avatar = ({ url, alt, size = 'md' }: IProps) => {
	return (
		<div className={cx(styles.avatar, styles[size])}>
			{!!url ?
				<span><img src={url} alt={alt} /> </span> :
				<span className={styles.replacer}><FontAwesomeIcon icon={faUser} /></span>
			}
		</div>
	)
}

export default memo(Avatar);