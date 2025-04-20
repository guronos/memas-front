import { reactive } from "vue";
import { io } from "socket.io-client";
import { serverURL } from "@/constants/connectConstants.ts";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = serverURL//process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
console.log('url', import.meta.env.VITE_SERVER_URL)//process.env.SERVER_URL);

export const socket = io(URL, {
	withCredentials: true,
});

export const initSocket = async () => {
	console.log('initSocket');
	// await fetch(URL)
	socket.on('connect', function() {
		console.log('Connected', socket);
		state.connected = true;
		// socket.to("5991083c-67a3-4fff-abfd-b74efba33b3b").emit("eventsRoom", () => {
		// 	console.log('Job')
		// });
	});

	// socket.emit('events', { test: '42' });
	// socket.emit('identity', 0, response =>
	// 	console.log('Identity:', response),
	// );
}

socket.on('events', function(data) {
	console.log('event', data);
});
socket.on('exception', function(data) {
	console.log('Ошибка', data);
});
socket.on('disconnect', function() {
	console.log('Disconnected');
});
