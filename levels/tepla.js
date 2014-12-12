function Level(){
 
 var level = {};
 
 var psd = new b2ParticleSystemDef();
 psd.radius = 0.05;
 psd.dampingStrength = 1;
 var w = world.CreateParticleSystem(psd);
 level.water = w;
 
 level.friction = 10;
 level.loadtime = 5000;
 
 level.polygons = [
  [
   [+ 0.0,+3.0],
   [+ 5.0,-1.0],
   [+ 7.0,-1.0],
   [+ 8.0,+0.0],
   [+ 8.0,+0.5],
   [+ 9.0,+0.5],
   [+ 9.0,+0.2],
   [+12.0,+0.2]
  ]
 ];
 level.stream = [
  Stream( w, Circle(+ 2.0, +3.0, .5 ), Vector( .1,  0), 0.50, 50, 1),
  Stream( w, Circle(+13.0, -4.8, .2 ), Vector( .4, .1), 0.15, 20),
  Stream( w, Circle(+21.8, -7.7, .1 ), Vector(  2,  0), 0.10, 10),
 ];
 level.ready = false;
 level.load = function(){
  level.ready = true;
  kayak.SetTransform(new b2Vec2(10,2),0);
  kayak.SetLinearVelocity(new b2Vec2(0,0));
  kayak.SetAngularVelocity(0);
 };
 level.reload = function(){
  level.ready = false;
  level.load();
 };
 
 return level;
 
};
