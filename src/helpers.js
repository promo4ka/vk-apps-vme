import axios from 'axios';

const apiStory = "https://api.imrz.ru/stories.php";

export const uploadStory = async (uploadUrl) => {
    console.info("send stories");

    return await axios.post(apiStory, {
        upload_url: uploadUrl
    })
}

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}