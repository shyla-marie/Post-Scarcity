/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ngraph.merge@1.0.0";
exports.ids = ["vendor-chunks/ngraph.merge@1.0.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/ngraph.merge@1.0.0/node_modules/ngraph.merge/index.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/.pnpm/ngraph.merge@1.0.0/node_modules/ngraph.merge/index.js ***!
  \**********************************************************************************/
/***/ ((module) => {

eval("module.exports = merge;\n\n/**\n * Augments `target` with properties in `options`. Does not override\n * target's properties if they are defined and matches expected type in \n * options\n *\n * @returns {Object} merged object\n */\nfunction merge(target, options) {\n  var key;\n  if (!target) { target = {}; }\n  if (options) {\n    for (key in options) {\n      if (options.hasOwnProperty(key)) {\n        var targetHasIt = target.hasOwnProperty(key),\n            optionsValueType = typeof options[key],\n            shouldReplace = !targetHasIt || (typeof target[key] !== optionsValueType);\n\n        if (shouldReplace) {\n          target[key] = options[key];\n        } else if (optionsValueType === 'object') {\n          // go deep, don't care about loops here, we are simple API!:\n          target[key] = merge(target[key], options[key]);\n        }\n      }\n    }\n  }\n\n  return target;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vbmdyYXBoLm1lcmdlQDEuMC4wL25vZGVfbW9kdWxlcy9uZ3JhcGgubWVyZ2UvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbWFfcG9zdF9zY2FyY2l0eS8uL25vZGVfbW9kdWxlcy8ucG5wbS9uZ3JhcGgubWVyZ2VAMS4wLjAvbm9kZV9tb2R1bGVzL25ncmFwaC5tZXJnZS9pbmRleC5qcz9kZjIxIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7XG5cbi8qKlxuICogQXVnbWVudHMgYHRhcmdldGAgd2l0aCBwcm9wZXJ0aWVzIGluIGBvcHRpb25zYC4gRG9lcyBub3Qgb3ZlcnJpZGVcbiAqIHRhcmdldCdzIHByb3BlcnRpZXMgaWYgdGhleSBhcmUgZGVmaW5lZCBhbmQgbWF0Y2hlcyBleHBlY3RlZCB0eXBlIGluIFxuICogb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IG1lcmdlZCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBvcHRpb25zKSB7XG4gIHZhciBrZXk7XG4gIGlmICghdGFyZ2V0KSB7IHRhcmdldCA9IHt9OyB9XG4gIGlmIChvcHRpb25zKSB7XG4gICAgZm9yIChrZXkgaW4gb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB2YXIgdGFyZ2V0SGFzSXQgPSB0YXJnZXQuaGFzT3duUHJvcGVydHkoa2V5KSxcbiAgICAgICAgICAgIG9wdGlvbnNWYWx1ZVR5cGUgPSB0eXBlb2Ygb3B0aW9uc1trZXldLFxuICAgICAgICAgICAgc2hvdWxkUmVwbGFjZSA9ICF0YXJnZXRIYXNJdCB8fCAodHlwZW9mIHRhcmdldFtrZXldICE9PSBvcHRpb25zVmFsdWVUeXBlKTtcblxuICAgICAgICBpZiAoc2hvdWxkUmVwbGFjZSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnNWYWx1ZVR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgLy8gZ28gZGVlcCwgZG9uJ3QgY2FyZSBhYm91dCBsb29wcyBoZXJlLCB3ZSBhcmUgc2ltcGxlIEFQSSE6XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBtZXJnZSh0YXJnZXRba2V5XSwgb3B0aW9uc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/ngraph.merge@1.0.0/node_modules/ngraph.merge/index.js\n");

/***/ })

};
;