function nextSongPlay(id1,id2,play_after) {
	let audio1 = document.getElementById(id1);
	let audio2 = document.getElementById(id2);
	audio1.addEventListener("ended", function(){
	if (play_after == true) { 
     	audio1.currentTime = 0;
     	audio2.play();
	}
});
}

all_names=["2h51","After The Storm","Alone","Classic","Collapsing","Dance","Duality","Elephant","Epica","Fading Away","Forest","Last Waltz","Late Night","Lullaby","Plant","Rhino","Rise","The Wave"]
all_ids=["2h51","storm","alone","classic","collapsing","dance","duality","elephant","epica","fading","forest","lastwaltz","latenight","lullaby","plant","rhino","rise","wave"];
kept_ids=[];
toggled_darkmode=false;

function playPlaylist() {
	for (let i = 0; i < all_ids.length; i++) {
		if (document.getElementById(all_ids[i]).paused==false){
                	document.getElementById(all_ids[i]).pause();
                	document.getElementById(all_ids[i]).currentTime = 0;
		}
	}

	first_song=true;
	if (kept_ids.length == 1) {
		let audio1 = document.getElementById(kept_ids[0]);
		audio1.play();
	}
	for (let i = 0; i < kept_ids.length-1; i++) {
		if (kept_ids.length > 1) {
			if (first_song == true) {
				let audio1 = document.getElementById(kept_ids[i]);
				audio1.play();
				first_song=false;
			}
			nextSongPlay(kept_ids[i],kept_ids[i+1],true);
		}
	}

};

function toggleDarkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  if (toggled_darkmode == false) {
  	document.getElementById("footer").innerHTML="Getting darker in here...";
        toggled_darkmode=true;
	}
  else {
	document.getElementById("footer").innerHTML="Thanks for visiting, see you soon !";
        toggled_darkmode=false;
       }
};

checkbox_ids=["checkbox_2h51","checkbox_storm","checkbox_alone","checkbox_classic","checkbox_collapsing","checkbox_dance","checkbox_duality","checkbox_elephant","checkbox_epica","checkbox_fading","checkbox_forest","checkbox_lastwaltz","checkbox_latenight","checkbox_lullaby","checkbox_plant","checkbox_rhino","checkbox_rise","checkbox_wave"];
for (let i = 0; i < checkbox_ids.length; i++) {
	let checkbx = document.getElementById(checkbox_ids[i]); 
	checkbx.addEventListener('change', (event) => {
  		if (!event.currentTarget.checked) {
			let delete_index = kept_ids.indexOf(all_ids[i]);
			kept_ids.splice(delete_index, 1);
			document.getElementById("p_"+all_ids[i]).innerHTML = all_names[i] + " (0)";
			for (let j = 0; j < kept_ids.length; j++){
				let index = all_ids.indexOf(kept_ids[j]);
				updated_index=j+1
				document.getElementById("p_"+kept_ids[j]).innerHTML =all_names[index]+" "+updated_index;
			}
  		}
		else if (event.currentTarget.checked) {
			kept_ids.push(all_ids[i]);
			document.getElementById("p_"+all_ids[i]).innerHTML = all_names[i]+" "+kept_ids.length;
		}
	})
}

let checkbx_all = document.getElementById("checkbox_all"); 
checkbx_all.addEventListener('change', (event) => {
	if (event.currentTarget.checked) {
		kept_ids=[];
		for (let i = 0; i < checkbox_ids.length; i++) {
			document.getElementById(checkbox_ids[i]).checked = true;
			kept_ids.push(all_ids[i]);
			document.getElementById("p_"+all_ids[i]).innerHTML = all_names[i]+" "+kept_ids.length;
		}
	}
	else if (!event.currentTarget.checked) {
		kept_ids=[];
		for (let i = 0; i < checkbox_ids.length; i++) {
			document.getElementById(checkbox_ids[i]).checked = false;
			document.getElementById("p_"+all_ids[i]).innerHTML = all_names[i]+" (0)";
		}
	}
})
