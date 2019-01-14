'use strict';

const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];


//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];


const myEvent = {
  'booker': '0',
  'barId': '1',
  'time': 1,
  'persons': 1,
  'options': {
    'deductibleReduction': false
  }
};

function loadPricePers() {
	var barId = document.getElementById("myBars").value;
	bars.forEach(function (barItem) {
		if(barItem.id===barId){
			document.getElementById("pricePerHour").innerHTML = barItem.pricePerHour + "/hour";
			document.getElementById("pricePerPerson").innerHTML = barItem.pricePerPerson + "/pers";
		}
	});
	myEvent.barId=barId;
	personChange();
	hourChange();
	calculSum();
}

function hourChange() {
	var pricePerHour = document.getElementById("pricePerHour").innerHTML;
	document.getElementById("priceByHour").innerHTML = parseInt(pricePerHour) * document.getElementById("myHours").value;
	myEvent.time=parseInt(document.getElementById("myHours").value);
	calculSum();
}

function personChange() {
	var pricePerPerson = document.getElementById("pricePerPerson").innerHTML;
	var myPersons = document.getElementById("myPersons").value;
	document.getElementById("priceByPerson").innerHTML = parseInt(pricePerPerson) * myPersons;
	document.getElementById("deductablePrice").innerHTML = "+" + myPersons + "";
	myEvent.persons=parseInt(myPersons);
	reductionCalcul();
	calculSum();
}

function reductionCalcul() {
	var myPersons = document.getElementById("myPersons").value;
	var discount = 0;
	if(myPersons > 10 && myPersons < 21) {
		discount = 10;
	} else if(myPersons > 20 && myPersons < 31) {
		discount = 30;
	} else if(myPersons > 30) {
		discount = 50;
	}
	document.getElementById("myReduction").innerHTML = discount;
}

function calculSum() {
	var myPersons = document.getElementById("priceByPerson").innerHTML;
	var myHours = document.getElementById("priceByHour").innerHTML;
	var discount = document.getElementById("myReduction").innerHTML;
	var addition = 0;
	if(myEvent.options.deductibleReduction) {
		addition = myEvent.persons;
	}
	var x =(parseInt(myPersons.replace( /^\D+/g, '')) + parseInt(myHours.replace( /^\D+/g, ''))) * (100-parseInt(discount.replace( /^\D+/g, '')))/100;
	if(x) {
		document.getElementById("mySum").innerHTML = x + addition;
		myEvent.price = x+addition;
	}
}

function deductableChange() {
	myEvent.options.deductibleReduction = document.getElementById('myDeduct').checked;
	calculSum();
}

(() => {
	var x = document.getElementById("myBars");
	bars.forEach(function (barItem) {
	var option = document.createElement("option");
		option.text = barItem.name;
		option.value = barItem.id;
		x.add(option);
	});
	loadPricePers();
	hourChange();
})();
