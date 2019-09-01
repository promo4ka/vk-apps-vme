import axios from 'axios';
import storyImage from './img/story.jpg';

const apiStory = "https://api.imrz.ru/stories.php";

export const uploadStory = async (uploadUrl) => {
    console.info("send stories");

    return await axios.post(apiStory, {
        upload_url: uploadUrl
    })
}

export const uploadStoryImage = async (uploadUrl, callback) => {
    const file = await fetch(storyImage)
        .then(res => res.blob())
        .then(blob => {
            return new File([blob], "story.jpg", {
                type: 'image/png'
            })
        });

    const request = new FormData();
    request.append('file', file);

    return await fetch(uploadUrl, {
        method: "POST",
        // body: request
    })
}

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}