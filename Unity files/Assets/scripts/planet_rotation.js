#pragma strict
public var apoapsis: float[];
public var periapsis: float[];
public var eccentricity: float[];
public var inclination:float[];
public var sunPosition:Transform;
public var drawEclipse:boolean;
public var angularVelocity:float[];
public var planet:GameObject[];
public var predictedPlanet:GameObject[];
public var rotationAx:float[];
var time:int;
var stellarBody = new Array();
var main:rules;

function Start () {
//Erstellung der Planeten

stellarBody.Clear();
	if(drawEclipse==true){
		for(var i:int;i<planet.length;i++){
			DrawEllipse(planet[i], apoapsis[i], periapsis[i], eccentricity[i], inclination[i], sunPosition, 0.05);
			InitPlanet(planet[i], planet[i].name, apoapsis[i], periapsis[i], eccentricity[i],inclination[i], sunPosition, angularVelocity[i], rotationAx[i], "Planet", time);
		}
		
	}
	
}

//Erstellung der Orbits
function InitOrbits(orbitSize:float){
	for(var i:int;i<planet.length;i++){
		DrawEllipse(planet[i], apoapsis[i], periapsis[i], eccentricity[i], inclination[i], sunPosition, orbitSize);
	}
}


function MovePlanet () {
	if(drawEclipse==true){
		for(var i:int;i<planet.length;i++){
			MovePlanet(stellarBody[i], "bla", apoapsis[i], periapsis[i], eccentricity[i] ,inclination[i], sunPosition, angularVelocity[i], rotationAx[i], time);
		}
	}
}

//Vorhersage der Planetenposition anhand des Planetennamen und Rundenzeit (Vector3)
function PlanetPrediction (planetName:String, time:int){
	for(var i:int; i<planet.length; i++){
		if(planet[i].name == planetName){
			var predictedPosition = CalculateEllipsePosition(apoapsis[i], periapsis[i], eccentricity[i],inclination[i], sunPosition, angularVelocity[i], time);
			return predictedPosition;
		}
	}

}

//Vorhersage der Planetenposition anhand der Planetendaten (Vector3)
function CalculateEllipsePosition(apo:float, peri:float, eccent:float,incl:float, sunPosition:Transform, angVel:float, timeStamp:int){
	var phi = timeStamp*angVel;
	var rad=(((apo+peri)/2)*(1-eccent*eccent))/(1+eccent*Mathf.Cos(phi*Mathf.PI/180));
	var y_pos=rad*(Mathf.Sin((180-phi)*Mathf.PI/180));
	var x_pos=rad*(Mathf.Cos((180-phi)*Mathf.PI/180));
	var z_pos=incl*Mathf.PI/45*(Mathf.Cos((180-phi)*Mathf.PI/180));
	var planetPosition = new Vector3 (x_pos, y_pos, z_pos);
	return planetPosition;
}

//Zeichnen eines Orbits
function DrawEllipse(planet:GameObject,apo:float, peri:float, eccent:float,incl:float, sunPosition:Transform, thickness:float){
	// Positionsdaten
	var rad:float;
	var x_pos:float;
	var y_pos:float;
	var z_pos:float=0;
	var phi:float=0;
	// Linie der Ellipse
	var planetEllipse = new GameObject(planet.name + " orbit");
	planetEllipse.transform.position=sunPosition.position;
	var ellipseLine = planetEllipse.gameObject.AddComponent(LineRenderer);
	ellipseLine.material = new Material (Shader.Find("MK/MKGlow/Particles/Additive"));
	ellipseLine.SetWidth(thickness,thickness);
	ellipseLine.GetComponent.<Renderer>().enabled = true;
	ellipseLine.SetColors(Color.cyan, Color.cyan);
	ellipseLine.SetVertexCount(361);
	
	for(var i:int=0; i<361; i++){
	rad=(((apo+peri)/2)*(1-eccent*eccent))/(1+eccent*Mathf.Cos(phi*Mathf.PI/180));
	y_pos=rad*(Mathf.Sin((180-phi)*Mathf.PI/180));
	x_pos=rad*(Mathf.Cos((180-phi)*Mathf.PI/180));
	z_pos=incl*Mathf.PI/45*(Mathf.Cos((180-phi)*Mathf.PI/180));
	ellipseLine.SetPosition(i, Vector3(x_pos, y_pos, z_pos));
	phi++;
	}
	ellipseLine.gameObject.tag="orbit";
}

//Erstellung von Planeten anhand der Planetendaten
function InitPlanet(planet:GameObject, planetName:String, apo:float, peri:float, eccent:float,incl:float, sunPosition:Transform, angVel:float, rot:float,tag:String, timeStamp:int){
	var planetPosition = CalculateEllipsePosition (apo, peri, eccent, incl, sunPosition, angVel, timeStamp);
	var planetObject = Instantiate(planet,planetPosition, Quaternion.Euler(90,0,rot*timeStamp));
	planetObject.name = planetName;
	planetObject.gameObject.tag=tag;
	if(tag=="Planet"){
		stellarBody.Add(planetObject);
	}
}

//Änderung der Planetenposition
function MovePlanet(planet:GameObject, planetName:String, apo:float, peri:float, eccent:float,incl:float, sunPosition:Transform, angVel:float, rot:float, newTimeStamp:int){
	var newPosition = CalculateEllipsePosition (apo, peri, eccent, incl, sunPosition, angVel, newTimeStamp);
	planet.transform.position=newPosition;
	planet.transform.rotation.eulerAngles=Vector3(90+rot, 0, 0);
}