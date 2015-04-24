#pragma strict
public var zoomFactor=10.0f;
public var scrollFactor=0.1f;

public var mainCam: Camera;
public var planetMercury:GameObject;
public var mercuryCam:Camera;
public var planetVenus:GameObject;
public var venusCam:Camera;
public var planetEarth:GameObject;
public var earthCam:Camera;
public var planetMars:GameObject;
public var marsCam:Camera;
public var planetJupiter:GameObject;
public var jupiterCam:Camera;
public var planetSaturn:GameObject;
public var saturnCam:Camera;
public var planetNeptune:GameObject;
public var neptuneCam:Camera;
public var planetUranus:GameObject;
public var uranusCam:Camera;
var focusSwitch:String;
var isFocused=false;
var wasFocused=false;

//delete this later!
var mouseCurrent:float;
var mousePast:float;
var mouseDelta:float;

function Awake () {

}

function FixedUpdate () {
var z_pos=transform.position.z/10;
if(GameObject.Find("mercury_cam")){
	GameObject.Find("mercury_cam").GetComponent.<Camera>().enabled = false;
	mercuryCam = GameObject.Find("mercury_cam").GetComponent.<Camera>();
	venusCam = GameObject.Find("venus_cam").GetComponent.<Camera>();
	earthCam = GameObject.Find("earth_cam").GetComponent.<Camera>();
	marsCam = GameObject.Find("mars_cam").GetComponent.<Camera>();
	jupiterCam = GameObject.Find("jupiter_cam").GetComponent.<Camera>();
	saturnCam = GameObject.Find("saturn_cam").GetComponent.<Camera>();
	neptuneCam = GameObject.Find("neptune_cam").GetComponent.<Camera>();
	uranusCam = GameObject.Find("uranus_cam").GetComponent.<Camera>();





switch(focusSwitch){
	case "mercury":
		venusCam.enabled = false;
		earthCam.enabled = false;
		marsCam.enabled = false;
		jupiterCam.enabled = false;
		saturnCam.enabled = false;
		neptuneCam.enabled = false;
		uranusCam.enabled = false;
		mainCam.enabled = false;		
		mercuryCam.enabled = true;

		isFocused=true;
		wasFocused=true;
		break;
	case "venus":
		earthCam.enabled = false;
		mercuryCam.enabled = false;
		marsCam.enabled = false;
		jupiterCam.enabled = false;
		saturnCam.enabled = false;
		neptuneCam.enabled = false;
		uranusCam.enabled = false;
		mainCam.enabled = false;		
		venusCam.enabled = true;
		isFocused=true;
		wasFocused=true;
		break;
	case "earth":
		mercuryCam.enabled = false;
		marsCam.enabled = false;
		jupiterCam.enabled = false;
		saturnCam.enabled = false;
		neptuneCam.enabled = false;
		uranusCam.enabled = false;
		mainCam.enabled = false;		
		venusCam.enabled = false;
		earthCam.enabled = true;
		isFocused=true;
		wasFocused=true;
		break;
	case "mars":
		mercuryCam.enabled = false;
		jupiterCam.enabled = false;
		saturnCam.enabled = false;
		neptuneCam.enabled = false;
		uranusCam.enabled = false;
		mainCam.enabled = false;		
		venusCam.enabled = false;
		earthCam.enabled = false;
		marsCam.enabled = true;
		isFocused=true;
		wasFocused=true;
		break;
	case "jupiter":
		mercuryCam.enabled = false;
		saturnCam.enabled = false;
		neptuneCam.enabled = false;
		uranusCam.enabled = false;
		mainCam.enabled = false;		
		venusCam.enabled = false;
		earthCam.enabled = false;
		marsCam.enabled = false;
		jupiterCam.enabled = true;
		isFocused=true;
		wasFocused=true;
		break;
	case "saturn":
		mercuryCam.enabled = false;
		neptuneCam.enabled = false;
		uranusCam.enabled = false;
		mainCam.enabled = false;		
		venusCam.enabled = false;
		earthCam.enabled = false;
		marsCam.enabled = false;
		jupiterCam.enabled = false;
		saturnCam.enabled = true;
		isFocused=true;
		wasFocused=true;
		break;
	case "neptune":
		mercuryCam.enabled = false;
		uranusCam.enabled = false;
		mainCam.enabled = false;		
		venusCam.enabled = false;
		earthCam.enabled = false;
		marsCam.enabled = false;
		jupiterCam.enabled = false;
		saturnCam.enabled = false;
		neptuneCam.enabled = true;
		isFocused=true;
		wasFocused=true;
		break;
	case "uranus":
		mercuryCam.enabled = false;
		mainCam.enabled = false;		
		venusCam.enabled = false;
		earthCam.enabled = false;
		marsCam.enabled = false;
		jupiterCam.enabled = false;
		saturnCam.enabled = false;
		neptuneCam.enabled = false;
		uranusCam.enabled = true;
		isFocused=true;
		wasFocused=true;
		break;
	case "free":
		mercuryCam.enabled = false;	
		venusCam.enabled = false;
		earthCam.enabled = false;
		marsCam.enabled = false;
		jupiterCam.enabled = false;
		saturnCam.enabled = false;
		neptuneCam.enabled = false;
		uranusCam.enabled = false;
		mainCam.enabled = true;	
		isFocused=false;
		break;
	default:
		mercuryCam.enabled = false;	
		venusCam.enabled = false;
		earthCam.enabled = false;
		marsCam.enabled = false;
		jupiterCam.enabled = false;
		saturnCam.enabled = false;
		neptuneCam.enabled = false;
		uranusCam.enabled = false;
		mainCam.enabled = true;
		isFocused=false;
		break;
}
var planetCam = focusSwitch + "_cam";
/*
 // Für testzwecke
if(isFocused==true){
if(Input.GetMouseButton(0)){
 mouseCurrent=Input.mousePosition.x;
 mouseDelta = mouseCurrent - mousePast;
 mousePast=	Input.mousePosition.x;
GameObject.Find(planetCam).transform.localPosition.x+=mouseDelta*zoomFactor*0.01;

}
}
*/


if(Input.touchCount>0){
	var touch0=Input.GetTouch(0);
	var touchDeltaPosition = touch0.deltaPosition;
	if(isFocused == false){	
		//scrollen
		if(Input.touchCount==1 && touch0.phase==TouchPhase.Moved){
			transform.Translate(-touchDeltaPosition.x * scrollFactor*mainCam.orthographicSize/10, touchDeltaPosition.y * scrollFactor*mainCam.orthographicSize/10,0);
				
			//max und min x koordinaten
			if(transform.position.x>=1000){
				transform.position.x=999;
			}
			if(transform.position.x<=-1000){
				transform.position.x=-999;
			}
		
			//max und min y koordinaten
			if(transform.position.y>=1000){
				transform.position.y=999;
			}
			if(transform.position.y<=-1000){
				transform.position.y=-999;
			}
		}
	}
	//Planeten drehen
	else{
		if(Input.touchCount==1 && touch0.phase==TouchPhase.Moved){
			GameObject.Find(planetCam).transform.parent.transform.rotation.eulerAngles.z-=touchDeltaPosition.x*scrollFactor*2;
		}
	}
	
	
	//zoomen
	if(Input.touchCount==2)
		{
		var touch1=Input.GetTouch(1);
	
		var touch0PrevPos = touch0.position - touch0.deltaPosition;
		var touch1PrevPos = touch1.position - touch1.deltaPosition;
		
		var prevTouchDeltaMag = (touch0PrevPos - touch1PrevPos).magnitude;
		var touchDeltaMag = (touch0.position - touch1.position).magnitude;
	
		var deltaMagDiff = prevTouchDeltaMag - touchDeltaMag;
		
		if(isFocused==false){
			mainCam.orthographicSize+=deltaMagDiff*zoomFactor*(mainCam.orthographicSize/10);
			if (mainCam.orthographicSize >= 500){
				mainCam.orthographicSize=500;
				}
			if (mainCam.orthographicSize <=1){
				mainCam.orthographicSize=1;
				}
		}
		else{
			GameObject.Find(planetCam).transform.localPosition.x+=deltaMagDiff*zoomFactor;
			
		}	
			
	}
	
}
	if(isFocused==false){
		if(wasFocused==true){
		/*
			transform.position=Vector3(0,0,20);
			transform.rotation.eulerAngles=Vector3(0,0,0);
			wasFocused=false;
			*/
		}
	}
	else{
		
	}
	focusSwitch=mainCam.GetComponent(game_menue_handler).planetFocus;
}
}