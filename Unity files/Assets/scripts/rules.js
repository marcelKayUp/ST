#pragma strict
public var playerPrefab:GameObject;
 public var blueMat:Material;
 public var cyanMat:Material;
 public var greenMat:Material;
 public var greyMat:Material;
 public var redMat:Material;
 public var whiteMat:Material;
 public var yellowMat:Material;
 public var mainCam:Transform;

var playerName = new String[6];
var playerPosition = new Vector3[6];
var currentDestination = new String[6];
var playerColor = new String[6];
var engineUpgrade = new int[6];
var cargoUpgrade = new int[6];
var playerMoney = new int[6];
var isHuman = new int[6];
var playerVelocity = new float[6];

var contractStart:String[];
var contractEnd:String[];
var goods:int[];
var pay:int[];
var specialRule:int[];
var isAcceptedBy:int[];
var isLoaded:int[];

var contractQuantity:int;
var playerCount:int;
public var round:int;
var date:String;
var activePlayer:int;
var eta:int[];

var menueHandler:game_menue_handler;
var pathFinding:pathfinding;
public var planetHandler:planet_rotation;
var angle:float;

var newGame:boolean;

function StartGame(){
	if(PlayerPrefs.GetInt("0_newGame")==1){
		newGame=true;
	}
	else{
	newGame=false;
	}
	if(newGame){
		StartNewGame();
		print("new game");
	}
	else{
		StartLoadedGame();
		print("loaded game");
		//print("Auftrag 2 gehört Spieler " + isAcceptedBy[2]);
	}

}

function FixedUpdate(){
print("Aktiver Spieler:" + activePlayer);
}
function StartNewGame () {
	

	var lineThickness:float=0.05;
	
	contractQuantity = PlayerPrefs.GetInt("0_contractQuantity");
	contractStart = new String[contractQuantity];
	contractEnd  =new String[contractQuantity];
	goods = new int[contractQuantity];
	pay = new int[contractQuantity];
	specialRule = new int[contractQuantity];
	isAcceptedBy = new int[contractQuantity];
	isLoaded = new int[contractQuantity];
	//lade spielerbezogene Daten
	
	playerCount = PlayerPrefs.GetInt("0_playerCount");
	playerName = new String[playerCount];
 	playerPosition = new Vector3[playerCount];
 	playerColor = new String[playerCount];
 	engineUpgrade = new int[playerCount];
 	cargoUpgrade = new int[playerCount];
 	playerMoney = new int[playerCount];
 	isHuman = new int[playerCount];
 	eta = new int[playerCount];
 	playerVelocity = new float[playerCount];
 	currentDestination = new String[playerCount];
	for(var m : int = 0; m < PlayerPrefs.GetInt("0_playerCount")  ; m++){
   				//lade Namen
				playerName[m] = PlayerPrefs.GetString("0_playerName_"+m);
				//lade Positionen
				playerPosition[m].x =  PlayerPrefs.GetFloat("0_position_x_"+m);
				playerPosition[m].y = PlayerPrefs.GetFloat("0_position_y_"+m);
				playerPosition[m].z = PlayerPrefs.GetFloat("0_position_z_"+m);
				//lade Spielerfarbe
				playerColor[m] = PlayerPrefs.GetString("0_playerColor_"+m);
				//lade Upgrades
				cargoUpgrade[m] = PlayerPrefs.GetInt("0_cargoUpgrade_"+m);
				engineUpgrade[m] = PlayerPrefs.GetInt("0_engineUpgrade_"+m);
				//lade Geld
				playerMoney[m] = PlayerPrefs.GetInt("0_playerMoney_"+m);
				//lade "Mensch/Computer"; 0=Computer, 1=Mensch
				isHuman[m] = PlayerPrefs.GetInt("0_isHuman_"+m);
				currentDestination[m] = PlayerPrefs.GetString("0_currentDestination_"+m);
				
			}
					
	round = PlayerPrefs.GetInt("0_round");
	planetHandler.time=round;
	//setze Datum und Exist
	date = PlayerPrefs.GetString("0_date");
	
	
	//erschaffe Spielfiguren
 	for(var v : int = 0; v < playerCount ; v++){
		var player = Instantiate(playerPrefab,playerPosition[v], Quaternion.identity);
		// var tmpDirection = (GameObject.Find(currentDestination[v]).transform.position - player.transform.position);
		//angle = Mathf.Atan2(tmpDirection.y,tmpDirection.x)*Mathf.Rad2Deg;
		player.gameObject.transform.rotation = Quaternion.Euler(Vector3(0,0, angle));
		player.name= "Player_"+v;
		var line = player.gameObject.AddComponent(LineRenderer);
		line.material = new Material(Shader.Find("MK/MKGlow/Particles/Additive"));
		line.SetWidth(lineThickness,lineThickness);
		line.SetVertexCount(2);
		line.GetComponent.<Renderer>().enabled = true;
		line.SetColors(SelectPlayerColor(playerColor[v]), SelectPlayerColor(playerColor[v]));
		player.GetComponent.<Renderer>().material = SelectPlayerMaterial(playerColor[v]);


		//line.SetPosition(0,player.transform.position);
		//line.SetPosition(1,GameObject.Find(currentDestination[v]).transform.position);
		
	}
	//SaveGame(0);
	if(contractQuantity<=0){
	contractQuantity=0;
	AddContract("earth","venus",3, 2000, 0, 7,7);
	AddContract("earth","jupiter",1, 1250, 0, 7,7);
	AddContract("earth","mercury",2, 950, 0, 7,7);
	AddContract("earth","saturn",12, 13450, 0, 7,7);
	AddContract("venus","mars",3, 900, 0, 7,7);
	
	}
}


function StartLoadedGame(){
	var lineThickness:float=0.05;
/*	
	contractQuantity = PlayerPrefs.GetInt("0_contractQuantity");
	contractStart = new String[contractQuantity];
	contractEnd  =new String[contractQuantity];
	goods = new int[contractQuantity];
	pay = new int[contractQuantity];
	specialRule = new int[contractQuantity];
	isAcceptedBy = new int[contractQuantity];
	isLoaded = new int[contractQuantity];
	//lade spielerbezogene Daten
	
	playerCount = PlayerPrefs.GetInt("0_playerCount");
	playerName = new String[playerCount];
 	playerPosition = new Vector3[playerCount];
 	playerColor = new String[playerCount];
 	engineUpgrade = new int[playerCount];
 	cargoUpgrade = new int[playerCount];
 	playerMoney = new int[playerCount];
 	isHuman = new int[playerCount];
 	eta = new int[playerCount];
 	playerVelocity = new float[playerCount];
 	currentDestination = new String[playerCount];
 	
	for(var m : int = 0; m < PlayerPrefs.GetInt("0_playerCount")  ; m++){
   				//lade Namen
				playerName[m] = PlayerPrefs.GetString("0_playerName_"+m);
				//lade Positionen
				playerPosition[m].x =  PlayerPrefs.GetFloat("0_position_x_"+m);
				playerPosition[m].y = PlayerPrefs.GetFloat("0_position_y_"+m);
				playerPosition[m].z = PlayerPrefs.GetFloat("0_position_z_"+m);
				//lade Spielerfarbe
				playerColor[m] = PlayerPrefs.GetString("0_playerColor_"+m);
				//lade Upgrades
				cargoUpgrade[m] = PlayerPrefs.GetInt("0_cargoUpgrade_"+m);
				engineUpgrade[m] = PlayerPrefs.GetInt("0_engineUpgrade_"+m);
				//lade Geld
				playerMoney[m] = PlayerPrefs.GetInt("0_playerMoney_"+m);
				//lade "Mensch/Computer"; 0=Computer, 1=Mensch
				isHuman[m] = PlayerPrefs.GetInt("0_isHuman_"+m);
				currentDestination[m] = PlayerPrefs.GetString("0_currentDestination_"+m);
				
			}
					
	round = PlayerPrefs.GetInt("0_round");
	planetHandler.time=round;
	//setze Datum und Exist
	date = PlayerPrefs.GetString("0_date");
	*/
 	for(var v : int = 0; v < playerCount ; v++){
		var player = Instantiate(playerPrefab,playerPosition[v], Quaternion.identity);
		// var tmpDirection = (GameObject.Find(currentDestination[v]).transform.position - player.transform.position);
		//angle = Mathf.Atan2(tmpDirection.y,tmpDirection.x)*Mathf.Rad2Deg;
		player.gameObject.transform.rotation = Quaternion.Euler(Vector3(0,0, angle));
		player.name= "Player_"+v;
		var line = player.gameObject.AddComponent(LineRenderer);
		line.material = new Material(Shader.Find("MK/MKGlow/Particles/Additive"));
		line.SetWidth(lineThickness,lineThickness);
		line.SetVertexCount(2);
		line.GetComponent.<Renderer>().enabled = true;
		line.SetColors(SelectPlayerColor(playerColor[v]), SelectPlayerColor(playerColor[v]));
		player.GetComponent.<Renderer>().material = SelectPlayerMaterial(playerColor[v]);
	}

}

function SelectPlayerMaterial(playerClr:String){
	var mat:Material;
	switch (playerClr){
			case "blue":
				mat = blueMat;
				break;
			case "cyan":
				mat = cyanMat;
				break;
			case "grey":
				mat = greyMat;
				break;
			case "green":
				mat = greenMat;
				break;
			case "red":
				mat = redMat;
				break;
			case "white":
				mat = whiteMat;
				break;
			case "yellow":
				mat = yellowMat;
				break;
		}
	return mat;
}

function SelectPlayerColor(playerClr:String){
	var clr:Color;
	switch (playerClr){
			case "blue":
				clr = Color.blue;
				break;
			case "cyan":
				clr = Color.cyan;
				break;
			case "grey":
				clr = Color.grey;
				break;
			case "green":
				clr = Color.green;
				break;
			case "red":
				clr = Color.red;
				break;
			case "white":
				clr = Color.white;
				break;
			case "yellow":
				clr = Color.yellow;
				break;
		}
	return clr;
}


function AddContract(cs:String,ce:String,cg:int, cp:int, cr:int, cc:int,cl:int){
	// erstelle temporäre Arrays
	var tempStart = new Array(contractStart);
	var tempEnd = new Array(contractEnd);
 	var tempGoods = new Array(goods);
 	var tempPay = new Array(pay);
 	var tempSpecial = new Array (specialRule);
 	var tempAccepted = new Array (isAcceptedBy);
 	var tempLoaded = new Array (isLoaded);
 	
 	// Werte ins temporäre Array schreiben
 	tempStart.Push(cs);
 	tempEnd.Push(ce);
 	tempGoods.Push(cg);
 	tempPay.Push(cp);
 	tempSpecial.Push(cr);
 	tempAccepted.Push(cc);
 	tempLoaded.Push(cl);
 	
 	//Anzahl der Verträge erhöhen
 	contractQuantity+=1;
 	//alte Arrays mit neuer größe initialisieren
 	contractStart= new String[contractQuantity];
 	contractEnd= new String[contractQuantity];
 	goods= new int[contractQuantity];
 	pay= new int[contractQuantity];
 	specialRule= new int[contractQuantity];
 	isAcceptedBy= new int[contractQuantity];
 	isLoaded= new int[contractQuantity];
 	
 	//temporäre Arrays in neu initialisierte Arrays schreiben
 	contractStart= tempStart;
 	contractEnd= tempEnd;
 	goods= tempGoods;
 	pay= tempPay;
 	specialRule= tempSpecial;
 	isAcceptedBy= tempAccepted;
 	isLoaded= tempLoaded;	

}

function RemoveContract(id:int){
	// erstelle temporäre Arrays
	var tempStart = new Array(contractStart);
	var tempEnd = new Array(contractEnd);
 	var tempGoods = new Array(goods);
 	var tempPay = new Array(pay);
 	var tempSpecial = new Array (specialRule);
 	var tempAccepted = new Array (isAcceptedBy);
 	var tempLoaded = new Array (isLoaded);
 	
 	// Wert entfernen
 	tempStart.RemoveAt(id);
 	tempEnd.RemoveAt(id);;
 	tempGoods.RemoveAt(id);
 	tempPay.RemoveAt(id);
 	tempSpecial.RemoveAt(id);
 	tempAccepted.RemoveAt(id);
 	tempLoaded.RemoveAt(id);
 	
 	// Anzahl der Arrays reduzieren
 	contractQuantity-=1;
 	
 	//alte Arrays mit neuer größe initialisieren
 	contractStart= new String[contractQuantity];
 	contractEnd= new String[contractQuantity];
 	goods= new int[contractQuantity];
 	pay= new int[contractQuantity];
 	specialRule= new int[contractQuantity];
 	isAcceptedBy= new int[contractQuantity];
 	isLoaded= new int[contractQuantity];
 	
 	//temporäre Arrays in neu initialisierte Arrays schreiben
 	contractStart= tempStart;
 	contractEnd= tempEnd;
 	goods= tempGoods;
 	pay= tempPay;
 	specialRule= tempSpecial;
 	isAcceptedBy= tempAccepted;
 	isLoaded= tempLoaded;	
}






function GetContract(id:int){
	//erstelle Daten-Array des Vertrags
	var returnValue = new Array();
	returnValue.Push(contractStart[id]);
	returnValue.Push(contractEnd[id]);
	returnValue.Push(goods[id]);
	returnValue.Push(pay[id]);
	returnValue.Push(specialRule[id]);
	returnValue.Push(isAcceptedBy[id]);
	returnValue.Push(isLoaded[id]);
	//Rückgabe des Arrays
	return(returnValue);
}

function GetContract(planet:String){
	var returnValue = new Array();
	for(var j:int = 0; j< contractQuantity; j++){
		if(contractStart[j] == planet){
			returnValue.push(j);
		}
	}
	return(returnValue);

}
function GetContractDestination(id:int){
	var returnValue = GameObject.Find(contractEnd[id]).name;
	return returnValue;
}

function GetContractStart(id:int){
	var returnValue = GameObject.Find(contractStart[id]);
	return returnValue;
}



function ContractComplied(id:int, playerID:int){
	//Geld geben und so
	var money:int=GetContract(id)[3];
	playerMoney[playerID]+=money;
	RemoveContract(id);
}

function LoadContract(id:int, playerID:int){




}

function MoveShip(playerID:int, nextPoint:Transform, speed:float){



	//rotation zum Ziel
	var targetDirection= nextPoint.position - transform.position;
	var newDirection= Vector3.RotateTowards(transform.forward, targetDirection, 5, 0.0);
	transform.rotation = Quaternion.LookRotation(newDirection);
	
	//bewegung zum Ziel
	transform.Translate(Vector3.forward * speed);

}


function NextRound(){

//neue routen anzeigen
//ereignisse ausführen
//evtl KI aktionen

//Zeit weiterstellen


//Planeten weiter drehen


// Zerstöre alle Predicts
var scan:GameObject;
if(GameObject.FindGameObjectsWithTag("prediction")){
	for(scan in GameObject.FindGameObjectsWithTag("prediction")) {
	GameObject.Destroy(scan);
	}
}

//Raumschiff bewegen
MovePlayer(activePlayer, currentDestination[activePlayer]);
//ende der Runde anzeiger + rundenanzahl anzeigen
	//nächster Spieler
	if(activePlayer == playerCount-1){
		planetHandler.MovePlanet();
		activePlayer=0;
		planetHandler.time+=1;
		round++;
	}
	else{
		activePlayer++;
	}
	//GameObject.Find("Player_"+activePlayer).transform.position.x
	mainCam.transform.position.x = 0;
	mainCam.transform.position.y = 0;
	menueHandler.SetFoucs("free");	
}



// Raumschiff Ziel zuweisen

function SetDestination(playerID:int, destination:String){
	currentDestination[playerID]=destination;
// wenn Schiff am Planeten, dann "Unchild"
	var predictedRound = round+1;
	var angleWay:float;
	var playerShip = GameObject.Find("Player_"+playerID);
	var speed:float = playerVelocity[playerID];
	var planetDestination = GameObject.Find(destination);
	if(playerShip.transform.parent!=null){
		playerShip.transform.parent=null;
	}
	
// kalkuliere Weg zum Ziel
	var distanceVector: Vector3;
	var playerAcc = CalculatePlayerAcceleration(playerID);
	var calculatedPoint = planetHandler.PlanetPrediction (destination, predictedRound);
	angleWay = Vector3.Angle(playerShip.transform.position, calculatedPoint);
	var transitionArray = new Array();
	var currentPosition = playerShip.transform.position;
	//var direction = Vector3.RotateTowards(currentPosition, planetDestination.transform.position, angleWay/2,speed);
	var distance = (planetDestination.transform.position - currentPosition).magnitude;
	var point= new GameObject("translation point player " + playerID);
	point.transform.position = currentPosition;
	while(speed<=distance){
		predictedRound+=1;
		transitionArray.Add(currentPosition);
		speed+=playerAcc;
		calculatedPoint = planetHandler.PlanetPrediction (destination, predictedRound);
		distanceVector = calculatedPoint-currentPosition;
		distance = (calculatedPoint - currentPosition).magnitude;
		point.transform.position+= (distanceVector / distance) * speed;
		currentPosition = point.transform.position;		
	}
	transitionArray.Add(calculatedPoint);
// Planetenprojektion erschaffen
	for(var j:int = 0; j<planetHandler.planet.length; j++){
		if(planetHandler.planet[j].name == destination){
			planetHandler.InitPlanet(planetHandler.predictedPlanet[j], planetHandler.planet[j].name + " prediction", planetHandler.apoapsis[j], planetHandler.periapsis[j], planetHandler.eccentricity[j], planetHandler.inclination[j], GameObject.Find("Sun").transform, planetHandler.angularVelocity[j], planetHandler.rotationAx[j],"prediction", predictedRound);		
		}
	}
	
// zeichne Weg zum Ziel

	var movementPath = new GameObject("Movement of player " + playerID);
	var movementPathDraw = movementPath.gameObject.AddComponent(LineRenderer);
	movementPathDraw.material = new Material(Shader.Find("MK/MKGlow/Particles/Additive"));
	movementPathDraw.SetWidth(0.5,0.5);
	movementPathDraw.GetComponent.<Renderer>().enabled = true;
	movementPathDraw.SetColors(SelectPlayerColor(playerColor[playerID]), SelectPlayerColor(playerColor[playerID]));
	movementPathDraw.SetVertexCount(transitionArray.length);
	
	for (var n:int=0; n<transitionArray.length; n++){
		movementPathDraw.SetPosition(n, transitionArray[n]);
		print(transitionArray[n]);
	}
	
	//ETA setzen
	eta[playerID] = predictedRound-round;

}

//Berechnung der Beschleunigung
function CalculatePlayerAcceleration(playerID:int){
	var engineLvl = engineUpgrade[playerID];
	var cargoLvl = cargoUpgrade[playerID];
	var loadedCargo = 0;
	for(var i:int=0; i<isAcceptedBy.length; i++){
		if(isAcceptedBy[i]==playerID && isLoaded[i]==1){
			print("Fracht: " + loadedCargo);
			loadedCargo+=goods[i];
		}
	}
	var eu = engineLvl * engineLvl;
	var cu = cargoLvl * cargoLvl;
	var playerAcc = (1+eu)/(1+loadedCargo+(eu/2)+(cu/2));
	print("Beschl.: " + playerAcc);
	return playerAcc;
}


//ist das Schiff in der nähe eines Planeten soll dies zum Child werden
function CheckNearPlanet(player:GameObject){
	var scan:GameObject;
	if(player.transform.parent==null){
		if(GameObject.FindGameObjectsWithTag("Planet")){
			for(scan in GameObject.FindGameObjectsWithTag("Planet")) {
			var halfScale = scan.transform.lossyScale.x/1.9;
			var distance = (scan.transform.position - player.transform.position).magnitude;
				if(halfScale>=distance){
					player.transform.parent = scan.transform;
				}
			}
		}
	}
}

function CheckReachedDestination(playerID:int, destination:String){
	var player:GameObject=GameObject.Find("Player_"+playerID);
	var destinationPlanet:GameObject=GameObject.Find(destination);
	var halfScale = destinationPlanet.transform.lossyScale.x/1.9;
	var distance = (destinationPlanet.transform.position - player.transform.position).magnitude;
	if(halfScale>=distance && player.transform.parent==null){
		player.transform.parent = destinationPlanet.transform;
		currentDestination[playerID]=null;
		return true;
	}
	else if(halfScale>=distance && player.transform.parent!=null){
		currentDestination[playerID]=null;
		return true;
	}
	else{
		return false;
	}
}

function MovePlayer(playerID:int, destination:String){
	var player=GameObject.Find("Player_"+playerID);
	print(player.name);
	var calculatedPoint = planetHandler.PlanetPrediction (destination, round+1);
	if(CheckReachedDestination(playerID, destination)){
		 playerVelocity[playerID]=0;
		 print(destination + " ist erreicht!");
	}
	else{
		playerVelocity[playerID] += CalculatePlayerAcceleration(playerID);
		CheckNearPlanet(player);
		var distanceVector = calculatedPoint-player.transform.position;
		var distance = distanceVector.magnitude;
		player.transform.position+=(distanceVector / distance) * playerVelocity[playerID];
		//print("bewegt sich: "+ (distanceVector / distance) * playerVelocity[playerID]+ ", wobei v="+ playerVelocity[playerID]);
	}
}



function SaveGame(id:int){

	PlayerPrefs.SetInt(id+"_contractQuantity", contractQuantity);
	//speicher Vertragsdaten
	for(var q : int = 0; q< contractQuantity;q++){
				PlayerPrefs.SetString(id+"_"+q+"_contractStart",contractStart[q]);
				PlayerPrefs.SetString(id+"_"+q+"_contractEnd",contractEnd[q]);
				PlayerPrefs.SetInt(id+"_"+q+"_goods",goods[q]);
				PlayerPrefs.SetInt(id+"_"+q+"_pay",pay[q]);
				PlayerPrefs.SetInt(id+"_"+q+"_specialRule",specialRule[q]);
				PlayerPrefs.SetInt(id+"_"+q+"_isAcceptedBy",isAcceptedBy[q]);
				PlayerPrefs.SetInt(id+"_"+q+"_isLoaded",isLoaded[q]);
			}	

	PlayerPrefs.SetInt(id+"_playerCount", playerName.Length);
	for(var m : int = 0; m < playerCount; m++){
   				//speicher Namen
				PlayerPrefs.SetString(id+"_playerName_"+m, playerName[m]);
				print(playerName[m]);
				//speicher Positionen
				PlayerPrefs.SetFloat(id+"_position_x_"+m, playerPosition[m].x);
				PlayerPrefs.SetFloat(id+"_position_y_"+m, playerPosition[m].y);
				PlayerPrefs.SetFloat(id+"_position_z_"+m, playerPosition[m].z);
				//speicher Spielerfarbe
				PlayerPrefs.SetString(id+"_playerColor_"+m,playerColor[m]);
				//speicher Upgrades
				PlayerPrefs.SetInt(id+"_cargoUpgrade_"+m,cargoUpgrade[m]);
				PlayerPrefs.SetInt(id+"_engineUpgrade_"+m,engineUpgrade[m]);
				//speicher Geld
				PlayerPrefs.SetInt(id+"_playerMoney_"+m,playerMoney[m]);
				//speicher "Mensch/Computer"; 0=Computer, 1=Mensch
				PlayerPrefs.SetInt(id+"_isHuman_"+m,isHuman[m]);
				PlayerPrefs.SetString(id+"_currentDestination_"+m,currentDestination[m]);
				PlayerPrefs.SetFloat(id + "_playerVelocity_"+m, playerVelocity[m]);
			}
				
	//setze Datum, Runde und Exist
	date="T: "+ System.DateTime.Now.ToString("hh:mm") + "; D: " + System.DateTime.Now.ToString("MM/dd/yy");
	PlayerPrefs.SetInt(id+"_activePlayer", activePlayer);
	PlayerPrefs.SetInt(id+"_round", round);
	PlayerPrefs.SetString(id+"_date", date);
	PlayerPrefs.SetInt(id+"_exists", 1);
	PlayerPrefs.SetInt("0_newGame", 0);
	print("Speichere an Stelle: " + id);
}


function LoadGame(id:int){

	activePlayer=PlayerPrefs.GetInt(id+"_activePlayer");
	contractQuantity = PlayerPrefs.GetInt(id+"_contractQuantity");
	print("hier 2; Verträge:"+contractQuantity);
	
	
	contractStart = new String[contractQuantity];
	contractEnd  =new String[contractQuantity];
	goods = new int[contractQuantity];
	pay = new int[contractQuantity];
	specialRule = new int[contractQuantity];
	isAcceptedBy = new int[contractQuantity];
	isLoaded = new int[contractQuantity];
	//lade Vertragsdaten
	/*
	for(var q : int=0; q< contractQuantity;q++){
		AddContract(PlayerPrefs.GetString(id+"_"+q+"_contractStart") ,PlayerPrefs.GetString(id+"_"+q+"_contractEnd") ,PlayerPrefs.GetInt(id+"_"+q+"_goods"), PlayerPrefs.GetInt(id+"_"+q+"_pay"), PlayerPrefs.GetInt(id+"_"+q+"_specialRule"), PlayerPrefs.GetInt(id+"_"+q+"_acceptedContract"),PlayerPrefs.GetInt(id+"_"+q+"_isLoaded"));
		}	
		
	*/

	//lade spielerbezogene Daten
 	
 	playerCount = PlayerPrefs.GetInt(id+"_playerCount");
	playerName = new String[playerCount];
 	playerPosition = new Vector3[playerCount];
 	playerColor = new String[playerCount];
 	engineUpgrade = new int[playerCount];
 	cargoUpgrade = new int[playerCount];
 	playerMoney = new int[playerCount];
 	isHuman = new int[playerCount];
 	eta = new int[playerCount];
 	playerVelocity = new float[playerCount];
 	currentDestination = new String[playerCount];
 	
	
	for(var m : int = 0; m < playerCount ; m++){
   					//lade Namen
					playerName[m] = PlayerPrefs.GetString(id+"_playerName_"+m);
					print(playerName[m]);
					//lade Positionen
					playerPosition[m].x =  PlayerPrefs.GetFloat(id+"_position_x_"+m);
					playerPosition[m].y = PlayerPrefs.GetFloat(id+"_position_y_"+m);
					playerPosition[m].z = PlayerPrefs.GetFloat(id+"_position_z_"+m);
					//lade Spielerfarbe
					playerColor[m] = PlayerPrefs.GetString(id+"_playerColor_"+m);
					//lade Upgrades
					cargoUpgrade[m] = PlayerPrefs.GetInt(id+"_cargoUpgrade_"+m);
					engineUpgrade[m] = PlayerPrefs.GetInt(id+"_engineUpgrade_"+m);
					//lade Geld
					playerMoney[m] = PlayerPrefs.GetInt(id+"_playerMoney_"+m);
					//lade "Mensch/Computer"; 0=Computer, 1=Mensch
					isHuman[m] = PlayerPrefs.GetInt(id+"_isHuman_"+m);
					currentDestination[m] = PlayerPrefs.GetString(id+"_currentDestination_"+m);
					playerVelocity[m] = PlayerPrefs.GetFloat(id + "_playerVelocity_"+m);
				}
		print("Playername-Länge geladen: "+ playerName.length);			
	round = PlayerPrefs.GetInt(id+"_round");
	//setze Datum und Exist
	date = PlayerPrefs.GetString((id)+"_date");
	print("hier 6");
	SaveGame(0);
	Application.LoadLevel(1);
	
}
