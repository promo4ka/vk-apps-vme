import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';

import Home from './panels/Home';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			viewstories: true
		};

		this.stories = this.stories.bind(this);
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	stories(e) {
		if (this.viewstories == false) {
			return;
		}
		console.log("send stories");
		var main = this;
        connect.send("VKWebAppGetAuthToken", {"app_id": 7112983, "scope": "stories"});

        connect.subscribe((e) => {
            console.log(e);
            if (e.detail.type === "VKWebAppAccessTokenReceived") {
				
				connect.send("VKWebAppCallAPIMethod", {
                    "method": "stories.getPhotoUploadServer",
                    "params": {
                        link_text: "open", link_url: "https://vk.com/app7112983", add_to_news: 1,
                        v: "5.92", "access_token": e.detail.data.access_token
                    }
                });

            } else if (e.detail.type === "VKWebAppCallAPIMethodResult") {

                axios.post("https://api.imrz.ru/stories.php", {
                    // vk_id: this.state.fetchedUser.user_id,
                    upload_url: e.detail.data.response.upload_url
                    // token: e.detail.data.access_token
				});
				
				main.setState({ viewstories: false });

            } else if (e.detail.handler === "VKWebAppGetAuthToken") {
            } else if (e.detail.type === "VKWebAppAccessTokenFailed") {
            }
        });
    }

	go = () => {
		connect.send("VKWebAppShare", {"link": "https://vk.com/app7112983"});
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} viewstories={this.state.viewstories} stories={this.stories} />
			</View>
		);
	}
}

export default App;
