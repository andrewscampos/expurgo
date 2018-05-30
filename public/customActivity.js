'use strict';

define(function (require) {
	var Postmonger = require('postmonger');
	var connection = new Postmonger.Session();
	var payload = {};
	var index = 0;
	var steps = [
		{'key': 'eventdefinitionkey', 'label': 'Event Definition Key'}
	];
	var currentStep = steps[0].key;

	$(window).ready(function () {
		connection.trigger('ready');
	});
	function initialize (data) {
        if (data) {
            payload = data;
		}
		// payload['arguments'].urlBase =  process.env.GATEWAY;
    }
	function onClickedNext () {
		save();
	}

	function onClickedBack () {
		connection.trigger('prevStep');
	}

	function onGotoStep (step) {
		showStep(step);
		connection.trigger('ready');
	}

	function showStep (step, stepIndex) {
		if (stepIndex && !step) {
			step = steps[stepIndex - 1];
		}

		currentStep = step;

		switch 	(currentStep.key) {
		case 'eventdefinitionkey':
			$('#step1').show();
			break;
		}
	}

	function save () {
		var name = $('#message').val();
		
		payload.name = $('#type').val();

		payload['arguments'].execute.inArguments[0].type = $('#type').val();
        payload['arguments'].execute.inArguments[0].title = $('#title').val();
		payload['arguments'].execute.inArguments[0].message = $('#message').val();
		payload['arguments'].execute.inArguments[0].categoria = $('#categoria').val();
		payload['arguments'].execute.inArguments[0].shortMessage = $('#shortMessage').val();
		payload['arguments'].execute.inArguments[0].rastreamento = $('#rastreamento').val();
		payload['metaData'].isConfigured = true;
		connection.trigger('updateActivity', payload);
	}

	connection.on('initActivity', initialize);
	connection.on('clickedNext', onClickedNext);
	connection.on('clickedBack', onClickedBack);
	connection.on('gotoStep', onGotoStep);
});
