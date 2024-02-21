import InfiniteScroll from 'react-infinite-scroller';
import { QueryResult, useQuery } from "@apollo/client";
import { VIEW_FEED } from "../../modules/photos/viewFeed";
import { IPhoto } from "../../types/IPhoto";
import PostItem from "./PostItem";
import { memo, useState } from 'react';

interface IData extends QueryResult {
	data: {
		viewFeed: IPhoto[]
	},

}

const Posts = () => {
	const [hasMore, setHasMore] = useState(true);
	const { data: { viewFeed: photos } = {}, fetchMore } = useQuery(VIEW_FEED) as IData;

	const loadMore = () => {
		fetchMore({
			variables: {
				lastId: photos?.length ? photos[photos?.length - 1].id : 0
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				setHasMore(!!fetchMoreResult.viewFeed.length)
				if (!fetchMoreResult) return prev;
				if (prev && prev?.viewFeed) {
					return {
						viewFeed: [...prev.viewFeed, ...fetchMoreResult.viewFeed]
					}
				}

			},
		});
	}

	return (
		<div>
			<InfiniteScroll
				loadMore={loadMore}
				hasMore={hasMore}
				initialLoad={false}
				loader={<div className="loader" key={0}>Loading ...</div>}
			>
				<>
					{photos?.map((photo: IPhoto) => (
						<PostItem photo={photo} key={photo.id} />
					))}
				</>
			</InfiniteScroll>
		</div>
	)
}

export default memo(Posts);