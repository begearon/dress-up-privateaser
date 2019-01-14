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
const actorItem = {
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
};


const myEvent = {
  'booker': '0',
  'barId': '1',
  'time': 1,
  'persons': 1,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
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

function booking() {
	var discount = 0;
	var additional = 0;
	var timeComp = 0;
	var personComp = 0;
	if(myEvent.persons > 10 && myEvent.persons < 21) {
		discount = 10;
	} else if(myEvent.persons > 20 && myEvent.persons < 31) {
		discount = 30;
	} else if(myEvent.persons > 30) {
		discount = 50;
	}
	bars.forEach(function (barItem) {
		if(barItem.id===myEvent.barId){
			timeComp = barItem.pricePerHour * myEvent.time;
			personComp = barItem.pricePerPerson * myEvent.persons;
		}
	});
	myEvent.price = (timeComp + personComp)*(100-discount)/100;
	var commission = (myEvent.price*0.3);
	myEvent.commission.insurance = commission/2;
	myEvent.commission.treasury = myEvent.persons;
	myEvent.commission.privateaser = (commission-myEvent.commission.treasury-myEvent.commission.insurance);	
	if(myEvent.options.deductibleReduction) {
		additional = myEvent.persons;
	}
	myEvent.commission.privateaser = additional + myEvent.commission.privateaser;
	myEvent.price = additional + myEvent.price;
	
		
	actorItem.payment.forEach(function (paymentItem) {
		if(paymentItem.who == 'booker') paymentItem.amount = myEvent.price;
		else if(paymentItem.who == 'bar') paymentItem.amount = myEvent.price-commission;
		else if(paymentItem.who == 'insurance') paymentItem.amount = myEvent.commission.insurance;
		else if(paymentItem.who == 'treasury') paymentItem.amount = myEvent.commission.treasury;
		else if(paymentItem.who == 'privateaser') paymentItem.amount = myEvent.commission.privateaser;
	});
	console.log(myEvent);
	console.log(actorItem);
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
