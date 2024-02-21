import { IComment } from "../../../types/IComment";
import CommentItem from "./CommentItem";
import MoreButton from "./MoreButton";
import styles from "./style.module.scss";

interface IProps {
	photoId: number;
	comments: IComment[];
	total: number;
	isMore: boolean;
	onMore: () => void;
}

const CommentList = ({ photoId, comments, total, isMore, onMore }: IProps) => {
	return (
		<>
			{
				comments &&
				<div className={styles.list}>
					{isMore && <MoreButton onClick={onMore} />}
					{comments.map((comment: IComment, i: number) => <CommentItem comment={comment} key={comment.id} />)}
				</div>
			}
		</>
	)
}

export default CommentList;