/// @description Insert description here
// You can write your code in this editor
draw_self();
draw_set_font(font_02)
draw_text_transformed(x+40,y+21,string(global.user_address),image_xscale,image_yscale,0);
draw_text_transformed(x+40,y+12,"Connected!",1,1,0);