import { memo } from "react";
import { getFormattedDate } from "../../../../helpers/date";
import { IComment } from "../../../../types/IComment";
import Avatar from "../../../Avatar";
import InnerText from "../../InnerText";
import styles from './style.module.scss';

interface IProps {
	comment: IComment,
}
const CommentItem = ({ comment }: IProps) => {
	return (
		<div className={styles.commentBlock}>
			<Avatar url={comment.user.avatar} />
			<div className={styles.comment}>
				<span className={styles.user}>{comment.user.username}</span>
				<InnerText type="comment" text={comment.text} />
				<span className={styles.date}>{getFormattedDate(comment.createdAt)}</span>
			</div>
		</div>
	)
}

export default memo(CommentItem);