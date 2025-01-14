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

socket.on('connect', function() {
	console.log('Connected');

	socket.emit('events', { test: 'test' });
	socket.emit('identity', 0, response =>
		console.log('Identity:', response),
	);
});
socket.on('events', function(data) {
	console.log('event', data);
});
socket.on('exception', function(data) {
	console.log('event', data);
});
socket.on('disconnect', function() {
	console.log('Disconnected');
});