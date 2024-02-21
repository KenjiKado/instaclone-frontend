import { memo, useState } from "react";
import { IPhoto } from "../../../types/IPhoto"
import Avatar from "../../Avatar";
import ActionsBlock from "../ActionsBlock";
import CommentForm from "../CommentForm";
import InnerText from "../InnerText";
import PostFullView from "../PostFullView";

import styles from "./style.module.scss";

interface IProps {
	photo: IPhoto
}

const PostItem = ({ photo }: IProps) => {
	const [isFullView, setIsFullView] = useState(false);

	return (
		<div className={styles.photo}>
			<div className={styles.header}>
				<Avatar url={photo.author.avatar} alt={photo.author.username} size="lg" />
				<span>{photo.author.username}</span>
			</div>
			<div className={styles.content} onClick={() => setIsFullView(true)}>
				<img src={photo.url} alt={photo.description} />
			</div>
			<div className={styles.footer}>
				<ActionsBlock photoId={photo.id} isLiked={photo.isLiked} />
				<div className={styles.likes}>
					{photo.likes === 1 ? "1 отметка Нравится" :
						(Number(photo.likes.toString().slice(-1)) < 5 && Number(photo.likes.toString().slice(-1)) > 1) ? `${photo.likes} отметки Нравится` :
							`${photo.likes} отметок Нравится`}
				</div>
				<div className={styles.photoDescription}>
					<span className={styles.user}>{photo.author.username}</span>
					{!!photo.description && <InnerText onMore={() => setIsFullView(true)} text={photo.description} />}
				</div>
				{!!photo.commentNumber &&
					<div className={styles.commentsNumber} onClick={() => setIsFullView(true)}>
						{photo.commentNumber === 1 ? "Посмотреть 1 комментарий" : `Просмотреть все комментарии (${photo.commentNumber})`}
					</div>}
			</div>
			<CommentForm photoId={photo.id} />
			{isFullView && <PostFullView photo={photo} onClose={() => setIsFullView(false)} />}
		</div>
	)
}

export default memo(PostItem);