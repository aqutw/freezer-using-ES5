//mimic Object.freeze
var Freezer = function(name, val){
  Freezer.objs = Freezer.objs || {};

  var a,
      aLen,
      tmp,
      isNoVal = typeof val==='undefined',
      isNoDot = name.indexOf('.')<0; 
  if(isNoVal && isNoDot){
    return Freezer.objs[ name ];
  }else if(isNoDot){
    if(typeof Freezer.objs[name] === 'undefined'){
      Freezer.objs[name] = val;
    }
    return Freezer.objs[name];
  }else if(!isNoVal && !isNoDot){
    return;
  }

  if(isNoDot){
    a = [name];
  }else{
    a = name.split('.');
  }
  aLen = a.length;

  tmp = Freezer.objs;
  for(var i=0;i<aLen;i++){
    tmp = tmp[ a[i] ];
    if(i==aLen-1){ return tmp; }
  }
};


//usage
Freezer('var1', {a:1, b:2});
console.log( Freezer('var1') );
console.log( Freezer('var1.b') );

console.log('------resetup var1.b-------');
console.log( Freezer('var1.b', 'bbbb') );
console.log( Freezer('var1.b') );

console.log('------resetup var1-------');
Freezer('var1', {a:1, b:2, c:3});
console.log( Freezer('var1.c') );
console.log( Freezer('var1') );
