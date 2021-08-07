var longeuer = 0, alongement = [], premier = "", score = 0, scoreTotal = 0, bonus = 0, conteurBonus = 0,
zorluk, a_gD = 0, forBestScore = "", volA = 0.3, volB = 1,
gamezone = document.querySelector("#gamezone"),
zoneBulls = document.querySelector("#zoneBulls"),
quiterPause = document.querySelector("#quiterPause"),
quiter = document.querySelector("#quiter"),
pause = document.querySelector("#pause"),
dilZone = document.querySelector("#choixLangue"),
ok = document.querySelector("#ok"),
nom = document.querySelector("#nom"),
identity = document.querySelector("#identity"),
langues = document.querySelectorAll("#blockChoix .langue"),
continuer = "",
langue = 0;

function Bscore(){
	this.nom = null;
	this.score = null;
	this.dificulte = null;
	this.duree = null;
	this.date = null;
}
var scoreDeLaPartie = new Bscore;

(function(){//initialisation bestCore
	var f1 = f2 = f3 = new Bscore;
	var f4 = new Array(f1,f2,f3);
	if(!(localStorage.getItem("bestScoresFacile"))){
		localStorage.setItem("bestScoresFacile",f4);
	}
	if(!(localStorage.getItem("bestScoresMoyen"))){
		localStorage.setItem("bestScoresMoyen",f4);
	}
	if(!(localStorage.getItem("bestScoresDificile"))){
		localStorage.setItem("bestScoresDificile",f4);
	}
	var tabZor = document.querySelectorAll("#bestScore #dificult tr"),
	tabOrta = document.querySelectorAll("#bestScore #avrage tr"),
	tabKolay = document.querySelectorAll("#bestScore #easy tr");

	for( var i = 1; i < 4; i++){
		var ZOR = localStorage.getItem("bestScoresDificile"),
		ORTA = localStorage.getItem("bestScoresMoyen"),
		KOLAY = localStorage.getItem("bestScoresFacile");

		tabZor[i].firstElementChild.innerHTML = ZOR[i-1].nom;
		tabZor[i].firstElementChild.nextElementSibling.innerHTML = ZOR[i-1].score;
		tabZor[i].lastElementChild.previousElementSibling.innerHTML = ZOR[i-1].duree;
		tabZor[i].lastElementChild.innerHTML = ZOR[i-1].date;

		tabOrta[i].firstElementChild.innerHTML = ORTA[i-1].nom;
		tabOrta[i].firstElementChild.nextElementSibling.innerHTML = ORTA[i-1].score;
		tabOrta[i].lastElementChild.previousElementSibling.innerHTML = ORTA[i-1].duree;
		tabOrta[i].lastElementChild.innerHTML = ORTA[i-1].date;

		tabKolay[i].firstElementChild.innerHTML = KOLAY[i-1].nom;
		tabKolay[i].firstElementChild.nextElementSibling.innerHTML = KOLAY[i-1].score;
		tabKolay[i].lastElementChild.previousElementSibling.innerHTML = KOLAY[i-1].duree;
		tabKolay[i].lastElementChild.innerHTML = KOLAY[i-1].date;
	}
})();

(function(){// seslik  ya da sessizlik settings
	var mYes = document.querySelector("#muzikYes"),
	mNo = document.querySelector("#muzikNo"),
	sYes = document.querySelector("#sesYes"),
	sNo = document.querySelector("#sesNo");
	sYes.onclick = function(){
		sNo.firstElementChild.style.background = "white";
		sYes.firstElementChild.style.background = "green";
		volB = 1;
	};
	mYes.onclick = function(){
		mNo.firstElementChild.style.background = "white";
		mYes.firstElementChild.style.background = "green";
		volA = 0.3;
	};
	sNo.onclick = function(){
		sNo.firstElementChild.style.background = "green";
		sYes.firstElementChild.style.background = "white";
		volB = 0;
	};
	mNo.onclick = function(){
		mNo.firstElementChild.style.background = "green";
		mYes.firstElementChild.style.background = "white";
		volA = 0;
	};
})();

(function(){//la gession des apparions chronologique
	if(sessionStorage.getItem("langue") && !sessionStorage.getItem("nom")){
		document.querySelector("#details").style.display = "block";
		gamezone.style.marginTop = "10px";
		document.querySelector("#un").style.display = "block";
	}
	if(sessionStorage.getItem("nom")){
		identity.style.display = "none";
		document.querySelector("#details").style.display = "block";
		gamezone.style.marginTop = "10px";
		document.querySelector("#un").style.display = "block";
	}
})();

(function(){//Dil Seçimi işlemleri
	if(!sessionStorage.getItem("langue")){
		dilZone.style.display = "block";
		langues[0].onclick = function(){
			sessionStorage.setItem("langue",0);
			dilZone.style.display = "none";
			mesTextes();
			document.querySelector("#details").style.display = "block";
			gamezone.style.marginTop = "10px";
			identity.style.display = "block";
			document.querySelector("#un").style.display = "block";
		};
		langues[1].onclick = function(){
			sessionStorage.setItem("langue",1);
			dilZone.style.display = "none";
			mesTextes();
			document.querySelector("#details").style.display = "block";
			gamezone.style.marginTop = "10px";
			identity.style.display = "block";
			document.querySelector("#un").style.display = "block";
		};
		langues[2].onclick = function(){
			sessionStorage.setItem("langue",2);
			dilZone.style.display = "none";
			mesTextes();
			document.querySelector("#details").style.display = "block";
			gamezone.style.marginTop = "10px";
			identity.style.display = "block";
			ocument.querySelector("#un").style.display = "block";
		};
	}	
})();
(function(){//Oyuncunun ismini alma işlemleri
	ok.onclick = function(){
		if( ((nom.value).trim()).length != 0 && 
			/^[\w].+/.test((nom.value).toString()) &&
			!(/^[\d].+/.test((nom.value).toString())) ){

			sessionStorage.setItem("nom",(nom.value).trim());
			identity.style.display = "none";
			mesTextes();
		}else{
			nom.style.borderColor = "red";
			document.querySelector("#invalidite").style.display = "block";
		}
	};
	document.querySelector("#identity input").onclick = function(){
		this.style.border = "1px solid green";
		this.value = "";
		document.querySelector("#invalidite").style.display = "none";
	};
})();
function mesTextes(){
	var langue = sessionStorage.getItem("langue");
	var mesTextes = {
		ok: ["Commencer", "Başlamak", "To start"],
		askName: ["Entre votre nom","Adınınzı yazın", "Enter your name"],
		invalidite: ["Ecrivez un nom correcte!","Doğru bir isim yazın!","Enter a correct name!"],
		niveau: ["Choisissez le niveau de dificulté", "Zorluluk düzeyini seçin","Choose the level of dificuty"],
		facile: ["Facile","Kolay","Easy"],
		moyen: ["Moyen","Orta","Avrage"],
		dificile: ["Dificile","Zor","Dificult"],
		pause: ["Pause","Durmak","Pause"],
		quiter: ["Quiter","Çikmak","Leave"],
		Continuer: ["Cliquer pour continuer","Devam etemek için Basın","click to continue"],
		dificulte: ["Dificulté","Zorluluk","Hardness"],
		duree: ["Durée","Süre","Duration"],
		score: ["Score","Skor","Score"],
		gameOver: ["Fin de la Partie!","Oyun Bitişi!","GameOver!"],
		yilanAdi: ["Nom du Serpent","Yılan Adı","Snake'S Name"]
	};
	function checkVer(a,b){
		if(document.querySelector("#" + a)){
			document.querySelector("#" + a).innerHTML = b;
		}
	}
	continuer = mesTextes.Continuer[langue];
	checkVer("askName", mesTextes.askName[langue]);
	checkVer("ok", mesTextes.ok[langue]);
	checkVer("invalidite", mesTextes.invalidite[langue]);
	checkVer("niveau", mesTextes.niveau[langue]);
	checkVer("facile", mesTextes.facile[langue]);
	checkVer("moyen", mesTextes.moyen[langue]);
	checkVer("dificile", mesTextes.dificile[langue]);
	(function(){
		switch(zorluk){
			case "zor":
			checkVer("dificulte2", mesTextes.dificile[langue]);
			break;
			case "orta":
			checkVer("dificulte2", mesTextes.moyen[langue]);
			break;
			case "kolay":
			checkVer("dificulte2", mesTextes.facile[langue]);
		}
	})();
	checkVer("pause", mesTextes.pause[langue]);
	checkVer("quiter", mesTextes.quiter[langue]);
	checkVer("level", mesTextes.dificulte[langue]);
	checkVer("dureeJ", mesTextes.duree[langue]);
	checkVer("scoreJ", mesTextes.score[langue]);
	checkVer("gOver", mesTextes.gameOver[langue]);
	checkVer("sName1", mesTextes.yilanAdi[langue] + " :");
	checkVer("score1", mesTextes.score[langue] + " :");
	checkVer("duree1", mesTextes.duree[langue] + " :");
}
mesTextes();
function initialisation(){
	quiterPause.style.display = "block";
	longeuer = score = bonus = conteurBonus = 0;
	alongement = [];
	document.querySelector("#dificulte").style.display = "none";
	zoneBulls.innerHTML = "";
	for(var y = 1; y <= 12; y++){
		for(var x = 1; x <= 25; x++){
			var step = document.createElement("div");
			step.className = "steps";
			//step.innerHTML = x + "-" + y;
			step.id = "step" + x + "_" + y;
			zoneBulls.appendChild(step);
		}
	}
} // a exectuter
function getionDuree(){
	window.dureeDiv = document.querySelector("#dureeDiv");/*"thu, 01 jan 1970 00:02:00 gmt+00:00"*/
	var b = (/ 0\d:(\d\d):(\d\d) /ig.exec((new Date(a_gD)).toString()));
	dureeDiv.innerHTML = ": " + b[1] + "'" + b[2] + "\"";
	a_gD += 1000;
}

(function(){//Selection du niveau de dificulte et lancement du jeux
	document.querySelector("#facile").onclick = function(){
		forBestScore = "bestScoresFacile";
		document.querySelector("#dificulte").style.display = "none";
		document.querySelector("#deux").style.display = "none";
		document.querySelector("#un").style.display = "none";
		document.querySelector("#trois").style.display = "block";
		initialisation();
		zorluk = "kolay";
		mesTextes();
		document.querySelector("#monId3 p").innerHTML = (sessionStorage.getItem("nom")).toUpperCase();
		judySnakeGame(800,5000);
		window.getionDureeRef = setInterval(getionDuree,1000);
	};
	document.querySelector("#moyen").onclick = function(){
		forBestScore = "bestScoresMoyen";
		document.querySelector("#dificulte").style.display = "none";
		document.querySelector("#deux").style.display = "none";
		document.querySelector("#un").style.display = "none";
		document.querySelector("#trois").style.display = "block";
		initialisation();
		zorluk = "orta";
		mesTextes();
		document.querySelector("#monId3 p").innerHTML = (sessionStorage.getItem("nom")).toUpperCase();
		judySnakeGame(500,4000);
		window.getionDureeRef = setInterval(getionDuree,1000);
	};
	document.querySelector("#dificile").onclick = function(){
		forBestScore = "bestScoresDificile";
		document.querySelector("#dificulte").style.display = "none";
		document.querySelector("#deux").style.display = "none";
		document.querySelector("#un").style.display = "none";
		document.querySelector("#trois").style.display = "block";
		initialisation();
		zorluk = "zor";
		mesTextes();
		document.querySelector("#monId3 p").innerHTML = (sessionStorage.getItem("nom")).toUpperCase();
		judySnakeGame(200,3000);
		window.getionDureeRef = setInterval(getionDuree,1000);
	};
})();
function getionScore(){
	if(scoreTotal < 10){
		document.querySelector("#score").innerHTML = ": 00" + scoreTotal + 
		"  (" + score + " + " + bonus + ")";
	}else if(scoreTotal >= 10 && scoreTotal < 100){
		document.querySelector("#score").innerHTML = ": 0" + scoreTotal +
		"  (" + score + " + " + bonus + ")";
	}else{
		document.querySelector("#score").innerHTML = ": " + scoreTotal; +
		"  (" + score + " + " + bonus + ")";
	}
	if(scoreTotal > 0 && scoreTotal <= 50){
		document.querySelector("#yildizlar").innerHTML = "⭐";
	}else if(scoreTotal > 50 && scoreTotal <= 100){
		document.querySelector("#yildizlar").innerHTML = "⭐⭐";
	}else if(scoreTotal > 100 && scoreTotal <= 150){
		document.querySelector("#yildizlar").innerHTML = "⭐⭐⭐";
	}else if(scoreTotal > 150 && scoreTotal <= 250){
		document.querySelector("#yildizlar").innerHTML = "⭐⭐⭐⭐";
	}else if(scoreTotal > 250){
		document.querySelector("#yildizlar").innerHTML = "⭐⭐⭐⭐⭐";
	}
}
function sourire(acb){
	var emojie = document.createElement("canvas"),
	emojiePapa = document.querySelector("#" + acb);
	emojiePapa.innerHTML = "";
	var context = emojie.getContext("2d");
	emojiePapa.appendChild(emojie);
	var w = context.width = parseInt(getComputedStyle(emojie.parentNode).width);
	var h = context.height = parseInt(getComputedStyle(emojie.parentNode).height);
	context.fillStyle = "rgb(100, 169, 42)";
	context.lineWidth = "2";
	context.beginPath();
	context.arc(w/2,h/2,h/2,0,2*Math.PI);
	context.fill();
	context.fillStyle = "yellow";
	context.beginPath();
	context.arc(30,25,5,0,2*Math.PI);
	context.fill();
	context.beginPath();
	context.arc(62,25,5,0,2*Math.PI);
	context.fill();
	context.strokeStyle = "rgb(51, 96, 9)";
	context.beginPath();
	context.arc(40,41,2,0,2*Math.PI);
	context.stroke();
	context.beginPath();
	context.arc(50,41,2,0,2*Math.PI);
	context.stroke();
	context.strokeStyle = "rgb(203, 249, 182)";
	context.beginPath();
	if(scoreTotal < 200){
		context.moveTo(25,55);
		context.bezierCurveTo(25,45+(scoreTotal/10),65,45+(scoreTotal/10),68,55);
		context.stroke();
	}else{
		context.moveTo(25,50);
		context.bezierCurveTo(25,70,65,70,68,50);
		context.fill();
	}	
}
function judySnakeGame(niveau,vitesse){
	
	window.muz1 = document.querySelector("#muzik");
	window.muz2 = document.querySelector("#sound");
	window.muz3 = document.querySelector("#failed");
	muz1.volume = volA;
	muz1.play();
	muz1.currentTime = 5;
	window.myInter = setInterval(function(){
		muz1.play();
		muz1.currentTime = 5;
	},muz1.duration*1000);

	scoreTotal = 0;
	a_gD = 0;
	getionDuree();
	getionScore();
	sourire("emojie");
	document.querySelector("#yildizlar").innerHTML = "";
	var steps = document.querySelectorAll(".steps");
	function bileyi(){
		var a = Math.floor((Math.random() * 12) + 1);
		var b = Math.floor((Math.random() * 25) + 1);
		return "step" + b + "_" + a;
	}
	var newBileyi = function(){
		var d = bileyi();
		var bileyiCheck = true;
		if((~(alongement.indexOf(document.querySelector("#" + d)))) || 
			( document.querySelector("#" + d) == premier) ||
			( document.querySelector("#" + d).className == "steps bonus")){
			bileyiCheck = false;
		}
		if(bileyiCheck){
			for(var i = 0, c = steps.length; i < c; i++){
				if(steps[i].id == d){
					steps[i].className = "steps bileyi";
					break;
				}
			}
		}else{
			newBileyi();
		}
	};
	var newBonus = function(){
		var d = bileyi();
		var bileyiCheck = true;
		if((~(alongement.indexOf(document.querySelector("#" + d)))) || 
			( document.querySelector("#" + d) == premier) || 
			(document.querySelector("#" + d).className == "steps bileyi")){
			bileyiCheck = false;
		}
		if(bileyiCheck){
			for(var i = 0, c = steps.length; i < c; i++){
				if(steps[i].id == d){
					steps[i].className = "steps bonus";
					break;
				}
			}
		}else{
			newBonus();
		}
	};
	newBileyi();
	document.querySelector("#step9_5").className = "steps laTete";
	window.snakeGame = {
		perdu: function(){
			muz1.pause();
			clearInterval(myInter);
			muz3.volume = volB;
			muz3.play();
			quiterPause.style.display = "none";
			window.helper = premier;
			//leSuivant = function(){};
			clearInterval(bbb);
			for(var i = alongement.length - 1; i >= 0; i--){
				alongement[i].className = "steps apresTete";
			}
			score = longeuer;
			longeuer = -1;
			document.removeEventListener("keydown",insider,null);
			setTimeout(function(){
				zoneBulls.innerHTML = "";
				document.querySelector("#dificulte").style.display = "block";
				document.querySelector("#trois").style.display = "none";
				document.querySelector("#deux").style.display = "block";
				sourire("blockimg2");
			},1500);
			clearInterval(getionDureeRef);
			document.querySelector("#sName2").innerHTML = scoreDeLaPartie.nom = sessionStorage.getItem("nom");
			document.querySelector("#score2").innerHTML = scoreDeLaPartie.score = 
			(/(\d{3})/ig.exec(document.querySelector("#score").innerHTML))[1];
			document.querySelector("#duree2").innerHTML = scoreDeLaPartie.duree = (/^: (.+)$/ig.exec(dureeDiv.innerHTML))[1];
			scoreDeLaPartie.date = ((new Date()).getDate()) + "/" + ((new Date()).getMonth() + 1) +
			"/" + ((new Date()).getFullYear());
			scoreDeLaPartie.dificulte = document.querySelector("#dificulte2").innerHTML;

			(function(){
				var bs = localStorage.getItem(forBestScore),
				triant = scoreDeLaPartie,
				sauvegarde = "";
				var triage = function(){
					for( var i = 0, c = bs.length; i < c; i++){
						if(bs[i].score = null){
							localStorage.getItem(forBestScore)[i] = triant;
							break;
						}else if(bs[i].score < triant.score){
							sauvegarde = localStorage.getItem(forBestScore)[i];
							localStorage.getItem(forBestScore)[i] = triant;
							triant = sauvegarde;
							triage();
							break;
						}
					}
				};
			})();	 
		},
		progression: function(a,b){
			window.direction = a;
			var steps = document.querySelectorAll(".steps");
			for(var i = 0, c = steps.length; i < c; i++){
				if(steps[i].className == "steps laTete"){
					premier = steps[i];
					premier.className = "steps";
					premier.style.background = "";
					break;
				}
			}
			window.leSuivant = function(){
				var no = /p(.+)$/i.exec(premier.id);
				no = no[1].split("_");
				switch(a){
					case "XR":
						var identity = "step" + (parseInt(no[0]) + 1) + "_" + no[1];
						window.bg = "fichier/droit.png";
					break;
					case "XL":
						var identity = "step" + (parseInt(no[0]) - 1) + "_" + no[1];
						window.bg = "fichier/gauche.png";
					break;
					case "YT":
						var identity = "step" + no[0] + "_" + (parseInt(no[1]) - 1);
						window.bg = "fichier/haut.png";
					break;
					case "YB":
						var identity = "step" + no[0] + "_" + (parseInt(no[1]) + 1);
						window.bg = "fichier/bas.png";
					break;
				}
				if(document.querySelector("#" + identity)){			
					if(!(~(alongement.indexOf(document.querySelector("#" + identity))))){
						var foodStep = document.querySelector("#" + identity);
						if(foodStep.className == "steps bileyi"){
							muz2.pause();
							muz2.currentTime = 0;
							muz2.volume = volB;
							muz2.play();
							setTimeout(function(){
								muz2.pause();
								muz2.currentTime = 0;
							},700);
							foodStep.className = "steps";
							score++;
							scoreTotal++;
							sourire("emojie");
							getionScore();
							longeuer++;	
							newBileyi();
							conteurBonus++;
							if(conteurBonus == 10){
								conteurBonus = 0;
								newBonus();
								setTimeout(function(){
									for(var i = 0, c = steps.length; i < c; i++){
										if(steps[i].className == "steps bonus"){
											steps[i].className = "steps";
											break;
										}
									}
								},vitesse);
							}
						}
						if(foodStep.className == "steps bonus"){
							muz2.pause();
							muz2.currentTime = 0;
							muz2.volume = volB;
							muz2.play();
							setTimeout(function(){
								muz2.pause();
								muz2.currentTime = 0;
							},700);							
							foodStep.className = "steps";
							bonus += (vitesse/1000);
							scoreTotal += (vitesse/1000);
							sourire("emojie");
							getionScore();
						}
						if(longeuer > 0){//Monteur de l'avancement et traitement cas longeure egale 0
							alongement.unshift(premier);
							alongement[longeuer] = premier;
						}
						(function(){//aide a la fonction food
							var test2 = false;
							for(var i = 0, c = steps.length; i < c; i++){
								if(steps[i].className == "steps bileyi"){
									test2 = true;
								}
							}
							if(!test2){
								newBileyi();
							}
						})();	
						premier = document.querySelector("#" + identity);
						premier.className = "steps laTete";
						premier.style.background = "url('" + bg + "')";
						if(longeuer > 0){//traitement cas longeure egale 0
							for(var i = longeuer, c = 1; i >= c ; i--){
								alongement[i].className = "steps apresTete";
							}	
						}
					}else{
						snakeGame.perdu();
					}
				}else{
					snakeGame.perdu();
				}
			};
			leSuivant();
				window.bbb = setInterval( function(){	
					premier.className = "steps";
					premier.style.background = "";
				if(longeuer > 0){//traitement cas longeure egale 0
					for(var i = longeuer, c = 1; i >= c ; i--){
						alongement[i].className = "steps";
					}
				}
				if(window.helper){
					helper.style.background = "url('" + bg + "')";
				}
				alongement.pop();//supression de l'item ayan perdu la valeur
				leSuivant();	
			},niveau);		
		}
	};
	snakeGame.progression("XR");
	function insider(e){
		function traquage(){
			clearInterval(bbb);
			var steps = document.querySelectorAll(".steps");
			for(var i = 0, c = steps.length; i < c; i++){
				if(steps[i].className == "steps laTete"){
					if(longeuer > 0){//traitement cas longeure egale 0
						for(var i = longeuer, c = 1; i >= c ; i--){
							alongement[i].className = "steps";
							alongement[i].style.background = "";
						}
					}
					steps[i].className = "steps";
					steps[i].style.background = "";
					alongement.pop();//supression de l'item ayan perdu la valeur
					//steps[i].style.background = "";
					break;
				}
			}	
		}
		switch(e.keyCode){
			case 39:
				if(direction != "XL"){
					traquage();	
					snakeGame.progression("XR");
				}
			break;
			case  38:
				if(direction != "YB"){
					traquage();		
					snakeGame.progression("YT");
				}
			break;
			case 37:
				if(direction != "XR"){
					traquage();		
					snakeGame.progression("XL");
				}
			break;
			case 40:
				if(direction != "YT"){
					traquage();		
					snakeGame.progression("YB");
				}
			break;
		}
	}
	document.addEventListener("keydown",insider,null);  
}//// a executer
pause.onclick = function(){
	alert(continuer);
}
quiter.onclick = function(){
	quiterPause.style.display = "none";
	snakeGame.perdu();
};