function RandomFloat(min, max) {
  return min + (max - min) * Math.random();
}

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
 
 this.generate = function(v){ //return; //FIXME, just for testing purposes
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
  particleGroup.ApplyLinearImpulse(v);
  
  setTimeout(function(){
   particleGroup.DestroyParticles();
  },this.lifetime);
 };
 
 setInterval(function(){
  self.active && self.generate(impulse);
 },freq);
};


function SlackWater(ps,shape,impulse){
 if(!(this instanceof SlackWater)){
  return new SlackWater(ps,shape,impulse);
 }
 
 impulse = impulse || Vector(0,0);
 
 this.particleSystem = ps;
 
 this.particleGroupDef = new b2ParticleGroupDef();
 this.particleGroupDef.shape = shape;
 this.particleGroupDef.color.Set(10, 20, 255, 255);
 
 this.shape = this.particleGroupDef.shape;
 
 this.particleSystem.DestroyParticlesInShape(
  shape,
  new b2Transform()
 );
 
 this.particleGroup =
       this.particleSystem
       .CreateParticleGroup(
        this.particleGroupDef
       );
 this.particleGroup.ApplyLinearImpulse(impulse);
 
};


function Circle(x,y,r){
 x=+x; y=+y; r=+r;
 var shape = new b2CircleShape();
 shape.position.Set(x, y);
 shape.radius = r;
 return shape;
};


function Rect(x,y,w,h){
 x=+x; y=+y; w=+w; h=+h;
 w /= 2; h /= 2;
 var shape = new b2PolygonShape();
 shape.vertices.push(Vector( x-w, y-h ));
 shape.vertices.push(Vector( x+w, y-h ));
 shape.vertices.push(Vector( x+w, y+h ));
 shape.vertices.push(Vector( x-w, y+h ));
 return shape;
};


function Vector(x,y){
 return new b2Vec2(x,y);
};
