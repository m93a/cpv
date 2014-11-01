function Level(){
 
 var level = {};
 
 var psd = new b2ParticleSystemDef();
 psd.radius = 0.04;
 psd.dampingStrength = 2;
 var w = world.CreateParticleSystem(psd);
 
 level.polygon = [
  [- 1.0,+0.0],
  [+ 0.0,-2.0],
  [+ 1.0,-3.0],
  [+ 2.0,-3.5],
  [+ 3.0,-3.7],
  [+ 4.0,-3.8],
  [+ 5.0,-3.8],
  [+ 6.0,-3.6],
  [+ 7.0,-3.5],
  [+ 8.0,-3.4],
  [+ 9.0,-3.2],
  [+ 9.2,-3.5],
  [+10.0,-4.8],
  [+11.0,-5.5],
  [+12.0,-5.2],
  [+20.0,-3.5]
 ];
 level.water = w;
 level.stream = [
  Stream( w, Circle(-.5,1,.3 ), Vector(0,-1), 0.15, 10),
  Stream( w, Circle(5,-3.5,.3), Vector(1,0 ), 0.15, 10)
 ];
 level.load = function(){
  kayak.SetTransform(new b2Vec2(6,0),0);
  kayak.SetLinearVelocity(new b2Vec2(0,0));
  kayak.SetAngularVelocity(0);
 };
 
 return level;
 
};
