global.user_address = 0;



if(audio_is_playing(bgm_title_loop))
{
	audio_stop_all();
	audio_play_sound(bgm_main_screen,1,true)
	//audio_sound_gain(bgm_main_screen, 0.3, 5000);	
}