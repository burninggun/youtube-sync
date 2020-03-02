var socket = io.connect('http://localhost:3000');
let room_name = 'room1';
let username = null

socket.emit('join room', {
	room_name
})

let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


let player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'SezGJNNZmtI',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}
function onPlayerReady(event) {
	event.target.playVideo();
}

let socket_time_interval;

function onPlayerStateChange(event) {
	console.log('state changed', event.data)
	//event.data === 2 --> player is paused
	if (event.data === 2) {
		socket.emit('pause', {
			room_name,
			username,
		})
		// clearInterval(socket_time_interval);
	} else if (event.data == 1) {
		socket.emit('play', {
			room_name,
			username,
		})
		// socket_time_interval = setInterval(function () {
		// 	socket.emit('time', {
		// 		timestamp: player.getCurrentTime(),
		// 		room: room
		// 	})
		// }, 1000);
	}

}
function stopVideo() {
	player.stopVideo();
}

socket.on('new username', data => {
	username = data.username
})

socket.on('pause', data => {
	player.pauseVideo();
})

socket.on('play', data => {
	player.playVideo();
})

socket.on('time_sync', data => {
	console.log(data)
	console.log(Math.abs(player.getCurrentTime() - data.timestamp) < 2)
	if ( Math.abs(player.getCurrentTime() - data.timestamp) > 2){
		player.seekTo(data.timestamp, true)
	}
})

