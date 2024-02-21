import { gql } from "@apollo/client";

export const VIEW_PHOTO_COMMENTS = gql`
	query comments ($photoId: Int!, $lastCommentId: Int) {
		comments (photoId: $photoId, lastCommentId: $lastCommentId){
			id
			user {
				avatar
				username
			}
			text
			createdAt
			isMine
		}
	}
`;

export const CREATE_COMMENT_MUTATION = gql`
	mutation createComment ($photoId: Int!, $text: String!) {
		createComment(photoId: $photoId, text: $text) {
			ok
			id
			error
		}
	}
`