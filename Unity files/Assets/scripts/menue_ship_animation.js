#pragma strict
public var rotationSpeed_x:float;
public var rotationSpeed_y:float;
public var rotationSpeed_z:float;
function Start () {

}

function FixedUpdate () {



transform.Rotate(rotationSpeed_x,rotationSpeed_y,rotationSpeed_z);
//transform.Rotate(Vector3.right * Time.deltaTime*(-1));
//transform.Rotate(Vector3.up * Time.deltaTime*(-5));
//transform.Rotate(Vector3.forward *Time.deltaTime*2);

}