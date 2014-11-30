function Level(){
 
 var level = {};
 
 var psd = new b2ParticleSystemDef();
 psd.radius = 0.05;
 psd.dampingStrength = 0.5;
 var w = world.CreateParticleSystem(psd);
 level.water = w;
 
 level.polygon = [
  [- 5.0,+5.0],
  [- 4.8,+1.0],
  [- 4.0,+0.9],
  [+ 0.0,+0.5],
  [+ 1.0,+0.4]
 ];
 level.stream = [
  Stream( w, Circle(- 4.0,) ) //TODO
 ];
 
};
