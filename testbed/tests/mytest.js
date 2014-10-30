
var Vector = function(x,y){
 return new b2Vec2(x,y);
};


var kayak;

var key = {};
document.addEventListener('keydown',function(e){
 key[e.key] = true;
});
document.addEventListener('keyup',function(e){
 key[e.key] = false;
});

window.Game = function() {
  camera.position.y = 1;
  camera.position.z = 2.5;

  var bd = new b2BodyDef();
  var ground = world.CreateBody(bd);

  bd.type = b2_dynamicBody;
  bd.allowSleep = false;
  bd.position.Set(0, 1);
  var body = world.CreateBody(bd);

  var b1 = new b2PolygonShape();
  b1.SetAsBoxXYCenterAngle(0.05, 1, Vector(2, 0), 0);
  body.CreateFixtureFromShape(b1, 5);

  var b2 = new b2PolygonShape();
  b2.SetAsBoxXYCenterAngle(0.05, 1, Vector(-2, 0), 0);
  body.CreateFixtureFromShape(b2, 5);

  var b3 = new b2PolygonShape();
  b3.SetAsBoxXYCenterAngle(2, 0.05, Vector(0, 1), 0);
  body.CreateFixtureFromShape(b3, 5);

  var b4 = new b2PolygonShape();
  b4.SetAsBoxXYCenterAngle(2, 0.05, Vector(0, -1), 0);
  body.CreateFixtureFromShape(b4, 5);

  var jd = new b2RevoluteJointDef();
  jd.motorSpeed = 0.05 * Math.PI;
  jd.maxMotorTorque = 1e2;
  jd.enableMotor = true;
  this.joint = jd.InitializeAndCreate(ground, body, Vector(0, 1));
  this.time = 0;

  // setup particles
  var psd = new b2ParticleSystemDef();
  psd.radius = 0.02;
  psd.dampingStrength = 2;

  var particleSystem = world.CreateParticleSystem(psd);
  var box = new b2PolygonShape();
  box.SetAsBoxXYCenterAngle(0.9, 0.9, Vector(0, 1.0), 0);

  var particleGroupDef = new b2ParticleGroupDef();
  particleGroupDef.shape = box;
  particleGroupDef.color.Set(10, 20, 255, 255);
  window.pgd = particleGroupDef;
  var particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);
  
  
  function createKayak(){
   
   var bd = new b2BodyDef;
   bd.type = b2_dynamicBody;
   var kayak = world.CreateBody(bd);
   shape = new b2PolygonShape;
   shape.vertices.push( Vector(.10, .00) );
   shape.vertices.push( Vector(.50, .00) );
   shape.vertices.push( Vector(.57, .05) );
   shape.vertices.push( Vector(.60, .10) );
   shape.vertices.push( Vector(.00, .10) );
   shape.vertices.push( Vector(.03, .05) );
   kayak.CreateFixtureFromShape(shape, 0.1);
   particleSystem.DestroyParticlesInShape(shape,
       kayak.GetTransform());
   
   
   
   shape = new b2CircleShape;
   shape.position.Set(.3, .17);
   shape.radius = 0.07;
   kayak.CreateFixtureFromShape(shape, 0.2);
   var amount = particleSystem.DestroyParticlesInShape(shape,
       kayak.GetTransform());
   
   kayak.boat = kayak.fixtures[0];
   kayak.head = kayak.fixtures[1];
   
   kayak.SetTransform(Vector(-1,0.4),0);
   
   return kayak;
  }
  
  kayak = createKayak();
  
  bd = new b2BodyDef;
  bd.type = b2_dynamicBody;
  body = world.CreateBody(bd);
  shape = new b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(0.1, 0.1, new b2Vec2(1, 0.5), 0.5);
  body.CreateFixtureFromShape(shape, 1);
  particleSystem.DestroyParticlesInShape(shape,
      body.GetTransform());
  
  
  world.SetContactListener(this);
};


window.Game.prototype.BeginContactBody = function(contact) {
  var a = contact.GetFixtureA();
  var b = contact.GetFixtureB();
  var deltaVel = a.body.GetLinearVelocity().sub(
   b.body.GetLinearVelocity()
  );
  
  if( a==kayak.head||b==kayak.head ){
   if( deltaVel.length() > 1.5 ){
    console.log('ouch');
   }
  }
};


window.Game.prototype.Step = function() {
  
  //Step
  world.Step(timeStep, velocityIterations, positionIterations);
  this.time += 1 / 60;
  this.joint.SetMotorSpeed(.5*Math.cos(this.time));

  
  //Camera
  var pos = kayak.GetWorldCenter();
  var vel = kayak.GetLinearVelocity().length();
  
  camera.position.x = pos.x +.2;
  camera.position.y = pos.y;
  
  camera.position.z *= 10;
  camera.position.z += 2+vel/2;
  camera.position.z /= 11;
  
  
  //Controlls
  if(key.Left){
   kayak.ApplyTorque(.01);
  }
  if(key.Right){
   kayak.ApplyTorque(-.01);
  }
  if(key.Up){
   kayak.ApplyForceToCenter(new b2Vec2(.05,0))
  }
  if(key.Down){
   kayak.ApplyForceToCenter(new b2Vec2(-.05,0))
  }
};

