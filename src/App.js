import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Alert } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';

import Home from './panels/Home';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			viewstories: true,
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
				"https://vk.com/sticker/1-14210-512",
				"https://vk.com/sticker/1-14523-512",
				"https://vk.com/sticker/1-14217-512",
				"https://vk.com/sticker/1-12507-512",
				"https://vk.com/sticker/1-8754-512",
				"https://vk.com/sticker/1-4276-512",
				"https://vk.com/sticker/1-7156-512",
				"https://vk.com/sticker/1-13203-512",
				"https://vk.com/sticker/1-11650-512",
				"https://vk.com/sticker/1-14087-512",
				"https://vk.com/sticker/1-4073-512",
				"https://vk.com/sticker/1-9709-512",
				"https://vk.com/sticker/1-9710-512",
				"https://vk.com/sticker/1-11290-512",
				"https://vk.com/sticker/1-11288-512",
				"https://vk.com/sticker/1-11240-512",
				"https://vk.com/sticker/1-12301-512",
				"https://vk.com/sticker/1-14304-512",
				"https://vk.com/sticker/1-10881-512",
				"https://vk.com/sticker/1-13202-512",
				"https://vk.com/sticker/1-11254-512",
				"https://vk.com/sticker/1-13859-512",
				"https://vk.com/sticker/1-11616-512",
				"https://vk.com/sticker/1-4390-512",
				"https://vk.com/sticker/1-13198-512",
				"https://vk.com/sticker/1-13204-512",
				"https://vk.com/sticker/1-12298-512",
				"https://vk.com/sticker/1-12303-512",
				"https://vk.com/sticker/1-8753-512",
				"https://vk.com/sticker/1-9602-512",
				"https://vk.com/sticker/1-9607-512",
				"https://vk.com/sticker/1-9618-512",
			]
		};

		this.stories = this.stories.bind(this);
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
						if (this.viewstories === false) {
							return;
						}
	
						this.setState({ viewstories: false });
	
						axios.post("https://api.imrz.ru/stories.php", {
							upload_url: e.detail.data.response.upload_url
						});
						
						this.savepopout();
					}
					break;
				default:
					console.log(e.detail.type);
			}
		});

		connect.send('VKWebAppGetUserInfo', {});
		// connect.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#fff"});

		this.setState({
			phrase: this.getRandomPhrase(),
			stiker: this.getRandomStiker()
		});
	}

	componentWillMount() {
		
	}

	/** Получить рандомную фразу */
	getRandomPhrase = () => {
		const count = this.state.phrases.length;
		const index = this.getRandomInt(0, count);

		return this.state.phrases[index];
	}

	/** Получить рандомный стикер */
	getRandomStiker = () => {
		const count = this.state.stikers.length;
		const index = this.getRandomInt(0, count);

		console.log(index);
		return this.state.stikers[index];
	}

	
	getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	/** закрытие попапа */
	closePopout = () => {
		this.setState({ popout: null });
	}

	/** удачный попап */
	savepopout = () => {
		this.setState({ popout: <Alert onClose={this.closePopout}>
			<h2 className='hi' style={{color:"black", margin:'0px'}}>Спасибо 😏</h2>
		  </Alert> });
		setTimeout(() => { this.setState({ popout: null }) }, 1500);
	}

	/** Публикация истории */
	stories(e) {
		console.log("send stories");
        connect.send("VKWebAppGetAuthToken", {"app_id": 7112983, "scope": "stories"});
    }

	/** вызов метода поделиться (Share) */
	go = () => {
		connect.send("VKWebAppShare", {"link": "https://vk.com/heyclickme"});
	};

	render() {
		return (
			<View popout={this.state.popout} activePanel={this.state.activePanel}>
				<Home
					id="home" 
					fetchedUser={this.state.fetchedUser} 
					go={this.go} 
					viewstories={this.state.viewstories} 
					stories={this.stories}
					phrase={this.state.phrase}
					stiker={this.state.stiker}
				/>
			</View>
		);
	}
}

export default App;