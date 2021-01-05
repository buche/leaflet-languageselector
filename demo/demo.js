"use strict";

function main() {
  let map = L.map('map', {
    zoomControl: false
  }).setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


  let languageArray = [
    L.langObject('de', 'Deutsch'),
    L.langObject('en', 'English'),
    L.langObject('eo', 'Esperanto'),
    L.langObject('fi', 'Suomi'),
    L.langObject('fr', 'Français'),
    L.langObject('ru', 'Русский')
  ];
  let languageArrayWithIcons = [
    L.langObject('de', 'Deutsch',   '../images/de.svg'),
    L.langObject('en', 'English',   '../images/en.svg'),
    L.langObject('eo', 'Esperanto', '../images/eo.svg'),
    L.langObject('fi', 'Suomi',     '../images/fi.svg'),
    L.langObject('fr', 'Français',  '../images/fr.svg'),
    L.langObject('ru', 'Русский',   '../images/ru.svg')
  ];

  // Add horizontal versions as button
  L.languageSelector({
    languages: languageArray,
    callback: changeLanguage,
    title: 'Language',
    vertical: false,
    position: 'topleft',
    button: true
  }).addTo(map);
  L.languageSelector({
    languages: languageArray,
    callback: changeLanguage,
    vertical: false,
    position: 'topleft',
    button: true
  }).addTo(map);
  L.languageSelector({
    languages: languageArrayWithIcons,
    callback: changeLanguage,
    title: 'Language',
    vertical: false,
    position: 'topleft',
    button: true
  }).addTo(map);
  L.languageSelector({
    languages: languageArrayWithIcons,
    callback: changeLanguage,
    vertical: false,
    position: 'topleft',
    button: true
  }).addTo(map);

  // Add vertical versions as button 
  L.languageSelector({
    languages: languageArray,
    callback: changeLanguage,
    title: 'Language',
    vertical: true,
    position: 'topleft',
    button: true
  }).addTo(map);
  L.languageSelector({
    languages: languageArray,
    callback: changeLanguage,
    vertical: true,
    position: 'topleft',
    button: true
  }).addTo(map);
  L.languageSelector({
    languages: languageArrayWithIcons,
    callback: changeLanguage,
    title: 'Language',
    vertical: true,
    position: 'topleft',
    button: true
  }).addTo(map);
  L.languageSelector({
    languages: languageArrayWithIcons,
    callback: changeLanguage,
    vertical: true,
    position: 'topleft',
    button: true
  }).addTo(map);

  // Add vertical versions without button
  L.languageSelector({
    languages: languageArray,
    callback: changeLanguage,
    vertical: true,
    position: 'topright',
    button: false
  }).addTo(map);
  L.languageSelector({
    languages: languageArray,
    callback: changeLanguage,
    title: 'Language',
    vertical: true,
    position: 'topright',
    button: false
  }).addTo(map);
  L.languageSelector({
    languages: languageArrayWithIcons,
    callback: changeLanguage,
    vertical: true,
    position: 'topright',
    button: false
  }).addTo(map);
  L.languageSelector({
    languages: languageArrayWithIcons,
    callback: changeLanguage,
    title: 'Language',
    vertical: true,
    position: 'topright',
    button: false
  }).addTo(map);

  // Add horizontal versions without button
  L.languageSelector({
    languages: languageArray,
    callback: changeLanguage,
    vertical: false,
    position: 'bottomleft',
    button: false
  }).addTo(map);
  L.languageSelector({
    languages: languageArray,
    callback: changeLanguage,
    title: 'Language',
    vertical: false,
    position: 'bottomleft',
    button: false
  }).addTo(map);
  L.languageSelector({
    languages: languageArrayWithIcons,
    callback: changeLanguage,
    vertical: false,
    position: 'bottomleft',
    button: false
  }).addTo(map);
  L.languageSelector({
    languages: languageArrayWithIcons,
    callback: changeLanguage,
    title: 'Language',
    vertical: false,
    position: 'bottomleft',
    button: false
  }).addTo(map);

}

/**
 * Add or replace the language parameter of the URL and reload the page.
 * @param String id of the language
 */
function changeLanguage(selectedLanguage) {
  window.location.href = updateURLParameter(window.location.href, 'lang', selectedLanguage);
}

/**
 * Add or replace a parameter (with value) in the given URL.
 * @param String url the URL
 * @param String param the parameter
 * @param String paramVal the value of the parameter
 * @return String the changed URL
 */
function updateURLParameter(url, param, paramVal) {
  let theAnchor = null;
  let newAdditionalURL = "";
  let tempArray = url.split("?");
  let baseURL = tempArray[0];
  let additionalURL = tempArray[1];
  let temp = "";

  if (additionalURL) {
    let tmpAnchor = additionalURL.split("#");
    let theParams = tmpAnchor[0];
    theAnchor = tmpAnchor[1];
    if (theAnchor) {
      additionalURL = theParams;
    }

    tempArray = additionalURL.split("&");

    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] != param) {
        newAdditionalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  } else {
    let tmpAnchor = baseURL.split("#");
    let theParams = tmpAnchor[0];
    theAnchor = tmpAnchor[1];

    if (theParams) {
      baseURL = theParams;
    }
  }

  if (theAnchor) {
    paramVal += "#" + theAnchor;
  }

  let rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
}


main();
