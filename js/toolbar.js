/* toolbar Menu by Fred */

var frex_serialno = 0;
var frex_mem = new Array();

/*
	place:
		0 - top
		1 - buttom
		2 - left
		3 - right

*/
function frex_toolbar_create(width, height, item_width, item_height, place) {
	if (width!=0&&height!=0) {
		document.write("<DIV ID=frex_toolbar_"+frex_serialno+" STYLE=\"background:black;width:"+width+";height:"+height+";\" ONMOUSEOUT=\"frex_mem["+frex_serialno+"][0][7]=false;setTimeout('frex_toolbar_onmouseout("+frex_serialno+")', 500);\"></DIV>");
	} else if (width!=0&&height==0) {
		document.write("<DIV ID=frex_toolbar_"+frex_serialno+" STYLE=\"background:black;width:"+width+";\" ONMOUSEOUT=\"frex_mem["+frex_serialno+"][0][7]=false;setTimeout('frex_toolbar_onmouseout("+frex_serialno+")', 500);\"></DIV>");
	} else if (width==0&&height!=0) {
		document.write("<DIV ID=frex_toolbar_"+frex_serialno+" STYLE=\"background:black;height:"+height+";\" ONMOUSEOUT=\"frex_mem["+frex_serialno+"][0][7]=false;setTimeout('frex_toolbar_onmouseout("+frex_serialno+")', 500);\"></DIV>");
	} else {
		document.write("<DIV ID=frex_toolbar_"+frex_serialno+" STYLE=\"position:relative;background:black;\" ONMOUSEOUT=\"frex_mem["+frex_serialno+"][0][7]=false;setTimeout('frex_toolbar_onmouseout("+frex_serialno+")', 500);\"></DIV>");
	}

	frex_mem[frex_serialno] = new Array();

	/* Object define */
	frex_mem[frex_serialno][0] = new Array();
	frex_mem[frex_serialno][0].push(0); // item serialno
	frex_mem[frex_serialno][0].push(width);
	frex_mem[frex_serialno][0].push(height);
	frex_mem[frex_serialno][0].push(item_width);
	frex_mem[frex_serialno][0].push(item_height);
	frex_mem[frex_serialno][0].push(item_width*2);
	frex_mem[frex_serialno][0].push(item_height*2);
	frex_mem[frex_serialno][0].push(false);
	frex_mem[frex_serialno][0].push(place);
	frex_mem[frex_serialno][0].push(-1); // focus
	frex_mem[frex_serialno][0].push(0); // label opacity

	/* items */
	frex_mem[frex_serialno][1] = new Array();

	/* toolbar map */
	frex_mem[frex_serialno][2] = new Array();

	return frex_serialno++;
}

function frex_toolbar_additem(objid,itemdefine) {
	/* array(serialno,object,ratio) */
	var newitem = new Array(frex_mem[objid][0][0],0,1);
	frex_mem[objid][0][0]++;
	frex_mem[objid][1].push(newitem.concat(itemdefine));

	if (itemdefine.length>1) {
		if (!document.getElementById("frex_toolbar_"+objid+"_label")) {
			var rootobj = document.getElementById("frex_toolbar_"+objid);
			var labelobj = document.createElement("SPAN");
			labelobj.id = "frex_toolbar_"+objid+"_label";
			labelobj.style.position = "absolute";
			labelobj.style.fontSize = "9pt";
			labelobj.appendChild(document.createTextNode(""));
			labelobj.style.opacity = 0;
			rootobj.appendChild(labelobj);
		}
	}

	return newitem[0];
}

function frex_toolbar_refresh(objid) {
	var i;
	var posy = 0;
	frex_mem[objid][2] = null;
	frex_mem[objid][2] = new Array();

	if (frex_mem[objid][0][8]==0||frex_mem[objid][0][8]==1) {
		var j = 0;
		var rootobj = document.getElementById("frex_toolbar_"+objid);
		var linelimit = (rootobj.scrollWidth-(rootobj.scrollWidth%frex_mem[objid][0][3]))/frex_mem[objid][0][3];
		frex_mem[objid][2][posy] = new Array();
		for (i=0;i<frex_mem[objid][1].length;i++) {
			if (j<linelimit) {
				frex_mem[objid][2][posy].push(i);
				j++;
			} else {
				posy++;
				frex_mem[objid][2][posy] = new Array();
				frex_mem[objid][2][posy].push(i);
				j = 1;
			}
		}
	} else {
		frex_mem[objid][2][posy] = new Array();
		for (i=0;i<frex_mem[objid][1].length;i++) {
			frex_mem[objid][2][i] = new Array();
			frex_mem[objid][2][i].push(i);
		}
	}

	frex_toolbar_render(objid);
}

function frex_toolbar_render_single(objid, index, x, y) {
	var offsetX, offsetY;
	var rootobj = document.getElementById("frex_toolbar_"+objid);

	frex_mem[objid][1][index][1] = document.createElement("SPAN");
	frex_mem[objid][1][index][1].id = "frex_toolbar_"+objid+"_"+frex_mem[objid][1][index][0];

	if (frex_mem[objid][0][3]!=0)
		frex_mem[objid][1][index][1].style.width = frex_mem[objid][0][3];

	if (frex_mem[objid][0][4]!=0)
		frex_mem[objid][1][index][1].style.height = frex_mem[objid][0][4];

	frex_mem[objid][1][index][1].style.position = "absolute";
	frex_mem[objid][1][index][1].style.left = x*frex_mem[objid][0][3];
	frex_mem[objid][1][index][1].style.top = y*frex_mem[objid][0][4];
	//frex_mem[objid][1][index][1].style.left = x*frex_mem[objid][0][3]+rootobj.offsetLeft;
	//frex_mem[objid][1][index][1].style.top = y*frex_mem[objid][0][4]+rootobj.offsetTop;

	if (frex_mem[objid][0][8]==0||frex_mem[objid][0][8]==1)
		frex_mem[objid][1][index][1].onmousemove = function(e) { frex_toolbar_mousemove_x(objid,this,frex_mem[objid][1][index][0],e) };
	else
		frex_mem[objid][1][index][1].onmousemove = function(e) { frex_toolbar_mousemove_y(objid,this,frex_mem[objid][1][index][0],e) };

	frex_mem[objid][1][index][1].onmouseout = function() { frex_toolbar_itemmouseout(objid) };
	frex_mem[objid][1][index][1].onmousedown = function() { frex_toolbar_itemmousedown(objid, this, frex_mem[objid][1][index][0]) };
	frex_mem[objid][1][index][1].onmouseup = function() { frex_toolbar_itemmouseup(objid, this, frex_mem[objid][1][index][0]) };
	frex_mem[objid][1][index][1].onclick = function() { frex_toolbar_itemonclick(objid, frex_mem[objid][1][index][0]) };

	var img = document.createElement("IMG");
	img.src = frex_mem[objid][1][index][3];

	if (!document.body.filters) {
		img.width = frex_mem[objid][0][3];
		img.height = frex_mem[objid][0][4];
	} else {
		img.style.width = frex_mem[objid][0][3];
		img.style.height = frex_mem[objid][0][4];
	}

	frex_mem[objid][1][index][1].appendChild(img);

	rootobj.appendChild(frex_mem[objid][1][index][1]);
}

function frex_toolbar_render(objid) {
	var i,j;
	for (i=0;i<frex_mem[objid][2].length;i++) {
		for (j=0;j<frex_mem[objid][2][i].length;j++) {
			frex_toolbar_render_single(objid, frex_mem[objid][1][frex_mem[objid][2][i][j]][0], j, i);
		}
	}
}

function frex_toolbar_objectscalebyratio(objid, objroot, ratio) {
	var k;
	objroot.style.width = Math.round(frex_mem[objid][0][3] * ratio);
	objroot.style.height = Math.round(frex_mem[objid][0][4] * ratio);

	if (!document.body.filters) {
		for (k=0;k<objroot.childNodes.length;k++) {
			if (objroot.childNodes[k].tagName=="IMG") {
				objroot.childNodes[k].width = Math.round(frex_mem[objid][0][3] * ratio);
				objroot.childNodes[k].height = Math.round(frex_mem[objid][0][4] * ratio);
			} else {
				objroot.childNodes[k].style.width = Math.round(frex_mem[objid][0][3] * ratio);
				objroot.childNodes[k].style.height = Math.round(frex_mem[objid][0][4] * ratio);
			}
		}
	} else {
		for (k=0;k<objroot.childNodes.length;k++) {
			objroot.childNodes[k].style.width = Math.round(frex_mem[objid][0][3] * ratio);
			objroot.childNodes[k].style.height = Math.round(frex_mem[objid][0][4] * ratio);
		}
	}
}

function frex_toolbar_mousemove_x(objid,onobj,onobjid,e) {
	var rootobj = document.getElementById("frex_toolbar_"+objid);
	var i,k,j,offset,offsetX,offsetY;
	if (document.body.filters) {
		var onobjX = event.clientX + document.body.scrollLeft - onobj.offsetLeft - rootobj.offsetLeft;
		var onobjY = event.clientY + document.body.scrollTop - onobj.offsetTop - rootobj.offsetTop;
	} else {
		var onobjX = e.pageX - onobj.offsetLeft - rootobj.offsetLeft;
		var onobjY = e.pageY - onobj.offsetTop - rootobj.offsetTop;
	}
	var objwidth = onobj.style.width.replace("px","");
	var objwidthhalf = Math.round(objwidth/2);
	frex_mem[objid][0][7] = true;

	if (onobjX==objwidthhalf) {
		ratio = 2;
	} else if (onobjX>objwidthhalf) {
		ratio = 2 - ((onobjX-objwidthhalf)/objwidthhalf/4);
	} else {
		ratio = 1.75 + onobjX/objwidthhalf/4;
	}

	onobj.style.zIndex = 3;
	frex_toolbar_objectscalebyratio(objid, onobj, ratio);

	if (frex_mem[objid][0][8]==1) {
		onobj.style.top = rootobj.offsetTop - Math.round(frex_mem[objid][0][4]*(ratio-1));
	}

	for (i=0;i<frex_mem[objid][2].length;i++) {
		for (k=0;k<frex_mem[objid][2][i].length;k++) {
			if (frex_mem[objid][1][frex_mem[objid][2][i][k]][0]==onobjid) {
				frex_mem[objid][1][frex_mem[objid][2][i][k]][2] = ratio;
				frex_mem[objid][0][9] = onobjid;
				setTimeout("frex_toolbar_onfocus("+objid+", "+onobjid+", '"+frex_mem[objid][1][frex_mem[objid][2][i][k]][4]+"')", 200);

				offset = 0;
				//offsetX = rootobj.offsetLeft;
				offsetX = 0;

				/* Left */
				if (k>2) {
					for (j=0;j<k-2;j++) {
						frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.zIndex = "";
						frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.left = offsetX;
						offsetX += frex_mem[objid][0][3];
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][j]][1], 1);
						frex_mem[objid][1][frex_mem[objid][2][i][j]][2] = 1;

						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.top = rootobj.offsetTop;
						}
					}
				}

				if (k>1) {
					if (onobjX<objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1].style.zIndex = 1;
						frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1].style.left = offsetX-Math.round(frex_mem[objid][0][3]*(2-ratio));
						offsetX += Math.round(frex_mem[objid][0][3]*(3-ratio));
						offset += Math.round(frex_mem[objid][0][3]*(2-ratio));
					} else if (onobjX>objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1].style.zIndex = 1;
						frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1].style.left = offsetX;
						offsetX += frex_mem[objid][0][3];
					} else if (onobjX==objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1].style.zIndex = 1;
						frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1].style.left = offsetX;
						offsetX += frex_mem[objid][0][3];
					}
				}

				if (k>0) {
					if (onobjX<objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1].style.zIndex = 2;
						frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1].style.left = offsetX-offset-Math.round(frex_mem[objid][0][3]*(2.5-ratio));
						offsetX += Math.round(frex_mem[objid][0][3]*(3.5-ratio));
						offset += Math.round(frex_mem[objid][0][3]*(2.5-ratio));
					} else if (onobjX>objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1].style.zIndex = 2;
						frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1].style.left = offsetX-offset-Math.round(frex_mem[objid][0][3]*(ratio-1.5));
						offsetX += Math.round(frex_mem[objid][0][3]*(ratio-0.5));
						offset += Math.round(frex_mem[objid][0][3]*(ratio-1.5));
					} else if (onobjX==objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1].style.zIndex = 2;
						frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1].style.left = offsetX-offset-Math.round(frex_mem[objid][0][3]*0.5);
						offsetX += Math.round(frex_mem[objid][0][3]*1.5);
						offset += Math.round(frex_mem[objid][0][3]*0.5);
					}
				}

				
				if (onobjX<objwidthhalf) {
					onobj.style.left = offsetX-offset-Math.round(frex_mem[objid][0][3]*(ratio-1.75)*2);
				} else if (onobjX==objwidthhalf) {
					onobj.style.left = offsetX-offset-Math.round(frex_mem[objid][0][3]*(ratio-1)/2);
				} else if (onobjX>objwidthhalf){
					onobj.style.left = offsetX-offset-Math.round(frex_mem[objid][0][3]*(2.5-ratio));
				}
				offsetX += Math.round(frex_mem[objid][0][3]*ratio);
				offset += Math.round(frex_mem[objid][0][3]*(ratio-1));

				/* Right */
				if (k<frex_mem[objid][2][i].length-1) {
					if (onobjX==objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1].style.zIndex = 2;
						frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1].style.left = offsetX-offset;
						offsetX += Math.round(frex_mem[objid][0][3]*1.5);
						offset += Math.round(frex_mem[objid][0][3]*0.5);
					} else if (onobjX>objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1].style.zIndex = 2;
						frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1].style.left = offsetX-offset;
						offsetX += Math.round(frex_mem[objid][0][3]*(3.5-ratio));
						offset += Math.round(frex_mem[objid][0][3]*(2.5-ratio));
					} else if (onobjX<objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1].style.zIndex = 2;
						frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1].style.left = offsetX-offset;
						offsetX += Math.round(frex_mem[objid][0][3]*(ratio-0.5));
						offset += Math.round(frex_mem[objid][0][3]*(ratio-1.5));
					}
				}

				if (k<frex_mem[objid][2][i].length-2) {
					if (onobjX==objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1].style.zIndex = 1;
						frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1].style.left = offsetX-offset;
						offsetX += frex_mem[objid][0][3];
					} else if (onobjX>objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1].style.zIndex = 1;
						frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1].style.left = offsetX-offset;
						offsetX += Math.round(frex_mem[objid][0][3]*(3-ratio));
						offset += Math.round(frex_mem[objid][0][3]*(2-ratio));
					} else if (onobjX<objwidthhalf) {
						frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1].style.zIndex = 1;
						frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1].style.left = offsetX-offset;
						offsetX += frex_mem[objid][0][3];
					}
				}

				if (k<frex_mem[objid][2][i].length-3) {
					for (j=k+3;j<frex_mem[objid][2][i].length;j++) {
						frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.zIndex = "";
						frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.left = offsetX-offset;
						offsetX += frex_mem[objid][0][3];
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][j]][1], 1);
						frex_mem[objid][1][frex_mem[objid][2][i][j]][2] = 1;

						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.top = rootobj.offsetTop;
						}
					}
				}

				if (onobjX==objwidthhalf) {
					if (k>0) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1], 1.5);
						frex_mem[objid][1][frex_mem[objid][2][i][k-1]][2] = 1.5;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1].style.top = rootobj.offsetTop - Math.round(frex_mem[objid][0][4]*0.5);
						}
					}

					if (k>1) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1], 1);
						frex_mem[objid][1][frex_mem[objid][2][i][k-2]][2] = 1;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1].style.top = rootobj.offsetTop;
						}
					}

					if (k<frex_mem[objid][2][i].length-1) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1], 1.5);
						frex_mem[objid][1][frex_mem[objid][2][i][k+1]][2] = 1.5;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1].style.top = rootobj.offsetTop - Math.round(frex_mem[objid][0][4]*0.5);
						}
					}

					if (k<frex_mem[objid][2][i].length-2) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1], 1);
						frex_mem[objid][1][frex_mem[objid][2][i][k+2]][2] = 1;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1].style.top = rootobj.offsetTop;
						}
					}
				} else if (onobjX<objwidthhalf) {
					if (k>0) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1], 3.5-ratio);
						frex_mem[objid][1][frex_mem[objid][2][i][k-1]][2] = 3.5-ratio;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1].style.top = rootobj.offsetTop - Math.round(frex_mem[objid][0][4]*(2.5-ratio));
						}
					}

					if (k>1) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1], 3-ratio);
						frex_mem[objid][1][frex_mem[objid][2][i][k-2]][2] = 3-ratio;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1].style.top = rootobj.offsetTop - Math.round(frex_mem[objid][0][4]*(2-ratio));
						}
					}

					if (k<frex_mem[objid][2][i].length-1) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1], ratio-0.5);
						frex_mem[objid][1][frex_mem[objid][2][i][k+1]][2] = ratio-0.5;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1].style.top = rootobj.offsetTop - Math.round(frex_mem[objid][0][4]*(ratio-1.5));
						}
					}

					if (k<frex_mem[objid][2][i].length-2) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1], 1);
						frex_mem[objid][1][frex_mem[objid][2][i][k+2]][2] = 1;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1].style.top = rootobj.offsetTop;
						}
					}
				} else if (onobjX>objwidthhalf) {
					if (k>0) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1], ratio-0.5);
						frex_mem[objid][1][frex_mem[objid][2][i][k-1]][2] = ratio-0.5;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k-1]][1].style.top = rootobj.offsetTop - Math.round(frex_mem[objid][0][4]*(ratio-1.5));
						}
					}

					if (k>1) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1], 1);
						frex_mem[objid][1][frex_mem[objid][2][i][k-2]][2] = 1;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k-2]][1].style.top = rootobj.offsetTop;
						}
					}

					if (k<frex_mem[objid][2][i].length-1) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1], 3.5-ratio);
						frex_mem[objid][1][frex_mem[objid][2][i][k+1]][2] = 3.5-ratio;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k+1]][1].style.top = rootobj.offsetTop - Math.round(frex_mem[objid][0][4]*(2.5-ratio));
						}
					}

					if (k<frex_mem[objid][2][i].length-2) {
						frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1], 3-ratio);
						frex_mem[objid][1][frex_mem[objid][2][i][k+2]][2] = 3-ratio;
						
						if (frex_mem[objid][0][8]==1) {
							frex_mem[objid][1][frex_mem[objid][2][i][k+2]][1].style.top = rootobj.offsetTop - Math.round(frex_mem[objid][0][4]*(2-ratio));
						}
					}
				}

				break;
			}
		}
	}

	if (document.getElementById("frex_toolbar_"+objid+"_label")) {
		document.getElementById("frex_toolbar_"+objid+"_label").style.align = "center";
		document.getElementById("frex_toolbar_"+objid+"_label").style.width = Math.round(frex_mem[objid][0][3]*ratio);
		switch (frex_mem[objid][0][8]) {
			case 0:
				document.getElementById("frex_toolbar_"+objid+"_label").style.top = parseInt(onobj.style.top.replace("px","")) + Math.round(frex_mem[objid][0][4]*ratio) + 5;
				break;
			case 1:
				document.getElementById("frex_toolbar_"+objid+"_label").style.top = parseInt(onobj.style.top.replace("px","")) - 30;
				break;
		}
		document.getElementById("frex_toolbar_"+objid+"_label").style.left = onobj.style.left;
	}
}



function frex_toolbar_mousemove_y(objid,onobj,onobjid,e) {
	var rootobj = document.getElementById("frex_toolbar_"+objid);
	var i,k,j,offset,offsetX,offsetY;
	if (document.body.filters) {
		var onobjX = event.clientY + document.body.scrollTop - onobj.offsetTop;
	} else {
		var onobjX = e.pageY - onobj.offsetTop;
	}
	var objwidth = onobj.style.height.replace("px","");
	var objwidthhalf = Math.round(objwidth/2);
	frex_mem[objid][0][7] = true;

	if (onobjX==objwidthhalf) {
		ratio = 2;
	} else if (onobjX>objwidthhalf) {
		ratio = 2 - ((onobjX-objwidthhalf)/objwidthhalf/4);
	} else {
		ratio = 1.75 + onobjX/objwidthhalf/4;
	}

	onobj.style.zIndex = 3;
	frex_toolbar_objectscalebyratio(objid, onobj, ratio);

	if (frex_mem[objid][0][8]==3) {
		onobj.style.left = rootobj.offsetLeft - Math.round(frex_mem[objid][0][3]*(ratio-1));
	}

	for (i=0;i<frex_mem[objid][2].length;i++) {
		if (frex_mem[objid][1][frex_mem[objid][2][i][0]][0]==onobjid) {
			frex_mem[objid][1][frex_mem[objid][2][i]][2] = ratio;
			frex_mem[objid][0][9] = onobjid;
			setTimeout("frex_toolbar_onfocus("+objid+", "+onobjid+", '"+frex_mem[objid][1][frex_mem[objid][2][i]][4]+"')", 200);

			offset = 0;
			offsetX = rootobj.offsetTop;

			/* Up */
			if (i>2) {
				for (j=0;j<i-2;j++) {
					frex_mem[objid][1][frex_mem[objid][2][j][0]][1].style.zIndex = "";
					frex_mem[objid][1][frex_mem[objid][2][j][0]][1].style.top = offsetX;
					offsetX += frex_mem[objid][0][4];
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][j]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][j][0]][2] = 1;

					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][j][0]][1].style.left = rootobj.offsetLeft;
					}
				}
			}

			if (i>1) {
				if (onobjX<objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1].style.zIndex = 1;
					frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1].style.top = offsetX-Math.round(frex_mem[objid][0][4]*(2-ratio));
					offsetX += Math.round(frex_mem[objid][0][4]*(3-ratio));
					offset += Math.round(frex_mem[objid][0][4]*(2-ratio));
				} else if (onobjX>objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1].style.zIndex = 1;
					frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1].style.top = offsetX;
					offsetX += frex_mem[objid][0][4];
				} else if (onobjX==objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1].style.zIndex = 1;
					frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1].style.top = offsetX;
					offsetX += frex_mem[objid][0][4];
				}
			}

			if (i>0) {
				if (onobjX<objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1].style.zIndex = 2;
					frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1].style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*(2.5-ratio));
					offsetX += Math.round(frex_mem[objid][0][4]*(3.5-ratio));
					offset += Math.round(frex_mem[objid][0][4]*(2.5-ratio));
				} else if (onobjX>objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1].style.zIndex = 2;
					frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1].style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*(ratio-1.5));
					offsetX += Math.round(frex_mem[objid][0][4]*(ratio-0.5));
					offset += Math.round(frex_mem[objid][0][4]*(ratio-1.5));
				} else if (onobjX==objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1].style.zIndex = 2;
					frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1].style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*0.5);
					offsetX += Math.round(frex_mem[objid][0][4]*1.5);
					offset += Math.round(frex_mem[objid][0][4]*0.5);
				}
			}

				
			if (onobjX<objwidthhalf) {
				onobj.style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*(ratio-1.75)*2);
			} else if (onobjX==objwidthhalf) {
				onobj.style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*(ratio-1)/2);
			} else if (onobjX>objwidthhalf){
				onobj.style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*(2.5-ratio));
			}
			offsetX += Math.round(frex_mem[objid][0][4]*ratio);
			offset += Math.round(frex_mem[objid][0][4]*(ratio-1));

			/* Down */
			if (i<frex_mem[objid][2].length-1) {
				if (onobjX==objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1].style.zIndex = 2;
					frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1].style.top = offsetX-offset;
					offsetX += Math.round(frex_mem[objid][0][4]*1.5);
					offset += Math.round(frex_mem[objid][0][4]*0.5);
				} else if (onobjX>objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1].style.zIndex = 2;
					frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1].style.top = offsetX-offset;
					offsetX += Math.round(frex_mem[objid][0][4]*(3.5-ratio));
					offset += Math.round(frex_mem[objid][0][4]*(2.5-ratio));
				} else if (onobjX<objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1].style.zIndex = 2;
					frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1].style.top = offsetX-offset;
					offsetX += Math.round(frex_mem[objid][0][4]*(ratio-0.5));
					offset += Math.round(frex_mem[objid][0][4]*(ratio-1.5));
				}
			}

			if (i<frex_mem[objid][2].length-2) {
				if (onobjX==objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1].style.zIndex = 1;
					frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1].style.top = offsetX-offset;
					offsetX += frex_mem[objid][0][4];
				} else if (onobjX>objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1].style.zIndex = 1;
					frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1].style.top = offsetX-offset;
					offsetX += Math.round(frex_mem[objid][0][4]*(3-ratio));
					offset += Math.round(frex_mem[objid][0][4]*(2-ratio));
				} else if (onobjX<objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1].style.zIndex = 1;
					frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1].style.top = offsetX-offset;
					offsetX += frex_mem[objid][0][4];
				}
			}

			if (i<frex_mem[objid][2].length-3) {
				for (j=i+3;j<frex_mem[objid][2].length;j++) {
					frex_mem[objid][1][frex_mem[objid][2][j][0]][1].style.zIndex = "";
					frex_mem[objid][1][frex_mem[objid][2][j][0]][1].style.top = offsetX-offset;
					offsetX += frex_mem[objid][0][4];
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][j][0]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][j][0]][2] = 1;

					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][j][0]][1].style.left = rootobj.offsetLeft;
					}
				}
			}

			if (onobjX==objwidthhalf) {
				if (i>0) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1], 1.5);
					frex_mem[objid][1][frex_mem[objid][2][i-1][0]][2] = 1.5;
					
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1].style.left = rootobj.offsetLeft - Math.round(frex_mem[objid][0][3]*0.5);
					}
				}

				if (i>1) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][i-2][0]][2] = 1;
					
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1].style.left = rootobj.offsetLeft;
					}
				}

				if (i<frex_mem[objid][2].length-1) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1], 1.5);
					frex_mem[objid][1][frex_mem[objid][2][i+1][0]][2] = 1.5;
					
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1].style.left = rootobj.offsetLeft - Math.round(frex_mem[objid][0][3]*0.5);
					}
				}

				if (i<frex_mem[objid][2].length-2) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][i+2][0]][2] = 1;
						
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1].style.left = rootobj.offsetLeft;
					}
				}
			} else if (onobjX<objwidthhalf) {
				if (i>0) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1], 3.5-ratio);
					frex_mem[objid][1][frex_mem[objid][2][i-1][0]][2] = 3.5-ratio;
					
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1].style.left = rootobj.offsetLeft - Math.round(frex_mem[objid][0][3]*(2.5-ratio));
					}
				}

				if (i>1) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1], 3-ratio);
					frex_mem[objid][1][frex_mem[objid][2][i-2][0]][2] = 3-ratio;
						
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1].style.left = rootobj.offsetLeft - Math.round(frex_mem[objid][0][3]*(2-ratio));
					}
				}

				if (i<frex_mem[objid][2].length-1) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1], ratio-0.5);
					frex_mem[objid][1][frex_mem[objid][2][i+1][0]][2] = ratio-0.5;
						
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1].style.left = rootobj.offsetLeft - Math.round(frex_mem[objid][0][3]*(ratio-1.5));
					}
				}

				if (i<frex_mem[objid][2].length-2) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][i+2][0]][2] = 1;
						
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1].style.left = rootobj.offsetLeft;
					}
				}
			} else if (onobjX>objwidthhalf) {
				if (i>0) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1], ratio-0.5);
					frex_mem[objid][1][frex_mem[objid][2][i-1][0]][2] = ratio-0.5;
					
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i-1][0]][1].style.left = rootobj.offsetLeft - Math.round(frex_mem[objid][0][3]*(ratio-1.5));
					}
				}

				if (i>1) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][i-2][0]][2] = 1;
						
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i-2][0]][1].style.left = rootobj.offsetLeft;
					}
				}

				if (i<frex_mem[objid][2].length-1) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1], 3.5-ratio);
					frex_mem[objid][1][frex_mem[objid][2][i+1][0]][2] = 3.5-ratio;
						
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i+1][0]][1].style.left = rootobj.offsetLeft - Math.round(frex_mem[objid][0][3]*(2.5-ratio));
					}
				}

				if (i<frex_mem[objid][2].length-2) {
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1], 3-ratio);
					frex_mem[objid][1][frex_mem[objid][2][i+2][0]][2] = 3-ratio;
						
					if (frex_mem[objid][0][8]==3) {
						frex_mem[objid][1][frex_mem[objid][2][i+2][0]][1].style.left = rootobj.offsetLeft - Math.round(frex_mem[objid][0][3]*(2-ratio));
					}
				}
			}

			break;
		}
	}

	if (document.getElementById("frex_toolbar_"+objid+"_label")) {
		switch (frex_mem[objid][0][8]) {
			case 2:
				document.getElementById("frex_toolbar_"+objid+"_label").style.align = "left";
				document.getElementById("frex_toolbar_"+objid+"_label").style.left = parseInt(onobj.style.left.replace("px","")) + Math.round(frex_mem[objid][0][3]*ratio) + 5;
				break;
			case 3:
				document.getElementById("frex_toolbar_"+objid+"_label").style.align = "right";
				document.getElementById("frex_toolbar_"+objid+"_label").style.left = parseInt(onobj.style.left.replace("px","")) - 100;
				break;
		}
		document.getElementById("frex_toolbar_"+objid+"_label").style.top = parseInt(onobj.style.top.replace("px","")) + Math.round(frex_mem[objid][0][4]*ratio/2);
	}
}

function frex_toolbar_getdefault(objid) {
	var i,j;
	var defflag = true;
	var rootobj = document.getElementById("frex_toolbar_"+objid);
	for (i=0;i<frex_mem[objid][2].length;i++) {
		for (j=0;j<frex_mem[objid][2][i].length;j++) {
			if (frex_mem[objid][1][frex_mem[objid][2][i][j]][2]>1) {
				defflag = false;

				if (frex_mem[objid][1][frex_mem[objid][2][i][j]][2]<1.1) {
					frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.left = j*frex_mem[objid][0][3]+rootobj.offsetLeft;
					frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.top = i*frex_mem[objid][0][4]+rootobj.offsetTop;
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][j]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][i][j]][2] = 1;
				} else {
					frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.left = ((j*frex_mem[objid][0][3]+rootobj.offsetLeft)>>1)+Math.round(parseInt(frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.left.replace("px",""))*0.5);
					frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.top = ((i*frex_mem[objid][0][4]+rootobj.offsetTop)>>1)+Math.round(parseInt(frex_mem[objid][1][frex_mem[objid][2][i][j]][1].style.top.replace("px",""))*0.5);
					frex_mem[objid][1][frex_mem[objid][2][i][j]][2] -= (frex_mem[objid][1][frex_mem[objid][2][i][j]][2]-1)*0.5;
					frex_toolbar_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i][j]][1], frex_mem[objid][1][frex_mem[objid][2][i][j]][2]);
				}
			}
		}
	}

	if (!defflag)
		setTimeout("frex_toolbar_getdefault("+objid+")", 20);
}

function frex_toolbar_onmouseout(objid) {
	if (frex_mem[objid][0][7]==false) {
		frex_toolbar_getdefault(objid);
	}
}

function frex_toolbar_onfocus(objid, onobjid, label) {
	var i,k;

	if (frex_mem[objid][0][9]==onobjid) {
		for (i=0;i<frex_mem[objid][2].length;i++) {
			for (k=0;k<frex_mem[objid][2][i].length;k++) {
				if (frex_mem[objid][1][frex_mem[objid][2][i][k]][0]==onobjid) {
					document.getElementById("frex_toolbar_"+objid+"_label").childNodes[0].data = label;
					document.getElementById("frex_toolbar_"+objid+"_label").style.display = "";
					frex_toolbar_showlabel(objid);
					break;
				}
			}
		}
	}
}

function frex_toolbar_showlabel(objid) {
	if (frex_mem[objid][0][10]<100) {
		if (document.getElementById("frex_toolbar_"+objid+"_label").style.display=="") {
			frex_mem[objid][0][10] += 10;
			document.getElementById("frex_toolbar_"+objid+"_label").style.filter = "alpha(opacity:"+frex_mem[objid][0][10]+")";
			document.getElementById("frex_toolbar_"+objid+"_label").style.opacity = frex_mem[objid][0][10]/100;
		}
	}

	if (frex_mem[objid][0][10]<100) {
		setTimeout("frex_toolbar_showlabel("+objid+")", 40);
	}
}

function frex_toolbar_itemmouseout(objid) {
	frex_mem[objid][0][9] = -1;
	frex_mem[objid][0][10] = 0;
	document.getElementById("frex_toolbar_"+objid+"_label").style.opacity = 0;
	document.getElementById("frex_toolbar_"+objid+"_label").style.filter = "alpha(opacity:0)";
	document.getElementById("frex_toolbar_"+objid+"_label").style.display = "none";
}

function frex_toolbar_itemmousedown(objid, onobj, onobjid) {
	var i,k;

	for (i=0;i<frex_mem[objid][2].length;i++) {
		for (k=0;k<frex_mem[objid][2][i].length;k++) {
			if (frex_mem[objid][1][frex_mem[objid][2][i][k]][0]==onobjid) {
				var ratio = frex_mem[objid][1][frex_mem[objid][2][i][k]][2]*1.05;
				switch (frex_mem[objid][0][8]) {
					case 0:
						onobj.style.left = parseInt(onobj.style.left.replace("px","")) + Math.round((parseInt(onobj.style.width.replace("px",""))-Math.round(frex_mem[objid][0][3]*ratio))/2);
						break;
					case 1:
						onobj.style.top = parseInt(onobj.style.top.replace("px","")) + parseInt(onobj.style.height.replace("px","")) - Math.round(frex_mem[objid][0][4]*ratio);
						onobj.style.left = parseInt(onobj.style.left.replace("px","")) + Math.round((parseInt(onobj.style.width.replace("px",""))-Math.round(frex_mem[objid][0][3]*ratio))/2);
						break;
					case 2:
						onobj.style.top = parseInt(onobj.style.top.replace("px","")) + Math.round((parseInt(onobj.style.height.replace("px","")) - Math.round(frex_mem[objid][0][4]*ratio))/2);
						onobj.style.left = document.getElementById("frex_toolbar_"+objid).offsetLeft;
						break;
					case 3:
						onobj.style.top = parseInt(onobj.style.top.replace("px","")) + Math.round((parseInt(onobj.style.height.replace("px","")) - Math.round(frex_mem[objid][0][4]*ratio))/2);
						onobj.style.left = parseInt(onobj.style.left.replace("px","")) + parseInt(onobj.style.width.replace("px","")) - Math.round(frex_mem[objid][0][3]*ratio);
						break;
				}
				frex_toolbar_objectscalebyratio(objid, onobj, ratio);
				break;
			}
		}
	}
}

function frex_toolbar_itemmouseup(objid, onobj, onobjid) {
	var i,k;

	for (i=0;i<frex_mem[objid][2].length;i++) {
		for (k=0;k<frex_mem[objid][2][i].length;k++) {
			if (frex_mem[objid][1][frex_mem[objid][2][i][k]][0]==onobjid) {
				var ratio = frex_mem[objid][1][frex_mem[objid][2][i][k]][2];
				switch (frex_mem[objid][0][8]) {
					case 0:
						onobj.style.left = parseInt(onobj.style.left.replace("px","")) + Math.round((parseInt(onobj.style.width.replace("px",""))-Math.round(frex_mem[objid][0][3]*ratio))/2);
						break;
					case 1:
						onobj.style.top = parseInt(onobj.style.top.replace("px","")) + parseInt(onobj.style.height.replace("px","")) - Math.round(frex_mem[objid][0][4]*ratio);
						onobj.style.left = parseInt(onobj.style.left.replace("px","")) + Math.round((parseInt(onobj.style.width.replace("px",""))-Math.round(frex_mem[objid][0][3]*ratio))/2);
						break;
					case 2:
						onobj.style.top = parseInt(onobj.style.top.replace("px","")) + Math.round((parseInt(onobj.style.height.replace("px","")) - Math.round(frex_mem[objid][0][4]*ratio))/2);
						onobj.style.left = document.getElementById("frex_toolbar_"+objid).offsetLeft;
						break;
					case 3:
						onobj.style.top = parseInt(onobj.style.top.replace("px","")) + Math.round((parseInt(onobj.style.height.replace("px","")) - Math.round(frex_mem[objid][0][4]*ratio))/2);
						onobj.style.left = parseInt(onobj.style.left.replace("px","")) + parseInt(onobj.style.width.replace("px","")) - Math.round(frex_mem[objid][0][3]*ratio);
						break;
				}
				frex_toolbar_objectscalebyratio(objid, onobj, ratio);
				break;
			}
		}
	}
}

function frex_toolbar_itemonclick(objid, onobjid) {
	var i,k;

	for (i=0;i<frex_mem[objid][2].length;i++) {
		for (k=0;k<frex_mem[objid][2][i].length;k++) {
			if (frex_mem[objid][1][frex_mem[objid][2][i][k]][0]==onobjid) {
				if (frex_mem[objid][1][frex_mem[objid][2][i][k]][5])
					location.href = frex_mem[objid][1][frex_mem[objid][2][i][k]][5];

				break;
			}
		}
	}
}