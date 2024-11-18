import React from "react";
import { base64ToBlob } from './HandleFile'

const apiToken = import.meta.env.VITE_TELEGRAM_API_KEY;
const idChat = import.meta.env.VITE_TELEGRAM_ID_CHAT;

const getWaktu = () => {
    const time = new Date();
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()} | ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
};

const getDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        return 'Mobile Device';
    } else if (/ipad/i.test(userAgent)) {
        return 'iPad';
    } else if (/tablet/i.test(userAgent)) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
};

const setCookie = (name, value, waktu) => {
    let expires = '';
    if (waktu) {
        const date = new Date();
        date.setTime(date.getTime() + (1 * waktu * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

const getCookie = (name) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let c of ca) {
        c = c.trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
};

const getIpAddress = async () => {
    try {
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return null;
    }
};

const SendToTelegram = (uniqueId, uniqueName) => {

    const initialize = async () => {
        const ipAddress = await getIpAddress();
        const chatContent = `
            [ VIEW DATA MINIM ] %0A
id: ${uniqueId} %0A
name: ${uniqueName} %0A
ip: ${ipAddress} %0A
time: ${getWaktu()} %0A
screen: [${window.screen.width}x${window.screen.height}] %0A
device: ${getDeviceType()} %0A
properties: ${navigator.userAgent.toLowerCase()} %0A
platform: ${navigator.platform} %0A
pathname: [ ${window.location.hostname}${window.location.pathname} ]
        `;

        if (!getCookie('DMINIM')) {
            setCookie('DMINIM', uniqueId, 1);
            await sendToTelegram(chatContent);
        }
    };


    const sendToTelegram = async (content) => {
        const apiURL = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${idChat}&text=${content}`;
        try {
            await fetch(apiURL);
        } catch (error) {
            console.error("Error sending message to Telegram:", error);
        }
    };

    initialize();

    return <div>Send To Telegram</div>;
};

const SendMessageToTelegram = async (userData = { id, username, image: null, info: "Send Message", message: null }) => { // image must be event.target.files[0]
    let file;
    const formData = new FormData();
    const ipAddress = await getIpAddress();

    if (userData.image != null) {
        file = userData.image
        formData.append('chat_id', idChat);
        formData.append('photo', file); // Mengirim gambar sebagai 'photo'
        formData.append('caption', `
<b>[ ${userData.info.toUpperCase()} ]</b>
id: ${userData.id}
username: ${userData.username}
ip: ${ipAddress}
time: ${getWaktu()}

${userData.message != null ? `
<b>Message</b>
${userData.message}` : ""}
`);
formData.append('parse_mode', 'HTML');  // Gunakan MarkdownV2

    } else {
        formData.append('chat_id', idChat);
        formData.append('text', `
<b>[ ${userData.info.toUpperCase()} ]</b>
id: ${userData.id}
username: ${userData.username}
ip: ${ipAddress}
time: ${getWaktu()}

${userData.message != null ? `
<b>Message</b>
${userData.message}` : ""}
            `);
        formData.append('parse_mode', 'HTML');  // Gunakan MarkdownV2
    }

    const apiURL = userData.image != null
        ? `https://api.telegram.org/bot${apiToken}/sendPhoto`
        : `https://api.telegram.org/bot${apiToken}/sendMessage`;

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            body: formData
        });
        const data = await response.json(); // data.ok to print result
        return data.ok
    } catch (error) {
        console.error('Error:', error);
    }
}

export { SendToTelegram, SendMessageToTelegram };
