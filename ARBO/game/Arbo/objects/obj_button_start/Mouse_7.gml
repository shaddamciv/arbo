/// @description Insert description here
// You can write your code in this editor
image_index = 0;
if (global.user_address=="0") {
	oController.state=1;
	oController.alarm[0]=1;
}

room_goto(rm_main);
