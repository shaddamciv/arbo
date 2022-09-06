/// @description Insert description here
// You can write your code in this editor

if(aberto==false && clicou)
{

	x= lerp(x,x-92,0.03)
	if(x<=264)
	{
		aberto = true;
		clicou = false;
	}
}
else if(aberto == true && clicou)
{
	x =lerp(x,x+92,0.03)
	if(x>=366)
	{
		aberto = false;
		clicou = false;
	}
	
}


