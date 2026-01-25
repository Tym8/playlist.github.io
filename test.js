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


all_ids=["2h51","alone","bipiano","chloe","chloe_v1","classic","dance","elephant","epica","fading","heart","lullaby","night","plant","rhino","rise","wave","waltz"];
kept_ids=[];

function playPlaylist() {
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

checkbox_ids=["checkbox_2h51","checkbox_alone","checkbox_bipiano","checkbox_chloe","checkbox_chloe_v1","checkbox_classic","checkbox_dance","checkbox_elephant","checkbox_epica","checkbox_fading","checkbox_heart","checkbox_lullaby","checkbox_night","checkbox_plant","checkbox_rhino","checkbox_rise","checkbox_wave","checkbox_waltz"];
for (let i = 0; i < checkbox_ids.length; i++) {
	let checkbx = document.getElementById(checkbox_ids[i]); 
	checkbx.addEventListener('change', (event) => {
  		if (!event.currentTarget.checked) {
			let delete_index = kept_ids.indexOf(all_ids[i]);
			kept_ids.splice(delete_index, 1);
			document.getElementById("p_"+all_ids[i]).innerHTML = "(0)";
			for (let j = 0; j < kept_ids.length; j++){
				document.getElementById("p_"+kept_ids[j]).innerHTML = j+1;
			}
  		}
		else if (event.currentTarget.checked) {
			kept_ids.push(all_ids[i]);
			document.getElementById("p_"+all_ids[i]).innerHTML = kept_ids.length;
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
			document.getElementById("p_"+all_ids[i]).innerHTML = kept_ids.length;
		}
	}
	else if (!event.currentTarget.checked) {
		kept_ids=[];
		for (let i = 0; i < checkbox_ids.length; i++) {
			document.getElementById(checkbox_ids[i]).checked = false;
			document.getElementById("p_"+all_ids[i]).innerHTML = "(0)";
		}
	}
})
