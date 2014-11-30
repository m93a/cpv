function Stream(ps,shape,impulse,freq,lifetime,active){
 if(!(this instanceof Stream)){
  return new Stream(ps,shape,impulse,freq,lifetime,active);
 }
 
 var self = this;
 
 freq     *= 1000;
 lifetime *= 1000;
 
 this.particleSystem = ps;
 this.active = active;
 this.lifetime = lifetime;
 
 this.particleGroupDef = new b2ParticleGroupDef();
 this.particleGroupDef.shape = shape;
 this.particleGroupDef.color.Set(10, 20, 255, 255);
 
 this.shape = this.particleGroupDef.shape;
 
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
  },this.lifetime);
 };
 
 setInterval(function(){
  self.active && self.generate(impulse);
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
