/// @description Insert description here
// You can write your code in this editor
image_index =2;
audio_play_sound(snd_click,1,false);

if(audio_is_playing(bgm_title_loop))
{
	audio_sound_gain(bgm_title_loop, 0, 900);
}
