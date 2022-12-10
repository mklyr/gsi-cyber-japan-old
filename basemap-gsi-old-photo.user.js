// ==UserScript==
// @id             iitc-plugin-basemap-gsioldphoto
// @name           IITC plugin: GSI map tiles Old Aerial Photos
// @category       Map Tiles
// @version        0.0.2
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL      https://github.com/mklyr/gsi-cyber-japan-old/raw/main/basemap-gsi-old-photo.user.js
// @downloadURL    https://github.com/mklyr/gsi-cyber-japan-old/raw/main/basemap-gsi-old-photo.user.js
// @description    IITCに国土地理院の過去の航空写真レイヤーを追加します
// @match          https://intel.ingress.com/*
// @grant          none
// ==/UserScript==

// use own namespace for plugin
function wrapper(plugin_info) {
    if(typeof window.plugin !== 'function') window.plugin = function() {};

    plugin_info.buildName = 'gsi-cyber-japan-oldphoto';
    plugin_info.dateTimeVersion = '20221210110100';
    plugin_info.pluginId = 'gsi-cyber-japan-oldphoto';

// use own namespace for plugin
window.plugin.mapTileGsiOldOrt = {
	addLayer: function() {

	  var gsioldOpt = {
		attribution: 'Map Data ©国土地理院',
		// https://maps.gsi.go.jp/development/ichiran.html
		maxNativeZoom: 17,
		maxZoom: 21,
	  };

	  var layers = {
		'https://cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg' : 'GSI OldOrt 1988',
		'https://cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg' : 'GSI OldOrt 1984',
		'https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg' : 'GSI OldOrt 1979',
		'https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg' : 'GSI OldOrt 1974',
		'https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png' : 'GSI OldOrt 1961',
		'https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png' : 'GSI OldOrt 1945'
	  };

	  for(var url in layers) {
		var layer = new L.TileLayer(url, gsioldOpt);
		layerChooser.addBaseLayer(layer, layers[url]);
	  }
	},
  };

  var setup =  window.plugin.mapTileGsiOldOrt.addLayer;

  setup.info = plugin_info; //add the script info data to the function as a property
  if(!window.bootPlugins) window.bootPlugins = [];
  window.bootPlugins.push(setup);
  // if IITC has already booted, immediately run the 'setup' function
  if(window.iitcLoaded && typeof setup === 'function') setup();
  } // wrapper end
  // inject code into site context
  var script = document.createElement('script');
  var info = {};
  if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
  script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
  (document.body || document.head || document.documentElement).appendChild(script);

