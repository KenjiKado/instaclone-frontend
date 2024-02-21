import { gql, useMutation } from "@apollo/client";
import Dropzone from "react-dropzone";
import { withLayout } from "../../hoc/Layout";


const UploadComponent = (props: any) => {

	const EDIT_PROFILE = gql`
		mutation editProfile ($avatar: Upload!) {
			editProfile(avatar: $avatar) {
				ok
				error
			}
		}
	`;
	const [editProfile] = useMutation(EDIT_PROFILE, {
		onCompleted: (result) => {
			console.log(result)
		}
	})

	const onFileChange = (file: any) => {

		editProfile({
			variables: {
				avatar: file
			}
		})
	}

	return (
		<>
			<form>
				<Dropzone
					accept="image/jpeg, image/png"
					multiple={false}
					onDrop={([file]) => {
						console.log(file)
						onFileChange(file)
					}}
					{...props}
				>
					{({ getRootProps, getInputProps }) => (
						<section>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<p>Drag 'n' drop some files here, or click to select files</p>
							</div>
						</section>
					)}
				</Dropzone>
				<input type="submit" />
			</form>
		</>

	);
}

export default withLayout(UploadComponent);