
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
  
  var level = Level();
  var polyg = level.polygon;
  var bed;
  var i = -1;
  while(++i<polyg.length-1){
   bed = new b2PolygonShape();
   bed.vertices.push( Vector( polyg[i  ][0], -10.0         ) );
   bed.vertices.push( Vector( polyg[i  ][0], polyg[i  ][1] ) );
   bed.vertices.push( Vector( polyg[i+1][0], polyg[i+1][1] ) );
   bed.vertices.push( Vector( polyg[i+1][0], -10           ) );
   ground.CreateFixtureFromShape(bed, 5);
  }
  
  setTimeout(level.load,10000);
  
  
  function createKayak(x,y){
   
   var bd = new b2BodyDef;
   bd.type = b2_dynamicBody;
   var kayak = world.CreateBody(bd);
   shape = new b2PolygonShape;
   shape.vertices.push( Vector(.50, .00) );
   shape.vertices.push( Vector(.57, .05) );
   shape.vertices.push( Vector(.60, .10) );
   shape.vertices.push( Vector(.00, .10) );
   shape.vertices.push( Vector(.03, .05) );
   shape.vertices.push( Vector(.10, .00) );
   kayak.CreateFixtureFromShape(shape, 0.4);
   
   
   
   shape = new b2CircleShape;
   shape.position.Set(.3, .17);
   shape.radius = 0.07;
   kayak.CreateFixtureFromShape(shape, 0.5);
   
   kayak.boat = kayak.fixtures[0];
   kayak.head = kayak.fixtures[1];
   
   kayak.SetTransform(Vector(x,y),0);
   
   return kayak;
  }
  
  kayak = createKayak(-100,-100);
  
  bd = new b2BodyDef;
  bd.type = b2_dynamicBody;
  body = world.CreateBody(bd);
  shape = new b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(0.1, 0.1, new b2Vec2(1, 0.5), 0.5);
  body.CreateFixtureFromShape(shape, 1);
  
  
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
  this.time += timeStep;

  
  //Camera
  var pos = kayak.GetWorldCenter();
  var vel = kayak.GetLinearVelocity().length();
  var rot = kayak.GetAngularVelocity();
  
  camera.position.x = pos.x +.2;
  camera.position.y = pos.y;
  
  camera.position.z *= 10;
  camera.position.z += 2+vel/2;
  camera.position.z /= 11;
  
  
  //Controls
  if(key.Left){
   if(rot<10){
    if(rot>0){
     kayak.ApplyTorque(.02/(rot+1));
    }else{
     kayak.ApplyTorque(.02);
    }
   }
  }
  if(key.Right){
   if(rot>-10){
    if(rot<0){
     kayak.ApplyTorque(.02/(rot-1));
    }else{
     kayak.ApplyTorque(-.02);
    }
   }
  }
  if(key.Up){
   kayak.ApplyForceToCenter(new b2Vec2(.1,0))
  }
  if(key.Down){
   kayak.ApplyForceToCenter(new b2Vec2(-.1,0))
  }
};

