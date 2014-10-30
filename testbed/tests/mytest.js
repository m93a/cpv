function Game() {
  camera.position.y = 1;
  camera.position.z = 2.5;

  var bd = new b2BodyDef();
  var ground = world.CreateBody(bd);

  bd.type = b2_dynamicBody;
  bd.allowSleep = false;
  bd.position.Set(0, 1);
  var body = world.CreateBody(bd);

  var b1 = new b2PolygonShape();
  b1.SetAsBoxXYCenterAngle(0.05, 1, new b2Vec2(2, 0), 0);
  body.CreateFixtureFromShape(b1, 5);

  var b2 = new b2PolygonShape();
  b2.SetAsBoxXYCenterAngle(0.05, 1, new b2Vec2(-2, 0), 0);
  body.CreateFixtureFromShape(b2, 5);

  var b3 = new b2PolygonShape();
  b3.SetAsBoxXYCenterAngle(2, 0.05, new b2Vec2(0, 1), 0);
  body.CreateFixtureFromShape(b3, 5);

  var b4 = new b2PolygonShape();
  b4.SetAsBoxXYCenterAngle(2, 0.05, new b2Vec2(0, -1), 0);
  body.CreateFixtureFromShape(b4, 5);

  var jd = new b2RevoluteJointDef();
  jd.motorSpeed = 0.05 * Math.PI;
  jd.maxMotorTorque = 1e2;
  jd.enableMotor = true;
  this.joint = jd.InitializeAndCreate(ground, body, new b2Vec2(0, 1));
  this.time = 0;

  // setup particles
  var psd = new b2ParticleSystemDef();
  psd.radius = 0.02;
  psd.dampingStrength = 2;

  var particleSystem = world.CreateParticleSystem(psd);
  var box = new b2PolygonShape();
  box.SetAsBoxXYCenterAngle(0.9, 0.9, new b2Vec2(0, 1.0), 0);

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
   shape.SetAsBoxXYCenterAngle(0.1, 0.1, new b2Vec2(-1, 0.5), 0);
   shape.vertices[0].x =-.1 -1.1;
   shape.vertices[0].y = .0 +0.4;
   shape.vertices[1].x = .3 -1.1;
   shape.vertices[1].y = .0 +0.4;
   shape.vertices[2].x = .4 -1.1;
   shape.vertices[2].y = .1 +0.4;
   shape.vertices[3].x =-.2 -1.1;
   shape.vertices[3].y = .1 +0.4;
   kayak.CreateFixtureFromShape(shape, 0.1);
   particleSystem.DestroyParticlesInShape(shape,
       kayak.GetTransform());
   
   
   
   shape = new b2CircleShape;
   shape.position.Set(-1, 0.55);
   shape.radius = 0.07;
   kayak.CreateFixtureFromShape(shape, 0.1);
   var amount = particleSystem.DestroyParticlesInShape(shape,
       kayak.GetTransform());
   
   
   return kayak;
  }
  
  window.kayak = createKayak();
  
  bd = new b2BodyDef;
  bd.type = b2_dynamicBody;
  body = world.CreateBody(bd);
  shape = new b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(0.1, 0.1, new b2Vec2(1, 0.5), 0.5);
  body.CreateFixtureFromShape(shape, 0.1);
  particleSystem.DestroyParticlesInShape(shape,
      body.GetTransform());
  
  
  
  (function(){
   
   var key = {};
   document.addEventListener('keydown',function(e){
    key[e.key] = true;
   });
   document.addEventListener('keyup',function(e){
    key[e.key] = false;
   });
   
   setInterval(function(){
    if(key.Up){
     kayak.ApplyTorque(.01);
    }
    if(key.Down){
     kayak.ApplyTorque(-.01);
    }
    if(key.Left){
     kayak.ApplyForceToCenter(new b2Vec2(-.05,0))
    }
    if(key.Right){
     kayak.ApplyForceToCenter(new b2Vec2(.05,0))
    }
   },20);
   
   
  })();
};


Game.prototype.BeginContactBody = function(contact) {
  if (contact.GetFixtureA().GetUserData() !== null ||
    contact.GetFixtureB().GetUserData() !== null) {
    var worldManifold = contact.GetWorldManifold();
    this.contactPoint = worldManifold.GetPoint(0);
    this.contact = true;
  }
};


Game.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);
  this.time += 1 / 60;
  this.joint.SetMotorSpeed(.5*Math.cos(this.time));
};

