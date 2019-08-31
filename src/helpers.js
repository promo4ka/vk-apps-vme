import axios from 'axios';

const apiStory = "https://api.imrz.ru/stories.php";

export const uploadStory = async (uploadUrl) => {
    return await axios.post(apiStory, {
        upload_url: uploadUrl
    })
}