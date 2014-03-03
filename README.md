# Selectize-ng

[Selectize.js](http://brianreavis.github.io/selectize.js) directive for AngularJS with two-way bindings for both values and options.


## Requirements

- AngularJS
- selectize.js
- jQuery (required by selectize)


## Installation

You can get it from [Bower](http://bower.io/)

	bower install selectize-ng

Load the assets into your application:

	<link rel="stylesheet" href="bower_components/selectize-ng/dist/selectize.css"/>
	<script type="text/javascript" src="bower_components/selectize-ng/dist/standalone/selectize-ng.min.js"></script>

Or if you want to use your own copy of selectize.js:

	<link rel="stylesheet" href="bower_components/selectize/dist/css/selectize.css"/>
	<script type="text/javascript" src="bower_components/selectize/dist/js/standalone/selectize.min.js"></script>
	<script type="text/javascript" src="bower_components/selectize-ng/dist/selectize-ng.min.js"></script>

Add the module as a dependency to you angular app:

	angular.module('myApp', ['selectize-ng'])


## Usage

For tagging, use an `<input>` element:

	<input type="text" selectize="config" options="suggestions" ng-model="selected"/>
	
And for an auto-suggesting single-value dropdown, use a `<select>`:

	<select selectize="config" options="suggestions" ng-model="selected"></select>

`config` in the above examples are selectize config objects as documented [here](https://github.com/brianreavis/selectize.js/blob/master/docs/usage.md).

`suggestion` is an array of objects to use as items to choose from. By default the object need to be in the form `{ value: 1, text: 'Hello' }`, but this can be configured using the `valueField` and `labelField` config directives;


## Development

I use Karma and jshint to ensure the quality of the code.  The easiest way to run these checks is to use grunt:

	npm install -g grunt-cli
	npm install && bower install
	grunt watch

