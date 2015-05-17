// TODO: click upgrades
//       Saving Game
//       building upgrades
//       Additional Buildings
//       Prestige Menu
  //     **Idea** At first Prestige Gamble give 100% chance for 1st prestige item, maybe a new tab for something
  //       to sell some interesting new item.  Thereafter all prestige gambles will have increasingly smaller
  //       output chance.

function randomName() {
    var names = ['Kenneth', 'Tobren', 'Archer', 'Rusk', 'Plasterinoit', 'Benoit', 'Alejandro', 'generic_hero', 'Herjuut Berdosli', 'Driss', 'Robaldt', 'Traevizt', 'Nord', 'Spock', 'Spike', 'Day', 'Collemtimus', 'The Guy', 'Kerlinggraghina', 'Helios', 'Herugh', 'Hrongat'];
    
    var i = Math.floor( Math.random()*names.length );
    return names[i];
}

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
			return (65535*a).toString(16) + (b*255).toString(16) + (c).toString(16);
	} while (1);
}

function randomComment()
{
    if ( Math.random() > 0.98 )
        var comment = ['ouch!','Damn, son.', 'Well, FUCK.', 'C\'mon, kid! Try harder!', 'You\'re almost there!', 'Congratulations!', 'You\'re a neanderthal clicking like that!', 'Try harder!', 'Wooooooo...','Have faith, the end is near.'];
    else
        return;
	
    var i = Math.floor( Math.random()*comment.length );
	writeToComments( comment[i], true); // parameters: comment[index], true
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
var TotalClicks = 1000;
var clickRate = 1;

//Click Stuff in the game
//**********************
function clickFunction()
{
	TotalClicks += clickRate;
	document.getElementById("counter").innerHTML = TotalClicks.toFixed(1);
	randomComment();
}

function increment() {
    var x = 0;
    for ( var i in structure)
    {
        x += structure[i].output();
    }
	TotalClicks += x;
	document.getElementById("counter").innerHTML = TotalClicks.toFixed(1);
}

function clickUpgradeObjects( str, num, tng ) {
    var abc = '';
    var upr = "upgradeButton("+"'"+str+"',"+num+","+"'"+tng+"')";
    abc += "<div id=\""+tng+str+"\"><button href=\"#\" class=\"upgradeButton\" onclick=\""+upr+"\">"+str+"</button></div>";
    document.getElementById("clickUpgradesSection").innerHTML += abc;
}

function upgradeButton( str, num, tng ) {
    var elem = document.getElementById( tng+str );
    document.getElementById( tng+str ).parentNode.removeChild( elem );
    clickRate += num;
    document.getElementById("clickRate").innerHTML = "Clicks per click is "+clickRate;
}

function closeButton( info ) {
    var elem = document.getElementById(info);
    document.getElementById(info).parentNode.removeChild(elem);
    return;
}

var hero;
function heroNamePrompt() {
    var user = prompt( "What would you like to name your hero?", randomName() );
    
    if ( user ) { 
        hero = new Hero(user);
        closeButton("heroName");
        hero.newHeroObjects();
        writeToComments("You just got your hero "+user+"!", false);
        $( "#chest" ).append( "chest" );
        $( "#gloves" ).append( "gloves" );
        $( "#rightRing" ).append( "rightRing" );
        $( "#leftRing" ).append( "leftRing" );
        $( "#sword" ).append( "sword" );
        $( "#helmet" ).append( "helmet" );
        $( "#heroInventory" ).css( 'visibility', 'visible' );
    } else {
        writeToComments("That's alright, he'll be here for you.", false);
    }
}

function createPrompt() {
    var str = '<div id="heroName">';
    str +=    '<button type="submit" onclick="heroNamePrompt()">Name Your Hero</button>';
    str +=    '</div>';
    document.getElementById("heroTab").innerHTML += str;
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
    document.getElementById("gamblingTab").innerHTML += abc;
}

//Adventure stuff in the game
//*****************************
// Ideas for this section:
  // I was thinking that it could be a procedurally generated text-based adventure game.
  // i.e.: Monsters with random adjectives, Create Hero object who can level up character and gain xp, etc.
  // We could even create armor and random drop sequences.
  
    // Adventure Sequence:
    // 1) Procedurally generated rooms 
    // 2) Random Monster encounter
    // 3) Random Loot Chance + xp gain
    // 4) Choice to continue onwards { Each successful fight increases monster difficulty + xp gain + item drop rate }
    // 5) Timer for health regen


/*    Monster Naming TODO: 
    monsterAdjectiveBuff = ['Scary', 'Hungry', 'Impressive', 'Large', 'Fire-breating', 'Cannabilistic', 'Vegetarian', 'Non-humanoid', 'humanoid', 'Procedurally-Generated', 'Alien-like', 'Criminal', 'Fancy'];
    monsterAdjectiveDebuff = ['Weak', 'Cry-Baby', 'Silly', 'Lesser', 'Poisoned'];
    monsterAdjectiveEasy = ['Trivial', 'Infant', 'Easy', 'Little-Experience-Giving', 'Sad', 'Hopeless', 'Edible',];
    monsterNoun = ['Hog', 'Lion', 'Fish', 'Bird', 'Cow', 'Eagle', 'Tarantula', 'Goat', 'Dog', 'Friend', 'Homeless Man', 'Bandit'];
    
    monsterRare = [];
    monsterUnique = [];
    monsterHero = ['Billy Goat Rangler', 'Sea Sloth Jeb', 'Coconut-Crusher, the Impaler', 'Ragneifuus Objuuverius', 'Clonzer Habitus, King of Normandale', 'The Tainted King', 'Seizely the Wretch'];
*/

//Hero Stuff in the game
//******************************



//Our Hero
function Hero( title ) { // constructor
    this.title = title   
    this.inventory = [];
    this.chest;
    this.helmet;
    this.gloves;
    this.leftRing;
    this.rightRing;
    this.sword;
    
    this.newHeroObjects = function() {
        var str = '';
        str += 'Inventory'+'<div id="chest"></div><div id="helmet"></div> <div id="gloves"></div> <div id="leftRing"></div> <div id="rightRing"></div> <div id="sword"></div>';
        document.getElementById("heroInventory").innerHTML = str;
    }
}

// Generation stuff in the game
//*****************************
var structure = Array();
//                          (type,         typePlural,    cost,    rate,   costRate)
function createNames () {
    var names = Array(10);
    var namesPlural = Array(10);
    for( var x = 0; x < 5; x++ ) {
        if ( x === 0 ) {
            names = ['A Great Big Pile of Leaves', 'Nothing Out of the Ordinary', 'Something Out of the Ordinary',  'A Generic Building', 'A Cheap Diskette', 'A Random Discarded Toothbrush', 'A Half of a Scissors', 'A Hairdresser', 'A Small Structure', 'An Average Doghouse']; // 10 names
            namesPlural = ['Great Big Piles of Leaves', 'Nothings Out of the Ordinary', 'Somethings Out of the Ordinary',  'Generic Buildings', 'Cheap Diskettes', 'Random Discarded Toothbrushes', 'Halves of Scissors', 'Hairdressers', 'Small Structures', 'Average Doghouses'];
        } if ( x === 1) {
            names = ['A Sizeable House', 'A Professional Interior Decorator', 'A Massive Television', 'A Pile of Cocaine', 'A Lifetime Supply of Energy Drinks', 'A Fulfilled Dream', 'A Mythological Creature', 'The Real Santa Claus', 'Expensive Stone Block', 'A Real Deal'];
            namesPlural = ['Sizeable Houses', 'Professional Interior Decorators', 'Massive Televisions', 'Piles of Cocaine', 'Lifetime Supplies of Energ Drinks', 'Fulfilled Dreams', 'Mythological Creatures', 'The Real Santa Clauses', 'Expensive Stone Blocks', 'Real Deals'];
        } if ( x === 2 ) {
            names = ['The City of Atlantis', 'Truckload of Marijuana', 'An Average Office Building', 'An Off-Putting Feeling', 'A Golden Warning Sign', 'A Treasure Chest', 'A Golden Mythological Creature', 'An Icon Like Mickie Mouse', 'A Powerful Idea', 'Gold'];
            namesPlural = ['The Cities of Atlantis', 'Truckloads of Marijuana', 'Average Office Buildings', 'Off-Putting Feelings', 'Golden Warning Signs', 'Treasure Chests', 'Golden Mythological Creature-', 'Icons Like Mickie Mouse', 'Powerful Ideas', 'Gold'];
        } if ( x === 3 ) {
            names = ['Space Traveling Vehicle', 'A Sunken Alien Spaceship', 'Bulid-A-Bear Workshop', 'Hitch-Hiker Towel', 'A Beautiful Wife', 'A Pretty Color', 'This Incremental Game', 'Power Over Gravity', 'A Bruce Lee Movie', 'John-Boy'];
            namesPlural = ['Space Traveling Vehicles', 'Sunken Alien Spaceships', 'Bulid-A-Bear Workshops', 'Hitch-Hiker Towels', 'Beautiful Wives', 'Pretty Colors', 'These Incremental Games', 'Powers Over Gravity', 'Bruce Lee Movies', 'John-Boys'];
        } if ( x === 4 ) {
            names = ['Orteil', 'An Intergalactic Spaceport', 'A Transgalactic Spaceprobe', 'A Very Impressive Robot', 'A Capable Beginning Programmer', 'A Great Mother', 'A Futuristic Battery', 'Fry From Futurama', 'A Large Mitten', 'A Brilliant Idea For A Game'];
            namesPlural = ['Orteils', 'Intergalactic Spaceports', 'Transgalactic Spaceprobes', 'Very Impressive Robots', 'Capable Beginning Programmers', 'Great Mothers', 'Futuristic Batteries', 'Frys From Futurama', 'Large Mittens', 'Brilliant Ideas For A Game'];
        }
            
    var i = Math.floor(Math.random()*names.length);
    structure[x] = new Generator( names[i],                 //type
                                  namesPlural[i],           //typePlural
                                  10*Math.pow(10,1.15*x),    //cost
                                  0.1*Math.pow(10, 0.75*x), //rate
                                  1+.1*Math.pow(1.45,x) );  //costRate
         
    }
}

function Generator(type, typePlural, cost, rate, costRate) {
	this.type = type;
	this.typePlural = typePlural;
	this.number = 0;
	this.rate = rate;
	this.upgrade = 1;
	this.costRate = costRate;
	this.cost = cost;
	this.costOriginal = cost;
	this.gamblingCost = 2;
	this.gamblingChance = 0;
	this.gamblingTries = 0;
	this.gamblingWins = 0;
	
	this.firstClickUpgrade  = false;
	this.secondClickUpgrade = false;
	this.thirdClickUpgrade  = false;
	this.fourthClickUpgrade = false;
	
	this.getType   = function() { return this.type; }
	this.getNumber = function() { return this.number; }
	this.getRate   = function() { return this.rate; }
	this.getCost   = function() { return this.cost; }
	this.output    = function() { return (this.rate * Math.pow(this.number,1.2) * this.upgrade); }
	
	this.gambleStructure = function() {
	    if (this.number < 2)
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
	        this.cost = this.costOriginal * Math.pow(this.costRate, 1.3*(this.number + 1));
	    else 
	        this.cost = this.costOriginal;
	        
	    this.gamblingChance = 0.005 * Math.pow( this.gamblingTries+1, 1.3 ) * Math.pow(this.gamblingCost, 0.5) / Math.pow(this.upgrade, 1.5);
	    if ( this.gamblingChance >= 1.0 )
	        this.gamblingChance = 1.0;
	    
	    if(this.number < 2) {
	        document.getElementById( this.type+'Gamble' ).innerHTML = 'You need more '+this.typePlural+' to gamble with';
	    } else {
	        this.gamblingCost = (this.number/2).toFixed(0);
	        document.getElementById(this.type+'Gamble').innerHTML = 'gamble '+this.gamblingCost+' '+this.typePlural+' with a '+(this.gamblingChance*100).toFixed(3)+'% chance';
	    }	
	    
		document.getElementById("counter").innerHTML = TotalClicks.toFixed(1); //numberof Total Clicks
		document.getElementById(this.type + 'Cost').innerHTML = this.cost.toFixed(0); //Writes Cost in button
		
		var str = '';
		if( this.number == 1) {}
		else
		    str += this.number.toFixed(0);
		if( this.number == 1 )
		    str += ' '+this.type;
		else 
		    str += ' '+typePlural;
		str += ', x'+this.upgrade;
		str += ' upgrade, giving '+this.output().toFixed(1);
		if ( this.output() === 1 )
		    str += ' click per second';
		else
		    str += ' clicks per second';   
		document.getElementById(this.type).innerHTML = str;
    }
	
	this.buyMax    = function(i)
	{
		if( TotalClicks < this.cost && i === 0) {
		    writeToComments("Not enough Clicks");
		    return;
		} else if ( TotalClicks >= this.cost ) {
		    this.number++;
		    TotalClicks -= this.cost;
		    this.writeCost();
		    return ( this.buyMax(i+1) );
		} else {
		    var str = "You purchased "+i+" ";
		    if( i > 1 )
		        str += this.typePlural;
		    else 
		        str = "You purchased "+this.type;
		        
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
			writeToComments( "You purchased " + type, false );
			this.upgradeAvailable();
		}
		else 
		{
			writeToComments("Not enough Total Clicks", true);
		}
		this.writeCost();
	}
	
	this.upgradeAvailable = function() {
        if( this.number >= 10 && this.firstClickUpgrade == false ) { // checks structure amount for upgrade availability.
            this.Achievement( 'First click upgrade for '+this.type+'!' )
            this.firstClickUpgrade  = true;
        } if( this.number >= 25 && this.secondclickUpgrade == false ) {
            this.Achievement( 'Monstrous amounts of '+this.typePlural )
            this.secondClickUpgrade = true;
        } if( this.number >= 50 && this.thirdclickUpgrade == false ) {
            this.Achievement( 'A couple of '+this.typePlural+' click upgrades!' )
            this.thirdClickUpgrade = true;
        } if( this.number >= 100 && this.fourthClickUpgrade == false ) {
            this.fourthClickUpgrade  = true;
            this.Achievement( "Forth time good Job!" )
        } if( this.number >= 150 && this.fifthClickUpgrade == false ) {
            this.fifthClickUpgrade = true;
            this.Achievement( "Cool." );
        }   
    }
    
    this.Achievement = function( str )
    {
        writeToComments( 'Upgrade "'+str+'" now available.', false );
        clickUpgradeObjects( str, 5, this.type );
    }
}


function newStructures()
{
	var str = '';
	for ( var i in structure )
	{
		str += '<button href="#" class="button" onclick="structure['+i+'].addNumber()">'+structure[i].type+' (<span id="' + structure[i].type + 'Cost">'+structure[i].cost+'</span>)</button> <button href="#" class="button" onclick="structure[' + i + '].buyMax(0)">Buy max</button><p id="buildingSection"><span id="'+structure[i].type+'"></span> <span id="'+structure[i].type+'Check"<span></p>';
	}
	document.getElementById("generatorsTab").innerHTML += str;
}

// engine *****************
//*************************
window.setInterval(function()
{
	increment();
}, 1000);


