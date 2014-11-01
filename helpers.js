function Stream(ps,shape,impulse,freq,lifetime){
 if(!(this instanceof Stream)){
  return new Stream(ps,shape,impulse,freq,lifetime);
 }
 
 var self = this;
 
 freq     *= 1000;
 lifetime *= 1000;
 
 this.particleSystem = ps;
 
 this.particleGroupDef = new b2ParticleGroupDef();
 this.particleGroupDef.shape = shape;
 this.particleGroupDef.color.Set(10, 20, 255, 255);
 
 this.generate = function(v){
  this.particleSystem.DestroyParticlesInShape(
   shape,
   new b2Transform()
  );
  var particleGroup =
        this
        .particleSystem
        .CreateParticleGroup(
         this.particleGroupDef
        );
  window.pg = particleGroup;
  particleGroup.ApplyLinearImpulse(v);
  
  setTimeout(function(){
   particleGroup.DestroyParticles();
  },lifetime);
 };
 
 setInterval(function(){
  self.generate(impulse);
 },freq);
};

function Circle(x,y,r){
 var shape = new b2CircleShape();
 shape.position.Set(x, y);
 shape.radius = r;
 return shape;
};

function Vector(x,y){
 return new b2Vec2(x,y);
};
