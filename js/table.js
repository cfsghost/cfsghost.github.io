/* Copyright (C) Fred Chien All right reserved. */

var frex_serialno = 0;
var frex_mem = new Array();

function frex_table_create(width, height, place) {
	if (width!=0&&height!=0) {
		document.write("<SPAN ID=frex_table_"+frex_serialno+" STYLE=\"background:black;width:"+width+";height:"+height+";\" ONMOUSEOUT=\"frex_mem["+frex_serialno+"][0][6]=false;setTimeout('frex_table_onmouseout("+frex_serialno+")', 300);\"></SPAN>");
	} else if (width!=0&&height==0) {
		document.write("<DIV ID=frex_table_"+frex_serialno+" STYLE=\"position:relative;background:black;width:"+width+";\" ONMOUSEOUT=\"frex_mem["+frex_serialno+"][0][6]=false;setTimeout('frex_table_onmouseout("+frex_serialno+")', 300);\"></DIV>");
	} else if (width==0&&height!=0) {
		document.write("<DIV ID=frex_table_"+frex_serialno+" STYLE=\"position:relative;background:black;height:"+height+";\" ONMOUSEOUT=\"frex_mem["+frex_serialno+"][0][6]=false;setTimeout('frex_table_onmouseout("+frex_serialno+")', 300);\"></DIV>");
	} else {
		document.write("<DIV ID=frex_table_"+frex_serialno+" STYLE=\"position:relative;background:#32393f;text-align:left;\" ONMOUSEOUT=\"frex_mem["+frex_serialno+"][0][6]=false;setTimeout('frex_table_onmouseout("+frex_serialno+")', 300);\"></DIV>");
	}

	frex_mem[frex_serialno] = new Array();

	/* Object define */
	frex_mem[frex_serialno][0] = new Array();
	frex_mem[frex_serialno][0].push(0); // item serialno
	frex_mem[frex_serialno][0].push(width);
	frex_mem[frex_serialno][0].push(height);
	if (width>0)
		frex_mem[frex_serialno][0].push(width); // default width
	else
		frex_mem[frex_serialno][0].push(800); // default width
	frex_mem[frex_serialno][0].push(24); // default height
	frex_mem[frex_serialno][0].push(place);
	frex_mem[frex_serialno][0].push(false); // focus
	frex_mem[frex_serialno][0].push(0); // row light or dark

	/* items */
	frex_mem[frex_serialno][1] = new Array();

	/* table map */
	frex_mem[frex_serialno][2] = new Array();

	return frex_serialno++;
}

function frex_table_additem(objid,itemdefine) {
	/* array(serialno,object,ratio) */
	var newitem = new Array(frex_mem[objid][0][0],0,1);
	frex_mem[objid][0][0]++;
	frex_mem[objid][1].push(newitem.concat(itemdefine));

	return newitem[0];
}

function frex_table_refresh(objid) {
	var i;
	frex_mem[objid][2] = null;
	frex_mem[objid][2] = new Array();

	document.getElementById("frex_table_"+objid).style.height = frex_mem[objid][1].length*frex_mem[objid][0][4];

	for (i=0;i<frex_mem[objid][1].length;i++) {
		frex_mem[objid][2].push(i);
	}

	frex_table_render(objid);
}

function frex_table_render_single(objid, index, x) {
	var i;
	var rootobj = document.getElementById("frex_table_"+objid);

	frex_mem[objid][1][index][1] = document.createElement("SPAN");
	frex_mem[objid][1][index][1].id = "frex_table_"+objid+"_"+frex_mem[objid][1][index][0];

	frex_mem[objid][1][index][1].style.position = "absolute";
	if (frex_mem[objid][0][7]) {
		frex_mem[objid][1][index][1].style.color = "#a6bdd1";
		frex_mem[objid][1][index][1].style.background = "#1b1f23";
		frex_mem[objid][0][7] = 0;
	} else {
		frex_mem[objid][1][index][1].style.color = "#ffffff";
		frex_mem[objid][1][index][1].style.background = "#242a2e";
		frex_mem[objid][0][7] = 1;
	}

	frex_mem[objid][1][index][1].style.paddingLeft = "10px";
	frex_mem[objid][1][index][1].style.fontSize = "9pt";
	frex_mem[objid][1][index][1].style.width = frex_mem[objid][0][3];
	frex_mem[objid][1][index][1].style.height = frex_mem[objid][0][4];
	frex_mem[objid][1][index][1].style.left = 0;
	frex_mem[objid][1][index][1].style.top = x*frex_mem[objid][0][4];

	/* Create Table for Data */
	var tab = document.createElement("TABLE");
	tab.style.width = "100%";

	frex_mem[objid][1][index][1].appendChild(document.createTextNode(frex_mem[objid][1][index][3]));

	frex_mem[objid][1][index][1].onmousemove = function(e) { frex_table_mousemove(objid,this,frex_mem[objid][1][index][0],e) };
	frex_mem[objid][1][index][1].onclick = function(e) { frex_table_itemonclick(objid,frex_mem[objid][1][index]) };
	rootobj.appendChild(frex_mem[objid][1][index][1]);
}

function frex_table_render(objid) {
	var i;
	for (i=frex_mem[objid][2].length-1;i>=0;i--)
		frex_table_render_single(objid, frex_mem[objid][1][frex_mem[objid][2][i]][0], i);
}

function frex_table_objectscalebyratio(objid, objroot, ratio) {
	var k;
	if (ratio==1) {
		objroot.style.width = frex_mem[objid][0][3];
		objroot.style.height = frex_mem[objid][0][4];
		objroot.style.fontSize = "9pt";

		if (!document.body.filters) {
			for (k=0;k<objroot.childNodes.length;k++) {
				if (objroot.childNodes[k].tagName=="IMG") {
					objroot.childNodes[k].width = objroot.childNodes[k].naturalWidth;
					objroot.childNodes[k].height = objroot.childNodes[k].naturalHeight;
				}
			}
		}
		return;
	}

	objroot.style.width = Math.round(frex_mem[objid][0][3] * (ratio*0.25+0.75)); // 1 - 0.75 = 0.25
	objroot.style.height = Math.round(frex_mem[objid][0][4] * ratio);
	objroot.style.fontSize = Math.round(9*ratio) + "pt";

	if (!document.body.filters) {
		for (k=0;k<objroot.childNodes.length;k++) {
			if (objroot.childNodes[k].tagName=="IMG") {
				objroot.childNodes[k].width = Math.round(objroot.childNodes[k].naturalWidth * ratio);
				objroot.childNodes[k].height = Math.round(objroot.childNodes[k].naturalHeight * ratio);
			} else if (objroot.childNodes[k].style) {
				objroot.childNodes[k].style.width = Math.round(objroot.childNodes[k].style.width.replace("px","") * ratio);
				objroot.childNodes[k].style.height = Math.round(objroot.childNodes[k].style.height.replace("px","") * ratio);
			}
		}
	}
}

function frex_table_mousemove(objid,onobj,onobjid,e) {
	var rootobj = document.getElementById("frex_table_"+objid);
	var i,k,j,offset,offsetX;
	if (document.body.filters) {
		var onobjX = event.clientY + document.body.scrollTop - rootobj.offsetTop - onobj.offsetTop;
	} else {
		var onobjX = e.pageY - rootobj.offsetTop - onobj.offsetTop;
	}
	var objwidth = parseInt(onobj.style.height.replace("px",""));
	var objwidthhalf = objwidth>>1;
	frex_mem[objid][0][6] = true; /* focus */

	if (onobjX==objwidthhalf) {
		ratio = 2;
	} else if (onobjX>objwidthhalf) {
		ratio = 2 - ((onobjX-objwidthhalf)/objwidthhalf/4);
	} else {
		ratio = 1.75 + (onobjX/objwidthhalf/4);
	}

	onobj.style.zIndex = 3;
	frex_table_objectscalebyratio(objid, onobj, ratio);

	if (frex_mem[objid][0][5]==1) {
		// (ratio*(1-0.75)-0.25)*0.5 = ratio*0.125-0.125
		onobj.style.left = -Math.round(frex_mem[objid][0][3]*(ratio*0.125-0.125));
	} else if (frex_mem[objid][0][5]==2) {
		onobj.style.left = -Math.round(frex_mem[objid][0][3]*(ratio-1));
	}

	for (i=0;i<frex_mem[objid][2].length;i++) {
		if (frex_mem[objid][1][frex_mem[objid][2][i]][0]==onobjid) {
			frex_mem[objid][1][frex_mem[objid][2][i]][2] = ratio;

			offset = 0;
			offsetX = 0;

			/* Up */
			if (i>2) {
				for (j=0;j<i-2;j++) {
					frex_mem[objid][1][frex_mem[objid][2][j]][1].style.zIndex = "";
					frex_mem[objid][1][frex_mem[objid][2][j]][1].style.top = offsetX;
					offsetX += frex_mem[objid][0][4];
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][j]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][j]][2] = 1;
					frex_mem[objid][1][frex_mem[objid][2][j]][1].style.left = 0;
				}
			}

			if (i>1) {
				frex_mem[objid][1][frex_mem[objid][2][i-2]][1].style.zIndex = 1;
				if (onobjX<objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i-2]][1].style.top = offsetX-Math.round(frex_mem[objid][0][4]*(2-ratio));
					offsetX += Math.round(frex_mem[objid][0][4]*(3-ratio));
					offset += Math.round(frex_mem[objid][0][4]*(2-ratio));
				} else {
					frex_mem[objid][1][frex_mem[objid][2][i-2]][1].style.top = offsetX;
					offsetX += frex_mem[objid][0][4];
				}
			}

			if (i>0) {
				frex_mem[objid][1][frex_mem[objid][2][i-1]][1].style.zIndex = 2;
				if (onobjX<objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i-1]][1].style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*(2.5-ratio));
					offsetX += Math.round(frex_mem[objid][0][4]*(3.5-ratio));
					offset += Math.round(frex_mem[objid][0][4]*(2.5-ratio));
				} else if (onobjX>objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i-1]][1].style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*(ratio-1.5));
					offsetX += Math.round(frex_mem[objid][0][4]*(ratio-0.5));
					offset += Math.round(frex_mem[objid][0][4]*(ratio-1.5));
				} else if (onobjX==objwidthhalf) {
					frex_mem[objid][1][frex_mem[objid][2][i-1]][1].style.top = offsetX-offset
-Math.round(frex_mem[objid][0][4]*0.5);
					offsetX += Math.round(frex_mem[objid][0][4]*1.5);
					offset += Math.round(frex_mem[objid][0][4]>>1);
				}
			}

				
			if (onobjX<objwidthhalf) {
				onobj.style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*(ratio-1.75)*2);
			} else if (onobjX==objwidthhalf) {
				onobj.style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*(ratio-1)*0.5);
			} else if (onobjX>objwidthhalf){
				onobj.style.top = offsetX-offset-Math.round(frex_mem[objid][0][4]*(2.5-ratio));
			}
			offsetX += Math.round(frex_mem[objid][0][4]*ratio);
			offset += Math.round(frex_mem[objid][0][4]*(ratio-1));

			/* Down */
			if (i<frex_mem[objid][2].length-1) {
				frex_mem[objid][1][frex_mem[objid][2][i+1]][1].style.zIndex = 2;
				frex_mem[objid][1][frex_mem[objid][2][i+1]][1].style.top = offsetX-offset;
				if (onobjX==objwidthhalf) {
					offsetX += Math.round(frex_mem[objid][0][4]*1.5);
					offset += Math.round(frex_mem[objid][0][4]>>1);
				} else if (onobjX>objwidthhalf) {
					offsetX += Math.round(frex_mem[objid][0][4]*(3.5-ratio));
					offset += Math.round(frex_mem[objid][0][4]*(2.5-ratio));
				} else if (onobjX<objwidthhalf) {
					offsetX += Math.round(frex_mem[objid][0][4]*(ratio-0.5));
					offset += Math.round(frex_mem[objid][0][4]*(ratio-1.5));
				}
			}

			if (i<frex_mem[objid][2].length-2) {
				frex_mem[objid][1][frex_mem[objid][2][i+2]][1].style.zIndex = 1;
				frex_mem[objid][1][frex_mem[objid][2][i+2]][1].style.top = offsetX-offset;

				if (onobjX>objwidthhalf) {
					offsetX += Math.round(frex_mem[objid][0][4]*(3-ratio));
					offset += Math.round(frex_mem[objid][0][4]*(2-ratio));
				} else {
					offsetX += frex_mem[objid][0][4];
				}
			}

			if (i<frex_mem[objid][2].length-3) {
				for (j=i+3;j<frex_mem[objid][2].length;j++) {
					frex_mem[objid][1][frex_mem[objid][2][j]][1].style.zIndex = "";
					frex_mem[objid][1][frex_mem[objid][2][j]][1].style.top = offsetX-offset;
					offsetX += frex_mem[objid][0][4];
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][j]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][j]][2] = 1;
					frex_mem[objid][1][frex_mem[objid][2][j]][1].style.left = 0;
				}
			}

			if (onobjX==objwidthhalf) {
				if (i>0) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-1]][1], 1.5);
					frex_mem[objid][1][frex_mem[objid][2][i-1]][2] = 1.5;
					frex_mem[objid][1][frex_mem[objid][2][i-1]][1].style.left = -Math.round(frex_mem[objid][0][3]*0.0625);
// (1.5*(1 - 0.75)-0.25)*0.5 = 0.0625
				}

				if (i>1) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-2]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][i-2]][2] = 1;
					frex_mem[objid][1][frex_mem[objid][2][i-2]][1].style.left = 0;
				}

				if (i<frex_mem[objid][2].length-1) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+1]][1], 1.5);
					frex_mem[objid][1][frex_mem[objid][2][i+1]][2] = 1.5;
					frex_mem[objid][1][frex_mem[objid][2][i+1]][1].style.left = -Math.round(frex_mem[objid][0][3]*0.0625);
// (1.5*(1 - 0.75)-0.25)*0.5 = 0.0625
				}

				if (i<frex_mem[objid][2].length-2) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+2]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][i+2]][2] = 1;
					frex_mem[objid][1][frex_mem[objid][2][i+2]][1].style.left = 0;
				}
			} else if (onobjX<objwidthhalf) {
				if (i>0) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-1]][1], 3.5-ratio);
					frex_mem[objid][1][frex_mem[objid][2][i-1]][2] = 3.5-ratio;
					frex_mem[objid][1][frex_mem[objid][2][i-1]][1].style.left = -Math.round(frex_mem[objid][0][3]*((3.5-ratio)*0.125-0.125));
// 1 - 0.75 = 0.25 ; 0.25 * 0.5 = 0.125

				}

				if (i>1) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-2]][1], 3-ratio);
					frex_mem[objid][1][frex_mem[objid][2][i-2]][2] = 3-ratio;
					frex_mem[objid][1][frex_mem[objid][2][i-2]][1].style.left = -Math.round(frex_mem[objid][0][3]*((3-ratio)*0.125-0.125));

				}

				if (i<frex_mem[objid][2].length-1) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+1]][1], ratio-0.5);
					frex_mem[objid][1][frex_mem[objid][2][i+1]][2] = ratio-0.5;
					frex_mem[objid][1][frex_mem[objid][2][i+1]][1].style.left = -Math.round(frex_mem[objid][0][3]*((ratio-0.5)*0.125-0.125));
				}

				if (i<frex_mem[objid][2].length-2) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+2]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][i+2]][2] = 1;
					frex_mem[objid][1][frex_mem[objid][2][i+2]][1].style.left = 0;
				}
			} else if (onobjX>objwidthhalf) {
				if (i>0) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-1]][1], ratio-0.5);
					frex_mem[objid][1][frex_mem[objid][2][i-1]][2] = ratio-0.5;
					frex_mem[objid][1][frex_mem[objid][2][i-1]][1].style.left = -Math.round(frex_mem[objid][0][3]*((ratio-0.5)*0.125-0.125));
				}

				if (i>1) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i-2]][1], 1);
					frex_mem[objid][1][frex_mem[objid][2][i-2]][2] = 1;
					frex_mem[objid][1][frex_mem[objid][2][i-2]][1].style.left = 0;
				}

				if (i<frex_mem[objid][2].length-1) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+1]][1], 3.5-ratio);
					frex_mem[objid][1][frex_mem[objid][2][i+1]][2] = 3.5-ratio;
					frex_mem[objid][1][frex_mem[objid][2][i+1]][1].style.left = -Math.round(frex_mem[objid][0][3]*((3.5-ratio)*0.125-0.125));

				}

				if (i<frex_mem[objid][2].length-2) {
					frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i+2]][1], 3-ratio);
					frex_mem[objid][1][frex_mem[objid][2][i+2]][2] = 3-ratio;
					frex_mem[objid][1][frex_mem[objid][2][i+2]][1].style.left = -Math.round(frex_mem[objid][0][3]*((3-ratio)*0.125-0.125));

				}
			}

			break;
		}
	}
}

function frex_table_getdefault(objid) {
	var i,j;
	var defflag = true;
//	var rootobj = document.getElementById("frex_table_"+objid);
	for (i=0;i<frex_mem[objid][2].length;i++) {
		if (frex_mem[objid][1][frex_mem[objid][2][i]][2]>1) {
			defflag = false;

			if (frex_mem[objid][1][frex_mem[objid][2][i]][2]<1.1) {
				frex_mem[objid][1][frex_mem[objid][2][i]][1].style.left = 0;
				frex_mem[objid][1][frex_mem[objid][2][i]][1].style.top = i*frex_mem[objid][0][4];
				frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i]][1], 1);
				frex_mem[objid][1][frex_mem[objid][2][i]][2] = 1;
			} else {
				frex_mem[objid][1][frex_mem[objid][2][i]][1].style.left = Math.round(parseInt(frex_mem[objid][1][frex_mem[objid][2][i]][1].style.left.replace("px",""))*0.5);
				frex_mem[objid][1][frex_mem[objid][2][i]][1].style.top = ((i*frex_mem[objid][0][4])>>1)+Math.round(parseInt(frex_mem[objid][1][frex_mem[objid][2][i]][1].style.top.replace("px",""))*0.5);
				frex_mem[objid][1][frex_mem[objid][2][i]][2] -= (frex_mem[objid][1][frex_mem[objid][2][i]][2]-1)*0.5;
				frex_table_objectscalebyratio(objid, frex_mem[objid][1][frex_mem[objid][2][i]][1], frex_mem[objid][1][frex_mem[objid][2][i]][2]);
			}
		} else if (!defflag) {
			break;
		}
	}

	if (!defflag)
		setTimeout("frex_table_getdefault("+objid+")", 20);
}

function frex_table_onmouseout(objid) {
	if (!frex_mem[objid][0][6])
		frex_table_getdefault(objid);
}
function frex_table_itemonclick(objid, obj) {
	if (obj[4])
		location.href = obj[4];
}