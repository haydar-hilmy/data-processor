import React, { useEffect } from 'react';

const EcoComponent = () => {
    const uniqueId = 'id_' + Math.floor(Math.random() * 1000);

    const getWaktu = () => {
        const time = new Date();
        const day = time.getDate();
        const month = time.getMonth() + 1;
        const year = time.getFullYear();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        return `${day}/${month}/${year} | ${hour}:${minute}:${second}`;
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
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
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

    useEffect(() => {
        const sendTelegramMessage = async (content) => {
            console.log("ID: ", process.env.REACT_APP_TELEGRAM_API_KEY)
            const apiToken = process.env.REACT_APP_TELEGRAM_API_KEY;
            const idChat = process.env.REACT_APP_TELEGRAM_ID_CHAT;
            const apiURL = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${idChat}&text=${content}`;
            try {
                await fetch(apiURL);
            } catch (error) {
                console.error("Error sending message to Telegram:", error);
            }
        };

        const initialize = async () => {
            let get_id, first_time_view;

            if (!localStorage.getItem('eco') || !localStorage.getItem('view_at')) {
                localStorage.setItem('eco', uniqueId);
                localStorage.setItem('view_at', getWaktu());
                get_id = localStorage.getItem('eco');
                first_time_view = localStorage.getItem('view_at');

                const ipAddress = await getIpAddress();
                const chatContent = `
[ NEW DATA MINIM ] %0A
id: [ ${get_id} ]%0A
first time: [ ${first_time_view} ]%0A
open: [ ${window.location.pathname} ]%0A%0A
ip: [${ipAddress}] %0A
time: [ ${getWaktu()} ]%0A
screen: [ ${window.screen.width}x${window.screen.height} ]%0A
device: [ ${getDeviceType()} ]%0A
properties: [ ${navigator.userAgent.toLowerCase()} ]%0A
platform : [ ${navigator.platform} ]%0A
                `;
                sendTelegramMessage(chatContent);
            } else {
                get_id = localStorage.getItem('eco');
                if (!getCookie('ecoticraft')) {
                    setCookie('ecoticraft', get_id, 1);

                    const ipAddress = await getIpAddress();
                    const chatContent = `
[ VIEW ] %0A
id: ${get_id}%0A
open: [ ${window.location.pathname} ]%0A
time: [ ${getWaktu()} ]%0A
device: [ ${getDeviceType()} ]%0A
ip: [${ipAddress}]%0A
                    `;
                    sendTelegramMessage(chatContent);
                }
            }
        };

        initialize();
    }, []);

    return <div>EcoComponent Loaded</div>;
};

export default EcoComponent