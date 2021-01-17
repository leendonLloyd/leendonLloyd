(function(funcName, baseObj) {
  "use strict";
  // The public function name defaults to window.docReady
  // but you can modify the last line of this function to pass in a different object or method name
  // if you want to put them in a different namespace and those will be used instead of 
  // window.docReady(...)
  funcName = funcName || "docReady";
  baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;
  function ready() {
      if (!readyFired) {
          readyFired = true;
          for (var i = 0; i < readyList.length; i++) {
              readyList[i].fn.call(window, readyList[i].ctx);
          }
          readyList = [];
      }
  }
  
  function readyStateChange() {
      if ( document.readyState === "complete" ) {
          ready();
      }
  }

  baseObj[funcName] = function(callback, context) {
      if (typeof callback !== "function") {
          throw new TypeError("callback for docReady(fn) must be a function");
      }
      if (readyFired) {
          setTimeout(function() {callback(context);}, 1);
          return;
      } else {
          readyList.push({fn: callback, ctx: context});
      }
      if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
          setTimeout(ready, 1);
      } else if (!readyEventHandlersInstalled) {
          if (document.addEventListener) {
              document.addEventListener("DOMContentLoaded", ready, false);
              window.addEventListener("load", ready, false);
          } else {
              document.attachEvent("onreadystatechange", readyStateChange);
              window.attachEvent("onload", ready);
          }
          readyEventHandlersInstalled = true;
      }
  }
})("docReady", window);

setTimeout(
  docReady(function() {
  document.body.classList.add('loaded');
}), 3000);

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const links = document.querySelectorAll('#menu li');
const burger = document.querySelector('.line');
const navbar = document.querySelector('nav');
const topButton =document.querySelector('#top-btn');

window.onscroll = ()=>{
  this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}

topButton.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');

  links.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `linkFade 0.3s ease forwards ${index / 5 + 0.5}s`;
    }
  });

  burger.classList.toggle('close');
});


var scene = document.getElementById('model');
var parallaxInstance = new Parallax(scene);

AOS.init();