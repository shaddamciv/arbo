/// @description Insert description here
// You can write your code in this editor
myhour = date_get_hour(date_current_datetime());
show_debug_message(myhour)

if(myhour ==11)
{
	sprite_index = spr_tree_02;	
}
else
{
	sprite_index = spr_tree_01;
}
