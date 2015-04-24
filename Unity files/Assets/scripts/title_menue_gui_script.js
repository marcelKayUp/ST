#pragma strict
 /*
 PlayerPrefs-Variablen:
x_playerName_1: string
x_playerName_2: string
x_playerName_3: string
x_playerName_4: string
x_playerName_5: string
x_playerName_6: string

x_position_x_1:float
x_position_y_1:float
x_position_z_1:float
x_position_x_2:float
x_position_y_2:float
x_position_z_2:float
x_position_x_3:float
x_position_y_3:float
x_position_z_3:float
x_position_x_4:float
x_position_y_4:float
x_position_z_4:float
x_position_x_5:float
x_position_y_5:float
x_position_z_5:float
x_position_x_6:float
x_position_y_6:float
x_position_z_6:float

x_playerCount: int
x_round:int
x_date:string
x_exists:int (0|1)

x=0...6; 0=current game, 1...6 saved games 
 
 
 Spieler 1 = player_0 ... Spieler 6 = player_5
 */

 public var coloredTexture:Texture[];
 public var blueMat:Material;
 public var cyanMat:Material;
 public var greenMat:Material;
 public var greyMat:Material;
 public var redMat:Material;
 public var whiteMat:Material;
 public var yellowMat:Material;
 public var playerMat:Material[];
 public var blueTex:Texture;
 public var cyanTex:Texture;
 public var greenTex:Texture;
 public var greyTex:Texture;
 public var redTex:Texture;
 public var whiteTex:Texture;
 public var yellowTex:Texture;
 
 
 
 
 public var guiSkin:GUISkin;
 public var btnSkin:GUISkin;
 
 public var soundOnBtn:Texture;
 public var soundOffBtn:Texture;
 public var clickSound:AudioClip;
public var playerName:String[];
public var playerColor:String[];
 
 var main:rules;
 
 var menueStat:int;
 var playerCount:int;
 private var gameID=6;
 
function Start () {
	menueStat=0;
	NextColor(0);
	NextColor(1);
	NextColor(2);
	NextColor(3);
	NextColor(4);
	NextColor(5);
}


function OnGUI(){
	var width = Screen.width;
	var sideBtnDistance=width/128;
	var btnWidth=width/15;
	var btnSpace=width/192;
	var buttonHeight=5*width/96;
	var titleHorizontalPosition=65*width/192;
	var titleUpperDistance=width/32;
	var titleHorizontalSize=31*width/96;
	var titleVerticalSize=5*width/96;




	//Back-Taste vom Handy = Quit
	if (Input.GetKeyDown(KeyCode.Escape)) {
		Application.Quit(); 
	}

	//Sound On/Off
	GUI.skin = btnSkin;
	if(PlayerPrefs.GetString("soundOption")=="off"){
		if (GUI.Button(Rect(Screen.width-btnWidth-sideBtnDistance, sideBtnDistance,btnWidth,btnWidth), soundOffBtn)){
			PlayerPrefs.SetString("soundOption", "on");
			PlayButtonSound();
		}
	}
	else{
		if (GUI.Button(Rect(Screen.width-btnWidth-sideBtnDistance, sideBtnDistance,btnWidth,btnWidth), soundOnBtn)){
			PlayerPrefs.SetString("soundOption", "off");
			PlayButtonSound();
		}
	}


	GUI.skin = guiSkin;
	guiSkin.label.fontSize=width/24;
	guiSkin.button.fontSize=width/32;
	guiSkin.textField.fontSize=width/32;
	
	if (menueStat!=2){
		GUI.Label(Rect(titleHorizontalPosition/2, titleUpperDistance/2,titleHorizontalSize*2,titleVerticalSize*2), "SPACE Truckers");
	}


	//Hauptmenü
	if(menueStat==0){
		if (PlayerPrefs.GetInt("0_exists") == 1){
			//Start-Button -> zur Spieleranzahl Auswahl
			if (GUI.Button(Rect(titleHorizontalPosition,21*btnSpace+1,titleHorizontalPosition,buttonHeight), "new game")){
				menueStat=1;
				PlayButtonSound();
			}
			if (GUI.Button(Rect(titleHorizontalPosition,32*btnSpace+1,titleHorizontalPosition,buttonHeight), "continue")){
				PlayButtonSound();
				print("Lädt 0");
				PlayerPrefs.SetInt("0_newGame", 0);
				LoadGame(0);
			}	
			//Load-Button	
			if (GUI.Button(Rect(titleHorizontalPosition,43*btnSpace+1,titleHorizontalPosition,buttonHeight), "Load")){
				menueStat=3;
				PlayButtonSound();
			}
			//Quit-Button
			if (GUI.Button(Rect(titleHorizontalPosition,54*btnSpace+1,titleHorizontalPosition,buttonHeight), "quit")){
				PlayButtonSound();
				Application.Quit();
			}
		}
		else{
			//Start-Button -> zur Spieleranzahl Auswahl
			if (GUI.Button(Rect(titleHorizontalPosition,21*btnSpace+1,titleHorizontalPosition,buttonHeight), "new game")){
				menueStat=1;
				PlayButtonSound();
			}
			//Load-Button	
			if (GUI.Button(Rect(titleHorizontalPosition,32*btnSpace+1,titleHorizontalPosition,buttonHeight), "Load")){
				menueStat=3;
				PlayButtonSound();
			}
			//Quit-Button
			if (GUI.Button(Rect(titleHorizontalPosition,43*btnSpace+1,titleHorizontalPosition,buttonHeight), "quit")){
				PlayButtonSound();
				Application.Quit();
			}
		}	
	}	

	//Spieleranzahl Auswahl
	if (menueStat==1){
		if (GUI.Button(Rect(titleHorizontalPosition,21*btnSpace+1,titleHorizontalPosition,buttonHeight), "2 Player")){
			menueStat=2;
			playerCount=2;
			PlayButtonSound();
		}
		if (GUI.Button(Rect(titleHorizontalPosition,32*btnSpace+1,titleHorizontalPosition,buttonHeight), "3 Player")){
			menueStat=2;
			playerCount=3;
			PlayButtonSound();
		}
		if (GUI.Button(Rect(titleHorizontalPosition,43*btnSpace+1,titleHorizontalPosition,buttonHeight), "4 Player")){
			menueStat=2;
			playerCount=4;
			PlayButtonSound();
		}
		if (GUI.Button(Rect(titleHorizontalPosition,54*btnSpace+1,titleHorizontalPosition,buttonHeight), "5 Player")){
			menueStat=2;
			playerCount=5;
			PlayButtonSound();
		}
		if (GUI.Button(Rect(titleHorizontalPosition,65*btnSpace+1,titleHorizontalPosition,buttonHeight), "6 Player")){
			menueStat=2;
			playerCount=6;
			PlayButtonSound();
		}			
		if (GUI.Button(Rect(titleHorizontalPosition,76*btnSpace+1,titleHorizontalPosition,buttonHeight), "back")){
			menueStat-=1;
			PlayButtonSound();
		}
	}


	//Spieloptionen
	if (menueStat==2){
		//Spielernamen Textfelder auflisten
    	for(var i : int = 0; i < playerCount; i++){	
    		//GUI.skin = guiSkin;
			playerName[i] = GUI.TextField(Rect(titleHorizontalPosition,10*btnSpace+1+(i*11*btnSpace+1),titleHorizontalPosition,buttonHeight),playerName[i],16);
			//GUI.skin = btnSkin;
			// GUI.Label(Rect(titleHorizontalPosition - btnWidth - 5,21*btnSpace+1+i*11*btnSpace+1,btnWidth,buttonHeight),coloredTexture,playerMat[i]);
			Graphics.DrawTexture(Rect(titleHorizontalPosition - btnWidth - 3,10*btnSpace+1+i*11*btnSpace+4,btnWidth-4,buttonHeight-6),coloredTexture[i]);
			if (GUI.Button(Rect(titleHorizontalPosition - btnWidth - 5,10*btnSpace+1+i*11*btnSpace+1,btnWidth,buttonHeight),"")){
				NextColor(i);
			}
			 			
   	 	}
    	GUI.skin = guiSkin;
    	//Spiel starten
    	if (GUI.Button(Rect(titleHorizontalPosition,12*btnSpace+1+((playerCount)*11*btnSpace+1),titleHorizontalPosition,buttonHeight), "start")){
    		//Setzen der Spieleranzahl in PlayerPrefs
    		PlayerPrefs.SetInt("0_playerCount", playerCount);
    		//Setzen der Spielernamen in PlayerPrefs
    		for(var j : int = 0; j < playerCount; j++){
   				PlayerPrefs.SetFloat("0_position_x_"+j, Random.Range(-100.0,100.0)); 
   				PlayerPrefs.SetFloat("0_position_y_"+j, Random.Range(-100.0,100.0));
   				PlayerPrefs.SetFloat("0_position_z_"+j, 0);
   				PlayerPrefs.SetString("0_playerColor_"+j, playerColor[j]);
   				PlayerPrefs.SetInt("0_cargoUpgrade_"+j, 0);
   				PlayerPrefs.SetInt("0_engineUpgrade_"+j, 0);
   				PlayerPrefs.SetInt("0_playerMoney_"+j, 0);
   				PlayerPrefs.SetInt("0_isHuman_"+j, 1);
   				PlayerPrefs.SetString("0_currentDestination_"+j, "venus");
				PlayerPrefs.SetString("0_playerName_"+j, playerName[j]);
			}	
			PlayButtonSound();
			PlayerPrefs.SetInt("0_newGame", 1);
			PlayerPrefs.SetInt("0_exists", 1);
			PlayerPrefs.SetInt("0_activePlayer", 0);
			//starte Hauptspiel
			Application.LoadLevel(1);
		}
		//zurück
		if (GUI.Button(Rect(titleHorizontalPosition,13*btnSpace+1+((playerCount+1)*11*btnSpace+1),titleHorizontalPosition,buttonHeight), "back")){
			menueStat-=1;
			PlayButtonSound();
		}
	}	
		
		
	//Spiel laden		
	if (menueStat==3){
		//Auflisten der Spielstände
    	for(var l : int = 0; l < gameID; l++){
   			if(PlayerPrefs.GetInt((l+1)+"_exists") == 1){
				if (GUI.Button(Rect(titleHorizontalPosition,21*btnSpace+1+(l*11*btnSpace+1),titleHorizontalPosition,buttonHeight),  PlayerPrefs.GetString((l+1)+"_date"))){
					PlayButtonSound();
					print("Lädt");
					PlayerPrefs.SetInt("0_newGame", 0);
					LoadGame(l+1);
				}
			}
		}	
		if (GUI.Button(Rect(titleHorizontalPosition,21*btnSpace+1+((6)*11*btnSpace+1),titleHorizontalPosition,buttonHeight), "back")){
			menueStat=0;
			PlayButtonSound();
		}
	}										
}
//GUI End

function PlayButtonSound(){
	if(PlayerPrefs.GetString("soundOption")=="off"){
		Handheld.Vibrate();
	}
	else{
		//AudioSource.PlayClipAtPoint(clickSound, Camera.main.transform.position);
	}
}



function LoadGame(id:int){
print("Lädt ID:"+id);
	main.LoadGame(id);
}




// Farbauswahl
function NextColor(player:int){
	var tempColor = new Array(playerColor);
	tempColor.RemoveAt(player);
	switch(playerColor[player]){
		case "blue":
				playerColor[player]="cyan";
				playerMat[player]=cyanMat;
				coloredTexture[player]=cyanTex;
			break;
		case "cyan":
				playerColor[player]="green";
				playerMat[player]=greenMat;
				coloredTexture[player]=greenTex;
			break;
		case "green":	
				playerColor[player]="grey";
				playerMat[player]=greyMat;
				coloredTexture[player]=greyTex;
			break;
		case "grey":	
				playerColor[player]="red";
				playerMat[player]=redMat;
				coloredTexture[player]=redTex;
			break;
		case "red":	
				playerColor[player]="white";
				playerMat[player]=whiteMat;
				coloredTexture[player]=whiteTex;
			break;
		case "white":	
				playerColor[player]="yellow";
				playerMat[player]=yellowMat;
				coloredTexture[player]=yellowTex;
			break;
		case "yellow":		
				playerColor[player]="blue";		
				playerMat[player]=blueMat;
				coloredTexture[player]=blueTex;
			break;
		default:		
				playerColor[player]="blue";		
				playerMat[player]=blueMat;
				coloredTexture[player]=blueTex;
			break;
	}
	//rekursive Prüfung ob Farbe vorhanden ist
	for(var g = 0; g <tempColor.length; g++){
		if(playerColor[player]==tempColor[g]){
		NextColor(player);
		}
	}
}
