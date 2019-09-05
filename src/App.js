import React from 'react';
import connect from '@vkontakte/vkui-connect';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';
import { View, Alert, ModalRoot, ModalCard } from '@vkontakte/vkui';
import { uploadStory, getRandomInt } from './helpers';
import Icon36Like from '@vkontakte/icons/dist/36/like';

import Stiker1 from './img/1.png';
import Stiker2 from './img/2.png';
import Stiker3 from './img/3.png';
import Stiker4 from './img/4.png';
import Stiker5 from './img/5.png';

import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.yandexMetrikaId = 55137607;

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			viewstories: true,
			activeModal: null,
			disabled: false,
			popout: null,

			phrase: 'Спасибо за то, что ты есть!',
			stiker: 'https://vk.com/sticker/1-14210-512',

			phrases: [
				"спасибо за то, что ты есть!",
				"я живу только ради тебя!",
				"ты наполняешь мое сердце радостью!",
				"я дорожу тобой!",
				"я скучаю по тебе!",
				"для меня ты — целый мир!",
				"ты вдохновляешь меня!",
				"ты для меня много значишь!",
				"ты — смысл моей жизни!",
				"подари мне мечту!",
				"c тобой улечу к мечте!",
				"пиши мне, время-то идёт!",
				"мы понимаем друг друга без слов!",
				"покуда ты рядом, я буду жить!",
				"когда мы вместе, мы всех сильней!",
			],

			stikers: [
				Stiker1,
				Stiker2,
				Stiker3,
				Stiker4,
				Stiker5
			]
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				case 'VKWebAppAccessTokenReceived':
					connect.send("VKWebAppCallAPIMethod", {
						"method": "stories.getPhotoUploadServer",
						"request_id": "storiesGetUploadServer",
						"params": {
							link_text: "open", link_url: "https://vk.com/heyclickme", add_to_news: 1,
							v: "5.92", "access_token": e.detail.data.access_token
						}
					});
					break;
				case 'VKWebAppCallAPIMethodResult':
					if (e.detail.data.request_id === "storiesGetUploadServer") {
						if (this.viewstories === false && this.disabled) {
							return;
						}

						uploadStory(e.detail.data.response.upload_url)
							.then((res) => {
								this.setState({ viewstories: false, disabled: false });
								this.savepopout();
								ym('hit', `/published/story/${this.state.fetchedUser.id}`);
							}).catch((res) => {
								this.setState({ disabled: false });
								this.errorpopout();
							})
					}
					break;
				default:
					// code
			}
		});

		connect.send('VKWebAppGetUserInfo', {});

		this.setState({
			phrase: this.getRandomPhrase(),
			stiker: this.getRandomStiker()
		});
	}

	getRandomPhrase = () => {
		const count = this.state.phrases.length;
		const index = getRandomInt(0, count);

		return this.state.phrases[index || 0];
	}

	getRandomStiker = () => {
		const count = this.state.stikers.length;
		const index = getRandomInt(0, count);

		return this.state.stikers[index || 0];
	}

	closePopout = () => {
		this.setState({ popout: null });
	}

	savepopout = () => {
		this.setState({ popout: <Alert onClose={this.closePopout}>
			<h2 className='hi' style={{color:"black", margin:'0px'}}>
				Спасибо <span role="img" aria-label="Smile">😏</span></h2>
		  </Alert> });
		setTimeout(() => { this.setState({ popout: null }) }, 1500);
	}

	errorpopout = () => {
		this.setState({ popout: <Alert onClose={this.closePopout}>
			<h2 className='hi' style={{color:"black", margin:'0px'}}>Ошибка</h2>
		  </Alert> });
		setTimeout(() => { this.setState({ popout: null }) }, 1500);
	}

	setActiveModal = (activeModal) => {
		this.setState({ activeModal });
	}

	stories = () => {
        if (this.state.disabled === false) {
			this.setState({ disabled: true });
			connect.send("VKWebAppGetAuthToken", {"app_id": 7112983, "scope": "stories"});
		}
    }

	share = () => {
		console.info("send share");
		connect.send("VKWebAppShare", {"link": "https://vk.com/heyclickme"});
		ym('hit', `/share/${this.state.fetchedUser.id}`);
	};

	render() {
		const actions = [{
			title: 'Понятно',
			type: 'primary',
			action: () => {
				this.setActiveModal(null);
			}
		}];
		
		if (this.state.viewstories) {
			actions.push({
				title: 'Поддержать историей',
				type: this.state.viewstories ? 'primary' : 'secondary',
				action: () => {
					this.setActiveModal(null);
					this.stories();
				}
			});
		}

		const modal = (
			<ModalRoot activeModal={this.state.activeModal}>
				<ModalCard
					id="user-info"
					onClose={() => this.setActiveModal(null)}
					icon={<Icon36Like />}
					title="Если тебе прислали ссылку на сервис, значит ты важен этому человеку."
					caption="Вместо тысячи слов - отправь ссылку тому, кто тебе небезразличен."
					actionsLayout="vertical"
					actions={ actions }
				></ModalCard>
			</ModalRoot>
		);

		return (
			<>
				<YMInitializer accounts={[this.yandexMetrikaId]} />
				<View popout={this.state.popout} activePanel={this.state.activePanel} modal={modal}>
					<Home
						id="home" 
						fetchedUser={this.state.fetchedUser} 
						share={this.share} 
						viewstories={this.state.viewstories} 
						stories={this.stories}
						phrase={this.state.phrase}
						stiker={this.state.stiker}
						setActiveModal={ this.setActiveModal }
					/>
				</View>
			</>
		);
	}
}

export default App;
