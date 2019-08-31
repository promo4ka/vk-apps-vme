import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Div } from '@vkontakte/vkui';
import "./Home.css";

const Home = ({ id, go, fetchedUser, stories, viewstories, phrase, stiker }) => (
	<Panel id={id} className="m__panel">
		<Div className="m__wrapper">
			<h1 className="m__h1">{fetchedUser ? fetchedUser.first_name : 'Привет'},</h1>
			<h2 className="m__h2">{phrase}</h2>
			<p className="m__stiker">
				<img src={stiker} alt="stiker" />
			</p>
		</Div>

		<Div>
			<div className="m__button" onClick={go}>Отправить дальше</div>
		</Div>

		{viewstories && 
		<Div className="mfooter">
			<div className="m__footer__button" onClick={stories}>Поддержать историей</div>
			{/* <Div className="stories-text">Вы можете поддержать идею, опубликовав историю.</Div> */}
		</Div>}
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	viewstories: PropTypes.bool.isRequired,
	stories: PropTypes.func.isRequired,
	phrase: PropTypes.string.isRequired,
	stiker: PropTypes.string.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
