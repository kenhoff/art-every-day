import ImageGrid from "../components/ImageGrid.jsx";
import InspirationImage from "../components/InspirationImage.jsx";
import React, {PropTypes} from "react";
import UploadCTA from "../components/UploadCTA.jsx";

class Dashboard extends React.Component {
	render() {
		return (
			<div>
				<InspirationImage></InspirationImage>
				<UploadCTA></UploadCTA>
				<ImageGrid></ImageGrid>
			</div>
		);
	}
}

Dashboard.propTypes = {
	currentDate: PropTypes.string
};

export default Dashboard;
