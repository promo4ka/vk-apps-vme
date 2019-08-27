import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Cell, Div, Avatar, PanelHeader } from '@vkontakte/vkui';
import "./Home.css";

const Home = ({ id, go, fetchedUser, stories, viewstories }) => (
	<Panel id={id}>
		{/* <PanelHeader theme="light"></PanelHeader> */}
		<Div className="wrapper">
			<h1 className="mh1">{fetchedUser && fetchedUser.first_name},</h1>
			<h2 className="mh2">спасибо за то,<br /> что ты есть!</h2>
			<p className="heart">❤</p>
		</Div>

		<Div className="center">
			<Button size="xl" level="commerce" onClick={go} size="l">Отправить дальше</Button>
		</Div>

		{viewstories && 
		<Div className="mfooter center">
			<Div className="stories-text">Вы можете поддержать идею, опубликовав историю.</Div>
			<Button level="secondary" onClick={stories} size="l">Поддержать историей</Button>
		</Div>}
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	viewstories: PropTypes.bool.isRequired,
	stories: PropTypes.func.isRequired,
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
