import { ApolloCache, FetchResult, useMutation } from "@apollo/client";
import { faBookmark, faComment, faHeart as faHeartRegular, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TOGGLE_LIKE } from "../../../modules/photos/toggleLike";
import styles from "./style.module.scss";

interface IData {
	toggleLike: {
		ok: boolean,
		error?: string
	}
}

interface IProps {
	photoId: number;
	isLiked: boolean;
}

const ActionsBlock = ({ isLiked, photoId }: IProps) => {
	const updateToggleLike = (cache: ApolloCache<any>, { data }: FetchResult<IData>) => {
		if (data) {
			const { toggleLike: { ok } } = data;
			const fragmentId = `Photo:${photoId}`;
			if (ok) {
				cache.modify({
					id: fragmentId,
					fields: {
						isLiked: (prevIsLiked) => !prevIsLiked,
						likes: (prevLikes) => isLiked ? prevLikes - 1 : prevLikes + 1
					}
				})
			}
		}
	}

	const [toggleLike, { loading }] = useMutation(TOGGLE_LIKE, {
		variables: { id: photoId },
		update: updateToggleLike
	});

	const onToggleLike = () => {
		if (!loading) {
			toggleLike();
		}
	}

	return (
		<div className={styles.actions}>
			<div className={styles.actionsBlock}>
				<span onClick={onToggleLike}>
					{isLiked ?
						<FontAwesomeIcon icon={faHeartSolid} className={styles.likeIconFilled} />
						: <FontAwesomeIcon icon={faHeartRegular} />}
				</span>
				<span><FontAwesomeIcon icon={faComment} /></span>
				<span><FontAwesomeIcon icon={faPaperPlane} /></span>
			</div>
			<div className={styles.actionsBlock}>
				<FontAwesomeIcon icon={faBookmark} />
			</div>
		</div>
	)
}

export default ActionsBlock;