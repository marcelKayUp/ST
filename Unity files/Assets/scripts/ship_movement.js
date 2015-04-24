#pragma strict
public var startPoint:Transform;
public var middlePoint:Transform;
public var endPoint:Transform;
public var lineMaterial:Material;
public var thickness:float;
public var lineColor:Color;
private var line:LineRenderer;
var reachedAim:boolean;

function Start () {
	line = this.gameObject.AddComponent(LineRenderer);
	line.material=new Material(Shader.Find("Mobile/Particles/Additive"));
	
	line.SetWidth(thickness,thickness);
	line.SetVertexCount(3);
	line.GetComponent.<Renderer>().enabled = true;
	
	reachedAim=false;
	
}

function FixedUpdate () {

	
	line.SetColors(lineColor,lineColor);
	//zu testzwecken
	if(reachedAim!=true){
		MoveShip(middlePoint);
		if((transform.position-middlePoint.position).sqrMagnitude<=1){
			transform.parent = middlePoint.transform;
			transform.localPosition = Vector3(1,0,0);
			reachedAim=true;
		}
	}
	line.SetPosition(0,startPoint.position);
	line.SetPosition(1,middlePoint.position);
	line.SetPosition(2,endPoint.position);
	print(transform.parent.ToString);
}




function MoveShip(nextPoint:Transform){

	
	//rotation zum Ziel
	var targetDirection= nextPoint.position - transform.position;
	var newDirection= Vector3.RotateTowards(transform.forward, targetDirection, 5, 0.0);
	transform.rotation = Quaternion.LookRotation(newDirection);
	
	//bewegung zum Ziel
	transform.Translate(Vector3.forward * Time.deltaTime*2);

	




}