import { gql } from "@apollo/client";

export const VIEW_FEED = gql`
	query viewFeed($lastId: Int) {
		viewFeed(lastId: $lastId) {
			id
			author {
				username
				avatar
			}
			url
			description
			isMine
			isLiked
			likes
			commentNumber
			createdAt
			updatedAt
		}
	}
`;