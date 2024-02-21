import { ApolloCache, FetchResult, useMutation } from "@apollo/client";
import { useRef } from "react";
import { CREATE_COMMENT_MUTATION } from "../../../modules/comments";
import { useCurrentUserData } from "../../../modules/currentUser";
import UIButton from "../../UI/UIButton";
import UIForm from "../../UI/UIForm";
import UITextarea from "../../UI/UITextarea";
import styles from "./style.module.scss";

interface IResponse {
	createComment: {
		ok: boolean;
		id: number;
		errors?: string;
	}
}

type UIFormRef = React.ElementRef<typeof UIForm>;


const CommentForm = ({ photoId, lastCommentId = 0 }: { photoId: number, lastCommentId?: number }) => {
	const formRef = useRef<UIFormRef>(null);
	const currentUser = useCurrentUserData()

	const onCompleted = ({ createComment: { ok } }: IResponse) => {
		if (ok) {
			formRef.current?.setValue('comment', '');
		}
	}

	const onUpdate = (cache: ApolloCache<any>, result: FetchResult<IResponse>) => {
		if (result && result.data) {
			const { data: { createComment: { ok, id } } } = result;
			if (ok) {
				const newComment = {
					__typename: 'Comment',
					id,
					photo: {
						__ref: `Photo:${photoId}`
					},
					createdAt: Date.now() + '',
					text: formRef.current?.getValues('comment'),
					user: {
						...currentUser
					},
					isMine: true
				};

				cache.modify({
					fields: {
						comments(existing = []) {
							return [
								...existing,
								newComment,
							]
						}
					}
				});

				cache.modify({
					id: `Photo:${photoId}`,
					fields: {
						commentNumber(data) {
							return data + 1;
						}
					}
				})
			}
		}
	}

	const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
		onCompleted,
		update: onUpdate,
	});

	const onSubmit = ({ comment }: { comment: string }) => {
		if (!loading) {
			createComment({
				variables: {
					photoId,
					text: comment
				}
			})
		}
	}

	return (
		<div className={styles.commentForm}>
			<UIForm ref={formRef} onSubmit={onSubmit}>
				{({ register, isDisabled }) => {
					return (
						<>
							<UITextarea
								name="comment"
								register={register}
								placeholder="Добавьте комментарий..."
								validation={{
									required: true
								}} />
							<UIButton
								apperance="link"
								type="submit"
								disabled={isDisabled}
								className={styles.send}>Опубликовать</UIButton>
						</>
					)
				}}
			</UIForm>
		</div>
	)
}

export default CommentForm;