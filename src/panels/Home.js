import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Cell, Div, Avatar, PanelHeader } from '@vkontakte/vkui';
import "./Home.css";

const Home = ({ id, go, fetchedUser, stories, viewstories }) => (
	<Panel id={id}>
		<PanelHeader>{fetchedUser && fetchedUser.first_name}</PanelHeader>
		<Div className="wrapper">
			<h1 className="mh1">Спасибо за то,</h1>
			<h2 className="mh2">что ты есть</h2>
			<p className="heart">❤</p>
		</Div>

		<Div className="center">
			<Button level="outline" onClick={go} size="l">Отправить дальше</Button>
		</Div>

		{viewstories && 
		<Div className="mfooter center">
			<Button level="tertiary" onClick={stories} size="l">Поддержать историей</Button>
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
