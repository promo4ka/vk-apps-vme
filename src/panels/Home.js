import React from 'react';
import { Panel, PanelHeader, HeaderButton, Div } from '@vkontakte/vkui';
import Icon24Info from '@vkontakte/icons/dist/24/info';

import "./Home.css";

class Home extends React.Component {
	render() {
		const {
			id,
			share,
			viewstories,
			stories,
			phrase,
			stiker,
			fetchedUser,
			setActiveModal
		} = this.props;

		return (
			<Panel id={id} className="m__panel">
				<PanelHeader 
					left={<HeaderButton onClick={() => setActiveModal('user-info') }><Icon24Info /></HeaderButton>}
					noShadow={true}
				/>
				<Div className="m__wrapper">
					<h1 className="m__h1">{fetchedUser ? fetchedUser.first_name : 'Привет'},</h1>
					<h2 className="m__h2">{phrase}</h2>
					<p className="m__stiker">
						<img src={stiker} alt="stiker" />
					</p>
				</Div>

				<Div>
					<div className="m__button" onClick={share}>Отправить дальше</div>
				</Div>

				{viewstories && 
				<Div className="mfooter">
					<div className="m__footer__button" onClick={stories}>Поддержать историей</div>
					{/* <Div className="stories-text">Вы можете поддержать идею, опубликовав историю.</Div> */}
				</Div>}
			</Panel>
		)
	}
}

export default Home;
