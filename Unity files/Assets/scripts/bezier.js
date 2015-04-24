#pragma strict

//value for t parameter of quadratic curve equation

var c : float;

 

//vectors to store start and end of each curve segment

var q0 : Vector3;

var q1 : Vector3;

 

var start : Transform;

var end : Transform;

var handle1 : Transform;

var handle2 : Transform;

//float to define movement speed

var startTime : float;




function Start () {
startTime=Time.time;
 c = 0.0; //for first curve c is set to 0
q0 = CalculateBezierPoint(c, start.position, handle1.position, handle2.position, end.position);

}

function Update () {

if (c <= 100) {
	c += 0.01; //100 steps to draw each bezier curve
	q1 = CalculateBezierPoint(c, start.position, handle1.position, handle2.position, end.position);
	Debug.DrawLine (q0, q1, Color.red, 1000);
	//moves actor with given speed
	q0 = q1;
	}
}




function CalculateBezierPoint(t:float, p0:Vector3, p1:Vector3, p2:Vector3, p3:Vector3):Vector3{
	var u : float;
	var uu : float;
	var uuu : float;
	var tt : float;
	var ttt : float;
	var p:Vector3;

	u = 1 - t;
	uu = u * u;
	uuu = uu * u;
	tt = t * t;
	ttt = tt * t;
	p = uuu * p0; //first term of the equation
	p += 3 * uu * t * p1; //second term of the equation
	p += 3 * u * tt * p2; //third term of the equation
	p += ttt * p3; //fourth term of the equation
	return p;
}