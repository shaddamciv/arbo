if(global.music != global.nextMusic) {
	audio_stop_sound(global.music);
	global.music = global.nextMusic;
	audio_play_sound(global.music, 1, 1);
}