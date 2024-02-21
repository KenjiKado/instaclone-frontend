import { useQuery } from "@apollo/client";
import Posts from "../../components/Posts";
import { withLayout } from "../../hoc/Layout";
import { VIEW_FEED } from "../../modules/photos/viewFeed";


const Home = () => {

	return (
		<>
			<Posts />
		</>

	);
}

export default withLayout(Home);