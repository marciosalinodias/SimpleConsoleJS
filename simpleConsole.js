/**
 * Copyright (C) 2006 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * See (https://github.com/marciosalinodias/SimpleConsoleJS)
 * 
 * @author - Marcio Salino Dias
 * @email - marciosalinodias@gmail.com
 * 
 * See the Github SimpleConsoleJS project (https://github.com/marciosalinodias/SimpleConsoleJS) for full details.
 * This plugin is just a simple javascript console to incorporate into your web page.
 * @memberOf jQuery.fn
 */
(function( $ ) {
	
	$.fn.SimpleConsole = function() {
		
		this.html("");
		
		var scCss = document.createElement("link");
		scCss.rel = "stylesheet";
		scCss.href = "simpleConsole.css"; 
		$(document.head).append(scCss);
		
		// Dependency of prettify plugin
		var prettifyCss = document.createElement("link");
		prettifyCss.rel = "stylesheet";
		prettifyCss.href = "prettify.css";
		$(document.head).append(prettifyCss);
		var prettifyScript = document.createElement("script");
		prettifyScript.setAttribute("type", "text/javascript");
		prettifyScript.setAttribute("src", "prettify.js");
		document.head.appendChild(prettifyScript);
		// Dependency of prettify plugin
		
		var scInElement = document.createElement("input");
		scInElement.id = "sc-cmdIn";
		var scOutElement = document.createElement("pre");
		scOutElement.id = "sc-cmdOut";
		scOutElement.className = "prettyprint lang-js";
		var arrCommands = [];
		var arrActual;
		
		this.append(scInElement);
		this.append("<br />");
		this.append(scOutElement);
		
		scInElement = $(scInElement);
		scOutElement = $(scOutElement);
		
		// Needed because IE dont have Object.constructor.name property
		function getClassName(element){
		   var nameReplaceRegex = /function (.{1,})\(/;
		   var className = (nameReplaceRegex).exec(element.constructor.toString());
		   return (className && className.length > 1) ? className[1] : "";
		};		
		
		function randomizeIdentifier(){
			return Date.now().toString() + parseInt(Math.random() * 1000000).toString();
		};
		
		function moveToNewElement(){
			arrActual = arrCommands.length;
			scInElement.val("");
		};
		
		function insertActualElement(){
			arrCommands.push(scInElement.val());
			arrActual = arrCommands.length;
		};
		
		function passOneElement(){
			if(typeof arrCommands[arrActual+1] != 'undefined'){
				arrActual += 1;
				scInElement.val(arrCommands[arrActual]);
			} else {
				arrActual = arrCommands.length;
				scInElement.val("");
			};
		};
		
		function backOneElement(){
			if(typeof arrCommands[arrActual-1] != 'undefined'){
				arrActual -= 1;
				scInElement.val(arrCommands[arrActual]);
			};
		};
		
        function executeCode(command){
			var result;
			
			if(scOutElement.text() != ""){
				scOutElement.append("<br /><hr />");
			};
			scOutElement.append("&gt;&gt; " + command + "<br />");
			prettyPrint();
			
			try{
				result = window.eval( command );
				if (typeof result == "object") {
					result = generateObject(result);
				};
				scOutElement.append("&lt;&lt; " + result);
			}
			catch(e){
				scOutElement.append("&lt;&lt; " + e);
			};
			
			prettyPrint();
		};
		
		function generateObject(dataTree){
			if (dataTree != null) {
				var returnTree = "";

				if (getClassName(dataTree) === "Array") {
					var identifier = randomizeIdentifier();
					returnTree += "<span class=\"sc-propertyTree sc-expandTree\" rel=\"" + identifier + "\" >" + getClassName(dataTree) + " [" + dataTree.length + "]</span><ul class=\"detailTree\" id=\"" + identifier + "\">";
					for (var count = 0; count < dataTree.length; count++) {
						returnTree += "<li>[" + count + "] : " + generateObject(dataTree[count]) + "</li>";
					};
					returnTree += "</ul>";
				} else if (typeof dataTree == "object") {
					var identifier = randomizeIdentifier();
					returnTree += "<span class=\"sc-propertyTree sc-expandTree\" rel=\"" + identifier + "\" >" + getClassName(dataTree) + "</span><ul class=\"detailTree\" id=\"" + identifier + "\">";
					for (var key in dataTree) {
						returnTree += "<li>" + key + " : ";
						if(typeof dataTree[key] == "object"){
							returnTree += generateObject(dataTree[key]);
						}else{
							returnTree += typeof dataTree[key] == "string" ? "&quot;" + dataTree[key] + "&quot;" : dataTree[key];
						}
						returnTree += "</li>";
					};
					returnTree += "</ul>";
				} else {
					returnTree = typeof dataTree == "string" ? "&quot;" + dataTree + "&quot;" : dataTree;
				};
				return returnTree;
			};
			return 'undefined';
		};
		
		$(document).delegate('.sc-expandTree', 'click', function() {
			$("#" + $(this).attr("rel")).toggle();
			if( $(this).hasClass("sc-expandTree") ){
				$(this).removeClass("sc-expandTree");
				$(this).addClass("sc-retractTree");
			};
		}).delegate('.sc-retractTree', 'click', function() {
			$("#" + $(this).attr("rel")).toggle();
			if( $(this).hasClass("sc-retractTree") ){
				$(this).removeClass("sc-retractTree");
				$(this).addClass("sc-expandTree");
			};
		});
		
		scInElement.keydown(function(event) {
			if (event.keyCode == '13') {
				executeCode(scInElement.val());
				insertActualElement();
				moveToNewElement();
			}else if (event.keyCode == '38') { // up arrow
				if(typeof arrActual != 'undefined' ){
					backOneElement();
				}else if(scInElement.val() != ""){
					insertActualElement();
					backOneElement();
				};
			} else if (event.keyCode == '40') { // down arrow
				if(typeof arrActual != 'undefined' ){
					passOneElement();
				}else if(scInElement.val() != ""){
					insertActualElement();
					passOneElement();
				};
			};
		});
	};
})( jQuery );
