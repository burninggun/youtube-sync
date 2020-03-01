var socket = io.connect('http://localhost:3000');

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
	setInterval(function () {
		socket.emit('time', {
			timestamp: player.getCurrentTime(),
		})
		console.log(player.getCurrentTime());
	}, 1000)
}


let done = false;
function onPlayerStateChange(event) {
	console.log('state change')
	//   if (event.data == YT.PlayerState.PLAYING && !done) {
	//     setTimeout(stopVideo, 6000);
	//     done = true;
	//   }
}
function stopVideo() {
	player.stopVideo();
}

