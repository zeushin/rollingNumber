Numbering = {};

Numbering.init = function(ul, n, func) {
    var self = this;

    // li들을 array로관리
    var lis = $('ul').find('li');    
    self.lis = [];    
    lis.each(function(index) {
	var li = $(lis[index]);
	
	if (!isNaN(parseInt(li.text()))) {
	    self.lis.push(li);
	}
    });
    // 1의자리가 맨처음으로
    self.lis = self.lis.reverse();
    self.lis = $(self.lis);

    // 숫자
    self.number = n;
    
    // call back
    self.finishCallbackFunction = func;

    self.setNumber();
};

Numbering.setNumber = function() {
    var self = this;
    var num = self.number;
    if (typeof num != 'string') {
	num = num + '';
    }

    var numArr = num.split('').reverse();
    self.isLast = false;
    self.lis.each(function(index) {
    	var no = numArr[index];
	var last = false;
    	if (no == undefined) {
    	    no = '0';
	    if (self.isLast == false) {
		self.isLast = true;
		last = self.isLast;
	    }
    	}
    	self.rolling($(self.lis[index]), no, last);
    });    
};

Numbering.rolling = function(li, no, isLast) {
    var self = this;
    var maxCount = 30;
    for (var i = 1 ; i < maxCount ; i ++) {	
	var n = i == maxCount - 1 ? no : self.getRandomNumber();	
	var realLast = false;
	if (i == maxCount - 1 && isLast) {
	    realLast = true;
	}	    
	self.setTimeout(i, n, li, realLast);
    }
};

Numbering.setTimeout = function(i, n, li, realLast) {
    var self = this;
    setTimeout(function() {
	li.text(n);
	if (realLast && self.finishCallbackFunction) {
	    self.finishCallbackFunction();
	}
    }, 50 * i);
};

Numbering.getRandomNumber = function() {
    return [0,1,2,3,4,5,7,8,9][Math.floor(Math.random()*9)];
};


$(function() {
    Numbering.init($('ul')[0], 9238234, function() {
	alert('end!!');
    });
});
