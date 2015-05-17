// TODO: click upgrades
//       Saving Game
//       building upgrades
//       Additional Buildings
//       Prestige Menu
  //     **Idea** At first Prestige Gamble give 100% chance for 1st prestige item, maybe a new tab for something
  //       to sell some interesting new item.  Thereafter all prestige gambles will have increasingly smaller
  //       output chance.

function randomColor()
{
	var a = 255*Math.random();
	var b = 255*Math.random();
	var c = 255*Math.random(); 
	do
	{
		if ( Math.abs(a-b) < 30 )
			var a = 255*Math.random();
		if ( Math.abs(a-c) < 30 )
			var c = 255*Math.random();
		if ( Math.abs(b-c) < 30 )
			var b = 255*Math.random();
		if ( Math.abs(a-b) > 205 )
			var a = 255*Math.random();
		if ( Math.abs(a-c) > 225 )
			var c = 255*Math.random();
		if ( Math.abs(b-c) > 225 )
			var b = 255*Math.random();
		else
			return (a*65025).toString(16) + (b*256).toString(16) + (c*255).toString(16);
	} while (1);
}

function randomComment()
{
	var comment;
	if ( Math.random() < .96 )
		return;
	if ( Math.random() < .1 )
		comment = "ouch!";
	else if (Math.random() < .2)
		comment = "Damn, son.";
	else if (Math.random() < .3)
		comment = "Well, FUCK.";
	else if (Math.random() < .4)
		comment = "C'mon, kid! Try harder!";
	else if (Math.random() < .5)
		comment = "You're almost there!";
	else if (Math.random() < .6)
		comment = "Congratulations!";
	else if (Math.random() < .7)
		comment = "You're a neanderthal clicking like that!";
	else if (Math.random() < .8)
		comment = "Try harder!";
	else if (Math.random() < .9)
		comment = "Wooooooo...";
	else if (Math.random() < 1.0)
		comment = "Have faith, the end is near.";
	writeToComments(comment, true);
}

function writeToComments( stuff, bool )
{
	if ( bool === true )
		document.getElementById('commentBody').innerHTML += '<p>'+stuff.fontcolor( randomColor() )+'</p>';
	else if ( bool === false )
		document.getElementById('commentBody').innerHTML += '<p>'+stuff.fontcolor("black")+'</p>';
	$("#bottomHalf").scrollTop($("#bottomHalf")[0].scrollHeight);
}

//Game Functions
var TotalClicks = 0;
var clickRate = 1;


//Click Stuff in the game
//**********************
function clickFunction()
{
	TotalClicks += clickRate;
	document.getElementById("counter").innerHTML = TotalClicks.toFixed(1);
	randomComment();
}

function increment()
{
    var x = 0;
    for ( var i in structure)
    {
        x += structure[i].output();
    }
	TotalClicks += x;
	document.getElementById("counter").innerHTML = TotalClicks.toFixed(1);
}

function clickUpgradeObjects( str, num )
{
    var abc = '';
    abc += '<p id="'+str+'"><button href="#" class="upgradeButton" onclick="upgradeButton('+num+')">'+str+'</button>'
    document.getElementById("tab1").innerHTML += abc;
}

//Gambling stuff in the game
//*****************************

function gamblingObjects() // Writes the gambling buttons to the Gambling tab <div>
{
    var abc = '';
    {
    for (var i in structure)
        {
            abc += '<button href="#" class="button" onclick="structure['+i+'].gambleStructure()">Gamble '+structure[i].typePlural+'</button><p><span id="'+structure[i].type+'Gamble">gamble '+structure[i].gamblingCost+' '+structure[i].typePlural+' with a '+structure[i].gamblingChance+'% chance</span></p>';
        }
    }
    document.getElementById("tab3").innerHTML += abc;
}

// Generation stuff in the game
//*****************************

var structure = new Array();
//                      (type,           typePlural,      cost,   rate,   costRate)
structure[0] = new Generator('building',   'buildings',   10,      0.1,    1.2);
structure[1] = new Generator('skyscraper', 'skyscrapers', 100,     1.0,    1.3);
structure[2] = new Generator('volcano',    'volcanos',    10000,   10.0,   1.5);
structure[3] = new Generator('casino',     'casinos',     50000,   100.0,  1.55);
structure[4] = new Generator('atlantis',   'atlantises',  1000000, 1000.0, 1.7); //5

function Generator(type, typePlural, cost, rate, costRate)
{
	this.type = type;
	this.typePlural = typePlural;
	this.number = 0;
	this.rate = rate;
	this.upgrade = 1;
	this.costRate = costRate;
	this.cost = cost;
	this.costOriginal = cost;
	this.gamblingCost = 10;
	this.gamblingChance = 0;
	this.gamblingTries = 0;
	this.gamblingWins = 0;
	
	this.getType   = function() { return this.type; }
	this.getNumber = function() { return this.number; }
	this.getRate   = function() { return this.rate; }
	this.getCost   = function() { return this.cost; }
	this.output    = function() { return (this.rate * this.number * this.upgrade); }
	
	this.gambleStructure = function()
	{
	    if (this.number <= this.gamblingCost)
	        return;
	    else
	    {
	        this.gamblingTries++;
	        this.gamblingPrize();
	        this.number -= this.gamblingCost;
	    }
	    this.writeCost();
	}
	
    this.gamblingPrize = function() // I made this a separate function because I want to use it later to do extra cool things.
    {
        if ( Math.random() <= this.gamblingChance )
        {
	        this.upgrade++;
	        writeToComments(this.type+' upgraded', true)
        }
        else
	        writeToComments('You lost this time, but your next gamble on this item has become a little easier.', true);
    }
	
	this.writeCost = function()
	{   
	    if( this.number > 0 )
	        this.cost = this.costOriginal * Math.pow(this.costRate, (this.number + 1));
	    else 
	        this.cost = this.costOriginal;
	        
	    this.gamblingChance = .001 * ( this.gamblingTries+1 ) * this.gamblingCost, 2 / Math.pow(this.upgrade, 1.7);
	    if ( this.gamblingChance >= 1.0 )
	        this.gamblingChance = 1.0;
	    
	    if(this.number < 10) {
	        document.getElementById( this.type+'Gamble' ).innerHTML = 'You need more '+this.typePlural+' to gamble';
	    } else {
	        this.gamblingCost = .2 * Math.pow(this.number, 1.3);
	        document.getElementById(this.type+'Gamble').innerHTML = 'gamble '+this.gamblingCost.toFixed(0)+' '+this.typePlural+' with a '+100*this.gamblingChance.toFixed(2)+'% chance';
	    }	
	    document.getElementById(this.type).innerHTML = this.number.toFixed(0); //number of structures
		document.getElementById("counter").innerHTML = TotalClicks.toFixed(1); //numberof Total Clicks		
		document.getElementById(this.type + 'Cost').innerHTML = this.cost.toFixed(0); //Writes Cost in button
			
		if( this.number == 1 ) {
			document.getElementById(this.type + 'Check').innerHTML = type; //tests/corrects plurality
		} else {
			document.getElementById(this.type + 'Check').innerHTML = typePlural;
		}
			
		document.getElementById(this.type + 'Check').innerHTML += ', x'+this.upgrade+' upgrade';//writes upgrades
		document.getElementById(this.type + 'Check').innerHTML += ', giving '+this.output().toFixed(1)+' total';
    }
	
	this.buyMax    = function(i)
	{
		if( TotalClicks < this.cost && i === 0) {
		    alert("Not enough Clicks");
		    return;
		} else if ( TotalClicks >= this.cost ) {
		    this.number++;
		    TotalClicks -= this.cost;
		    return ( this.buyMax(i+1) );
		} else {
		    var str = "You purchased "+i+" ";
		    if( i > 1 )
		        str += this.typePlural;
		    else 
		        str = "You purchased a "+this.type;
		        
		
		    writeToComments( str, false );
		    this.upgradeAvailable();
		    this.writeCost();
		    return;
		}
	}
	this.addNumber = function() //Buying structures Function
	{
		if( TotalClicks >= this.cost )
		{
			this.number++; //increment number, cost, decrement TotalClicks
			TotalClicks -= this.cost; 
			this.writeCost();
			writeToComments( "You purchased a " + type, false );
			this.upgradeAvailable();
		}
		else 
		{
			alert("Not enough Total Clicks");
		}
		this.writeCost();
	}
	
	this.upgradeAvailable = function() // TODO: this doesn't fucking work.
    {
        console.log("Make this work");
    }
}


function newStructures()
{
	var str = '';
	for ( var i in structure )
	{
		str += '<button href="#" class="button" onclick="structure['+i+'].addNumber()">'+structure[i].type+' (<span id="' + structure[i].type + 'Cost">'+structure[i].cost+'</span>)</button> <button href="#" class="button" onclick="structure[' + i + '].buyMax(0)">Buy max</button><p id="buildingSection"><span id="'+structure[i].type+'"></span> <span id="'+structure[i].type+'Check"<span></p>';
	}
	document.getElementById("tab2").innerHTML += str;
}

// engine *****************
//*************************
window.setInterval(function()
{
	increment();
}, 1000);


