import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { VIEW_PHOTO_COMMENTS } from "../../../modules/comments";
import { cache } from "../../../apollo";
import { getFormattedDate } from "../../../helpers/date";
import { IPhoto } from "../../../types/IPhoto";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../../Avatar";
import CommentList from "../CommentsList";
import ActionsBlock from "../ActionsBlock";
import styles from "./style.module.scss";
import InnerText from "../InnerText";
import CommentForm from "../CommentForm";

const PostFullView = ({ photo, onClose }: { photo: IPhoto, onClose: () => void }) => {
	const { data, loading, fetchMore } = useQuery(VIEW_PHOTO_COMMENTS, { variables: { photoId: photo.id } });
	const [isMore, setIsMore] = useState(false);

	useEffect(() => {
		setIsMore(data && (photo.commentNumber > data.comments.length))
	}, [data, photo])

	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "auto";
			cache.evict({ id: "ROOT_QUERY", fieldName: "comments" });
		}
	}, []);

	const onMore = () => {
		const { comments } = data;
		fetchMore({
			variables: {
				photoId: photo.id,
				lastCommentId: comments[0].id
			}
		});
	}

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<div className={styles.post}>
						<div className={styles.photo}>
							<img src={photo.url} alt={`By ${photo.author.username}`} />
						</div>
						<div className={styles.info}>
							<header className={styles.infoHeader}>
								<Avatar url={photo.author.avatar} />
								<span className={styles.author}>{photo.author.username}</span>
							</header>
							<div className={styles.comments}>
								<div className={styles.descriptionBlock}>
									<Avatar url={photo.author.avatar} />
									<div className={styles.description}>
										<span className={styles.user}>{photo.author.username}</span>
										{photo.description && <InnerText type='comment' text={photo.description} />}
										<span className={styles.date}>{getFormattedDate(photo.createdAt)}</span>
									</div>
								</div>
								{loading && 'Loading...'}
								<CommentList
									photoId={photo.id}
									total={photo.commentNumber}
									comments={data?.comments}
									isMore={isMore}
									onMore={onMore} />
							</div>
							<div className={styles.status}>
								<ActionsBlock photoId={photo.id} isLiked={photo.isLiked} />
								<div className={styles.likes}>
									{photo.likes === 1 ? "1 отметка Нравится" :
										(Number(photo.likes.toString().slice(-1)) < 5 && Number(photo.likes.toString().slice(-1)) > 1) ? `${photo.likes} отметки Нравится` :
											`${photo.likes} отметок Нравится`}
								</div>
							</div>
							<CommentForm photoId={photo.id} lastCommentId={1} />
						</div>
					</div>
					<span className={styles.close} onClick={onClose}>
						<FontAwesomeIcon icon={faClose} />
					</span>
				</div>
				<div className={styles.overflow} onClick={onClose} />
			</div>
		</>
	)
}

export default PostFullView;