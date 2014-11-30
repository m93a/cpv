function Level(){
 
 var level = {};
 
 var psd = new b2ParticleSystemDef();
 psd.radius = 0.05;
 psd.dampingStrength = 2;
 var w = world.CreateParticleSystem(psd);
 level.water = w;
 
 level.friction = 10;
 level.loadtime = 10000;
 
 level.polygons = [
  [
   [ 0.0,+3.0],
   [ 5.0,-1.0],
   [ 7.0,-1.0],
   [ 8.0,+0.0],
   [ 8.0,+0.5],
   [ 9.0,+0.5],
   [ 9.0,+0.2],
   [12.0,+0.2],
   [14.0,+0.1],
   [16.0,-0.1],
   [17.0,-0.5],
   [20.0,-2.5],
   [21.0,-2.8],
   [22.5,-3.0],
   [23.0,-3.0],
   [23.2,-3.1],
   [24.0,-3.5],
   [28.0,-3.2],
   [30.0,-3.2],
   [30.5,-3.0],
   [38.0,-3.0],
   [39.0,-3.5],
   [40.0,-4.5],
   [41.0,-4.7],
   [42.0,-4.5],
   [43.0,-4.0],
   [43.5,-3.5],
   [44.0,-3.4]
  ],
  [
   [40.0,-3.0],
   [42.5,-3.0],
   [42.5,-2.7],
   [40.0,-2.7],
   [40.0,-3.0]
  ]
 ];
 
 level.stream = [
  Stream( w, Circle(+ 2.0, +3.0, .5 ), Vector( .1,  0), 0.50, 50, 1),
  Stream( w, Circle(+ 1.0, +3.0, .5 ), Vector(  0,  0), 0.50, 50, 1),
  Stream( w, Circle(+23.8, -3.0, .2 ), Vector( .2,  0), 0.25,100, 1)
 ];
 
 level.ready = false;
 
 level.load = function(){
  level.ready = true;
  kayak.SetTransform(new b2Vec2(10,2),0);
  kayak.SetLinearVelocity(new b2Vec2(0,0));
  kayak.SetAngularVelocity(0);
  
  SlackWater( w, Rect( 41, -2, 1, 0.5 ) )
 };
 
 level.reload = function(){
  level.ready = false;
  level.load();
 };
 
 return level;
 
};
