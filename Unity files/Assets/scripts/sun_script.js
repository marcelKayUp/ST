#pragma strict
public var sunBody:GameObject;
var x_rot:float;
var y_rot:float;
var z_rot:float;
var w_rot:float;
var range=0.1;
function Start () {
x_rot = Random.Range(-range,range);
y_rot = Random.Range(-range,range);
z_rot = Random.Range(-range,range);
w_rot = Random.Range(-range,range);
}

function FixedUpdate () {
/*
sunBody.transform.rotation.x+=x_rot;
sunBody.transform.rotation.y+=y_rot;
sunBody.transform.rotation.z+=z_rot;
sunBody.transform.rotation.w+=w_rot;
*/
sunBody.transform.rotation.eulerAngles+=Vector3(x_rot, y_rot, z_rot);
}