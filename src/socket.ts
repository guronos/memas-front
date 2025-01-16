import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL);

export const initSocket = () => {
	socket.on('connect', function() {
		console.log('Connected', socket);
		state.connected = true;
		socket.emit('events', { test: '42' });
		socket.emit('identity', 0, response =>
			console.log('Identity:', response),
		);
		socket.to("5991083c-67a3-4fff-abfd-b74efba33b3b").emit("eventsRoom", () => {
			console.log('Job')
		});
	});
}

socket.on('events', function(data) {
	console.log('event', data);
});
socket.on('exception', function(data) {
	console.log('eventEx', data);
});
socket.on('disconnect', function() {
	console.log('Disconnected');
});
socket.on('createRoom', (e) => {
	console.log(e, socket)
})