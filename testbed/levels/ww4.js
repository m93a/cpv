function Level(){
 
 var level = {};
 
 var psd = new b2ParticleSystemDef();
 psd.radius = 0.05;
 psd.dampingStrength = 0.5;
 var w = world.CreateParticleSystem(psd);
 level.water = w;
 
 level.friction = 0;
 
 level.polygon = [
  [
   [- 1.0,+0.0],
   [+ 0.0,-2.0],
   [+ 1.0,-3.0],
   [+ 2.0,-3.5],
   [+ 3.0,-3.7],
   [+ 4.0,-3.8],
   [+ 5.0,-3.8],
   [+ 6.0,-3.6],
   [+ 7.0,-3.5],
   [+ 8.0,-3.2],
   [+ 9.0,-2.5],
   [+ 9.2,-3.5],
   [+10.0,-4.8],
   [+11.0,-5.5],
   [+12.0,-5.2],
   [+15.0,-4.5],
   [+18.0,-4.8],
   [+19.0,-5.0],
   [+20.0,-6.0],
   [+21.0,-7.5],
   [+21.5,-7.8],
   [+22.0,-7.9],
   [+23.5,-8.0],
   [+25.0,-7.5],
   [+27.0,-6.8],
   [+28.0,-7.0]
  ]
 ];
 level.stream = [
  Stream( w, Circle(- 0.5, +1.0, .3 ), Vector( .1,  0), 1.50, 10, 1),
  Stream( w, Circle(+13.0, -4.8, .2 ), Vector( .4, .1), 0.15, 20),
  Stream( w, Circle(+21.8, -7.7, .1 ), Vector(  2,  0), 0.10, 10),
 ];
 level.ready = false;
 level.load = function(){
  level.ready = true;
  kayak.SetTransform(new b2Vec2(6,0),0);
  kayak.SetLinearVelocity(new b2Vec2(0,0));
  kayak.SetAngularVelocity(0);
 };
 level.reload = function(){
  level.ready = false;
  level.load();
 };
 
 return level;
 
};
