(function(){

/* * * *
 * b2Vec2 == THREE.Vector2
 * * * */

THREE.Vector2.Add         = b2Vec2.Add;
THREE.Vector2.Cross       = b2Vec2.Cross;
THREE.Vector2.CrossScalar = b2Vec2.CrossScalar;
THREE.Vector2.Mul         = b2Vec2.Mul;
THREE.Vector2.MulScalar   = b2Vec2.MulScalar;
THREE.Vector2.Normalize   = b2Vec2.Normalize;
THREE.Vector2.Sub         = b2Vec2.Sub;


THREE.Vector2.prototype.Clone         = b2Vec2.prototype.Clone;
THREE.Vector2.prototype.Length        = b2Vec2.prototype.Length;
THREE.Vector2.prototype.LengthSquared = b2Vec2.prototype.LengthSquared;
THREE.Vector2.prototype.Set           = b2Vec2.prototype.Set;

b2Vec2 = THREE.Vector2;



/* * * *
 * b2ParticleColor == THREE.Color
 * * * */

THREE.Color.prototype.Set = function(r,g,b,a){
  var inv255 = .003921569;
  this.r = r * inv255;
  this.g = g * inv255;
  this.b = b * inv255;
  this.a = a * inv255;
};
THREE.Color.prototype.a = 0;

b2ParticleColor = function(r,g,b,a){
  THREE.Color.apply(this);
  this.Set(r,g,b,a);
};

b2ParticleColor.prototype = THREE.Color.prototype;



})();
