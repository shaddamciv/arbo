/// @description Insert description here
// You can write your code in this editor
image_index = 0;
switch(type) {
	case "start":{
		if (global.user_address=="0") {
			oController.state=1;
			oController.alarm[0]=1;
		}

		room_goto(rm_main);
	} break;
	case "credits": sprite_index = spr_button_title_credits; break;
	case "quit": sprite_index = spr_button_title_quit; break;
}
obj_button_marker.image_index = 0;