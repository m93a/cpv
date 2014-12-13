// some of the less important menus and stuff
var menuElem;

window.Credits = function(){
  
  if(!menuElem){ setTimeout(Credits); }
  
  menuElem.textContent = "";
  
  var h1 = document.createElement("h1");
  h1.id = "title";
  h1.textContent = "ČPV_14";
  menuElem.appendChild( h1 );
  
  var about = document.createElement("pre");
  about.textContent = "Prvosjezd\n\n"
                    + "Věnováno Škunerovi - přeji veselé Vánoce!\n"
                    + "hlavní programátor: Michal Grňo\n"
                    + "použité technologie: Box2D, LiquidFun";
  menuElem.appendChild( about );
  
  var back = document.createElement("div");
  back.textContent = "zpět";
  back.classList.add("button");
  menuElem.appendChild( back );
  
  back.addEventListener("click",function(){
    initMenu();
  });
  
};


window.Help = function(){
  
  if(!menuElem){ setTimeout(Credits); }
  
  menuElem.textContent = "";
  
  var h1 = document.createElement("h1");
  h1.id = "title";
  h1.textContent = "ČPV_14";
  menuElem.appendChild( h1 );
  
  var about = document.createElement("pre");
  about.textContent = "Tvůj cíl je dostat se co nejrychleji do cíle.\n"
                    + "Kajak ovládáš šipkami - šipkou nahoru pádluješ dopředu,\n"
                    + "šipkou dolů naopak. Šipkami do stran se otáčíš.\n"
                    + "Tlačítko B je boost - zrychlí tě, ale pozor, máš jen omezenou energii!\n"
                    + "Tlačítkem Esc se vrátíš do menu a tlačítkem R restartuješ hru.";
  menuElem.appendChild( about );
  
  var back = document.createElement("div");
  back.textContent = "zpět";
  back.classList.add("button");
  menuElem.appendChild( back );
  
  back.addEventListener("click",function(){
    initMenu();
  });
  
};

window.Highscore = function( levelName, finishTime ){
  
  alert( levelName+": "+timediff( finishTime,Date.now() ) );
  Highscore = function(){};
  location.href+="";
  
};
