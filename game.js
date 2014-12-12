
var Vector = function(x,y){
 return new b2Vec2(x,y);
};


var kayak = {};
var diag = {};

function fl2str(fl){
 var str = (Math.round(fl*100)/100).toString(10);
 (str.indexOf('.')+1)||(str+='.');
 while(str.substr(-3,1)!='.'){ str+='0'; }
 return str;
}

var key = {};
document.addEventListener('keydown',function(e){
 key[e.key] = true;
 key[e.keyCode] = true;
});
document.addEventListener('keyup',function(e){
 key[e.key] = false;
 key[e.keyCode] = false;
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
  
  window.level = this.level = Level();
  for( p in level.polygons ){
   var polyg = level.polygons[p];
   var bed = new b2ChainShape();
   var i = -1;
   var vertices = [];
   while(++i<polyg.length){
    bed.vertices.push( Vector( polyg[i][0], polyg[i][1] ) );
   }
   bed.friction = level.friction;
   ground.CreateFixtureFromShape(bed, 5);
  }
  
  level.stream[0].active == true;
  level.stream[1].active == true;
  setTimeout(level.load, level.loadtime || 5000);
  
  
  diag = document.createElement('div');
  diag.style.position = 'fixed';
  diag.style.left = diag.style.top = 0;
  diag.style.fontFamily = 'monospace';
  document.body.appendChild(diag);
  
  
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
   
   kayak.boost = 100;
   kayak.speed = 1;
   
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
  var speed = kayak.speed;
  
  
  if(kayak.boost<100){
   kayak.boost += 1;
  }
  if((key.b || key[66]) && kayak.boost>0){
   kayak.boost -= 2;
   speed = (kayak.speed * kayak.boost/50)+1;
  }
  
  if(key.ArrowLeft || key[37]){
   if(rot<10){
    if(rot>0){
     kayak.ApplyTorque(.02/(rot+1));
    }else{
     kayak.ApplyTorque(.02);
    }
   }
  }
  if(key.ArrowRight || key[39]){
   if(rot>-10){
    if(rot<0){
     kayak.ApplyTorque(.02/(rot-1));
    }else{
     kayak.ApplyTorque(-.02);
    }
   }
  }
  if(key.Up || key[38]){
   kayak.ApplyForceToCenter(new b2Vec2(speed/10,0))
  }
  if(key.Down || key[40]){
   kayak.ApplyForceToCenter(new b2Vec2(-speed/10,0))
  }
  
  if(key.r || key[82]){
   level.reload();
  }
  
  //<cheat>
  if(key.x || key[88]){
   kayak.ApplyForceToCenter(new b2Vec2(0,.4))
  }
  //</cheat>
  
  
  //Level
  if(level.ready){
   var s;
   for(i in this.level.stream){
    s = this.level.stream[i];
    s.active = s.shape.position
                .distanceTo(kayak.GetPosition())<2*s.lifetime;
   }
  }
  
  diag.textContent = 'boost: '+fl2str(kayak.boost)+'; '
                    +'speed: '+fl2str(speed);
};

