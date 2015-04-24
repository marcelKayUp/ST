#pragma strict

public var sun:GameObject;
public var mercury:GameObject;
public var venus:GameObject;
public var earth:GameObject;
public var mars:GameObject;
public var jupiter:GameObject;
public var saturn:GameObject;
public var uranus:GameObject;
public var neptune:GameObject;

public var cubeSize:float;
public var resolution:int=5;
public var gravFactor:float=1000.0;
public var navigationResolution:float=0.1;
public var navigationGrid:float=1;
public var gravConstant:float=100000;
private var gravity:float;
private var g_sun:float=274;
private var g_mercury:float=3.7;
private var g_venus:float=8.87;
private var g_earth:float=9.81;
private var g_mars:float=3.69;
private var g_jupiter:float=24.79;
private var g_saturn:float=10.44;
private var g_neptune:float=11.15;
private var g_uranus:float=8.87;

private var waySum:float;

private var checkedPositions=new Array();
private var count:int;
private var aStarArray=new Array();
private var pathArray = new Array();
private var aStarOpen= new Hashtable();
private var aStarOpenParent= new Hashtable();
private var aStarClosed=new Hashtable();
private var aStarClosedParent= new Hashtable();
private var sortingKeys = new Array();
private var sortingValues = new Array();
private var stepWidth=1/navigationResolution;
private var k=0;
private var gravGizmos:Vector3[];
private var gizmoPos:Vector3[];

function Start () {
	if(navigationResolution<=0){
		navigationResolution=1;
	}
	if(navigationGrid<=0){
		navigationGrid=1;
	}
	sun = GameObject.Find("Sun");
	mercury = GameObject.Find("mercury");
	venus = GameObject.Find("venus");
	earth = GameObject.Find("earth");
	mars = GameObject.Find("mars");
	jupiter = GameObject.Find("jupiter");
	saturn = GameObject.Find("saturn");
	uranus = GameObject.Find("uranus");
	neptune = GameObject.Find("neptune");

}
	

function AStar(start:Vector3, end:Vector3, stepWidth:float){
aStarOpen.Clear();
aStarClosed.Clear();
aStarOpenParent.Clear();
aStarClosedParent.Clear();
aStarOpen.Add(start,0);
var currentNode:Vector3;
var distance:float;
var n=0;
	do{
	n++;
		sortingKeys.Clear();
		sortingValues.Clear();
		// Hashtable sortieren!
		for(key in aStarOpen.Keys){
			sortingValues.Add(aStarOpen[key]);
		}
		sortingValues.Sort();
		for(key in aStarOpen.Keys){
			if(aStarOpen[key]==sortingValues[0]){
				currentNode = key;
				distance = aStarOpen[key];
				aStarOpen.Remove(key);
				break;
			}
		}
		if((end - currentNode).magnitude <= stepWidth){
			print("Pfad gefunden! " + n);
			print("Knotenanzahl: " + aStarOpenParent.Count);
			aStarOpenParent.Add(end, currentNode);
			DrawPath(start, end, aStarOpenParent);
			return; //hier den Pfad zurückgeben!
		}
		aStarClosed.Add(currentNode, distance);
		PathExpand(currentNode, end, start);
	
	}while(aStarOpen.Count>0);
	print("kein Pfad moeglich! " + n);
	return; // Pfad nicht gefunden
}

function PathExpand(waypoint:Vector3, end:Vector3, start:Vector3){
	var velocity=0.0;
	for(var x:int=-stepWidth; x<= stepWidth; x+=stepWidth){
		for(var y:int=-stepWidth; y<=stepWidth;y+=stepWidth){
			//for(var z:int=-stepWidth;z<=stepWidth;z+=stepWidth){
			var z=0;
			var newPoint = waypoint+Vector3(x,y,z);
				if(aStarClosed.ContainsKey(newPoint)){
				}
				else{
					var currentGrav=GetGravity(newPoint);
					var g_currentWaypoint= (start - waypoint).magnitude;
					var h_distance =(end - newPoint).magnitude;
					var c_distance = (waypoint - newPoint).magnitude;
					var c_grav=Mathf.Cos(Vector3.Angle(end-currentGrav, end))*currentGrav.magnitude;
					//if(c_grav<0){
					velocity-=c_grav;
						c_distance=c_distance+velocity;
					//}
					if(aStarOpen.ContainsKey(newPoint) && g_currentWaypoint +  c_distance >= h_distance/velocity){
					 }
					 else{
					 	if(aStarOpenParent.Contains(newPoint)){
					 		aStarOpenParent.Remove(newPoint);
							aStarOpenParent.Add(newPoint, waypoint);
						}
						else{
							aStarOpenParent.Add(newPoint, waypoint);
						}
						if(aStarOpen.ContainsKey(newPoint)){
							aStarOpen.Remove(newPoint);
							aStarOpen.Add(newPoint, (g_currentWaypoint + h_distance + c_distance));
						}
						else{
							aStarOpen.Add(newPoint, (g_currentWaypoint + h_distance + c_distance));
							
						}
					}
				//}
			}
		}
	}



}


function DrawPath(start:Vector3, end:Vector3, path:Hashtable){
	var theWay= new GameObject("path");
	theWay.transform.position=start;
	var line = theWay.gameObject.AddComponent(LineRenderer);
		line.material = new Material(Shader.Find("Mobile/Particles/Additive"));
		line.SetWidth(1,1);
		line.GetComponent.<Renderer>().enabled = true;
		line.SetColors(Color.green, Color.red);
		pathArray.Clear();
		var nextDrawStep = end;
	do{
		pathArray.Add(nextDrawStep);
		nextDrawStep=path[nextDrawStep];
	}
	while(!(nextDrawStep==start));
	line.SetVertexCount(pathArray.length);
	for(var j:int=0; j<pathArray.length;j++){
		line.SetPosition(j, pathArray[j]);
	}
	
}


function GetGravity(point:Vector3){

				var sun_delta_g = point- sun.transform.position;
				var sun_effective_g = (g_sun*gravConstant/Mathf.Pow(sun_delta_g.magnitude*sun_delta_g.magnitude, 2));
			
				var mercury_delta_g = point- mercury.transform.position;
				var mercury_effective_g = (g_mercury*gravConstant/Mathf.Pow(mercury_delta_g.magnitude*mercury_delta_g.magnitude, 2));
				
				var venus_delta_g = point- venus.transform.position;
				var venus_effective_g = (g_venus*gravConstant/Mathf.Pow(venus_delta_g.magnitude*venus_delta_g.magnitude,2));
				
				var earth_delta_g = point- earth.transform.position;
				var earth_effective_g = (g_earth*gravConstant/Mathf.Pow(earth_delta_g.magnitude*earth_delta_g.magnitude,2));
				
				var mars_delta_g = point- mars.transform.position;
				var mars_effective_g = (g_mars*gravConstant/Mathf.Pow(mars_delta_g.magnitude*mars_delta_g.magnitude,2));
				
				var jupiter_delta_g = point- jupiter.transform.position;
				var jupiter_effective_g = (g_jupiter*gravConstant/Mathf.Pow(jupiter_delta_g.magnitude*jupiter_delta_g.magnitude,2));
				
				var saturn_delta_g = point- saturn.transform.position;
				var saturn_effective_g = (g_saturn*gravConstant/Mathf.Pow(saturn_delta_g.magnitude*saturn_delta_g.magnitude,2));
				
				var neptune_delta_g = point- neptune.transform.position;
				var neptune_effective_g = (g_neptune*gravConstant/Mathf.Pow(neptune_delta_g.magnitude*neptune_delta_g.magnitude,2));
				
				var uranus_delta_g = point- uranus.transform.position;
				var uranus_effective_g = (g_uranus*gravConstant/Mathf.Pow(uranus_delta_g.magnitude*uranus_delta_g.magnitude,2));

				var direction : Vector3 = transform.TransformDirection (sun_delta_g) * sun_effective_g*gravFactor + transform.TransformDirection (mercury_delta_g) * mercury_effective_g*gravFactor + transform.TransformDirection (venus_delta_g) * venus_effective_g*gravFactor + transform.TransformDirection (earth_delta_g) * earth_effective_g*gravFactor + transform.TransformDirection (mars_delta_g) * mars_effective_g*gravFactor + transform.TransformDirection (jupiter_delta_g) * jupiter_effective_g*gravFactor + transform.TransformDirection (saturn_delta_g) * saturn_effective_g*gravFactor + transform.TransformDirection (uranus_delta_g) * uranus_effective_g*gravFactor + transform.TransformDirection (neptune_delta_g) * neptune_effective_g*gravFactor;
			
				return(direction);

}







