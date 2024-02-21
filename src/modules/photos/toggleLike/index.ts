import { gql } from "@apollo/client";

export const TOGGLE_LIKE = gql`
	mutation toggleLike ($id: Int!) {
		toggleLike (id: $id) {
			ok
			error
		}
	}
`;

export const LIKE_FRAGMENT = gql`
	fragment LikeFragment on Photo {
		isLiked
		likes
	}
`;