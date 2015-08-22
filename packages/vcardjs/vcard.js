'use strict'

/*
	VCARD example.

BEGIN:VCARD\r\n,
VERSION:2.1\r\n,
N;LANGUAGE=es-uy:{{lastName}};{{name}}\r\n,
FN:{{name}} {{lastName}}\r\n,
ORG:{{company}}\r\n,
TITLE:{{position}}\r\n,
if (_.isArray(contact.phones) && contact.phones.length > 0)
	TEL;WORK;VOICE:{{workVoice}}\r\n
if (_.isArray(contact.phones) && contact.phones.length > 1)
	TEL;HOME;VOICE:{{homeVoice}}\r\n
if (_.isArray(contact.phones) && contact.phones.length > 2)
	TEL;CELL;VOICE:{{cellVoice}}\r\n
if (_.isArray(contact.addresses) && contact.addresses.length > 0)
	ADR;WORK;PREF:;;{{workStreet}};{{workCity}};{{workDep}};;Uruguay\r\n
	LABEL;WORK;PREF;ENCODING=QUOTED-PRINTABLE:{{workStreet}}=0D=0A=\r\n
	{{workCity}},=0D=0A=\r\n
if (_.isArray(contact.addresses) && contact.addresses.length > 1)
	ADR;HOME:;;{{homeStreet}};{{homeCity}};{{homeDep}};;Uruguay\r\n
	LABEL;HOME;ENCODING=QUOTED-PRINTABLE:{{homeStreet}}=0D=0A=\r\n
	{{homeCity}}  {{homeDep}}\r\n
if (_.isArray(contact.addresses) && contact.addresses.length > 1)
	ADR;POSTAL:;;{{postalStreet}},;{{postalCity}};{{postalDep}};;Uruguay\r\n
	LABEL;POSTAL;ENCODING=QUOTED-PRINTABLE:{{postalStreet}},=0D=0A=\r\n
	{{postalCity}}, {{postalDep}}\r\n
	X-MS-OL-DEFAULT-POSTAL-ADDRESS:2\r\n
if (_.isArray(contact.emails) && contact.emails.length > 0)
	EMAIL;PREF;INTERNET:{{prefEmail}}\r\n
if (_.isArray(contact.emails) && contact.emails.length > 1)
	EMAIL;INTERNET:{{secEmail}}\r\n
if (_.isArray(contact.emails) && contact.emails.length > 2)
	EMAIL;INTERNET:{{thirdEmail}}\r\n
END:VCARD\r\n
*/

var HEADER = [
	'BEGIN:VCARD\r\n',
	'VERSION:2.1\r\n'
].join('');

var DETAILS = [
	'N;LANGUAGE=es-uy:{{lastName}};{{name}}\r\n',
	'FN:{{name}} {{lastName}}\r\n',
	'ORG:{{company}}\r\n',
	'TITLE:{{position}}\r\n',
].join('');

var WORKVOICE = "TEL;WORK;VOICE:{{phone}}\r\n";
var HOMEVOICE = "TEL;HOME;VOICE:{{phone}}\r\n";
var CELLVOICE = "TEL;CELL;VOICE:{{phone}}\r\n";

var WORKADDRESS = [
	'ADR;WORK;PREF:;;{{street}};{{city}};{{dep}};;Uruguay\r\n',
	'LABEL;WORK;PREF;ENCODING=QUOTED-PRINTABLE:{{street}}=0D=0A=\r\n',
	'{{city}},=0D=0A=\r\n',
	'{{dep}}\r\n'
].join('');

var HOMEADDRESS = [
	'ADR;HOME:;;{{street}};{{city}};{{dep}};;Uruguay\r\n',
	'LABEL;HOME;ENCODING=QUOTED-PRINTABLE:{{street}}=0D=0A=\r\n',
	'{{city}}  {{dep}}\r\n'
].join('');

var POSTALADDRESS = [
	'ADR;POSTAL:;;{{street}},;{{city}};{{dep}};;Uruguay\r\n',
	'LABEL;POSTAL;ENCODING=QUOTED-PRINTABLE:{{street}},=0D=0A=\r\n',
	'{{city}}, {{dep}}\r\n',
	'X-MS-OL-DEFAULT-POSTAL-ADDRESS:2\r\n'
].join('');

var PREFEMAIL  = 'EMAIL;PREF;INTERNET:{{email}}\r\n';
var SECEMAIL   = 'EMAIL;INTERNET:{{email}}\r\n';
var THIRDEMAIL = 'EMAIL;INTERNET:{{email}}\r\n';

var FOOTER = 'END:VCARD\r\n';

function parseContactDetails(contact){
	return S(DETAILS).template(contact).s;
}

function parseContactPhones(contact){
	var result = '';
	if (_.isArray(contact.phones) && contact.phones.length > 0)
		result += S(WORKVOICE).template({phone: contact.phones[0]});
	if (_.isArray(contact.phones) && contact.phones.length > 1)
		result += S(HOMEVOICE).template({phone: contact.phones[1]});
	if (_.isArray(contact.phones) && contact.phones.length > 2)
		result += S(CELLVOICE).template({phone: contact.phones[2]});
	return result;
}

function parseContactAddesses(contact){
	var result = '';
	if (_.isArray(contact.addresses) && contact.addresses.length > 0)
		result += S(WORKADDRESS).template(contact.addresses[0]);
	if (_.isArray(contact.addresses) && contact.addresses.length > 1)
		result += S(HOMEADDRESS).template(contact.addresses[1]);
	if (_.isArray(contact.addresses) && contact.addresses.length > 2)
		result += S(POSTALADDRESS).template(contact.addresses[2]);
	return result;
}

function parseContactEmails(contact){
	var result = '';
	if (_.isArray(contact.emails) && contact.emails.length > 0)
		result += S(PREFEMAIL).template({email: contact.emails[0]});
	if (_.isArray(contact.emails) && contact.emails.length > 1)
		result += S(SECEMAIL).template({email: contact.emails[1]});
	if (_.isArray(contact.emails) && contact.emails.length > 2)
		result += S(THIRDEMAIL).template({email: contact.emails[2]});
	return result;
}

vCard = function(contact){
	return [
		HEADER,
		parseContactDetails(contact),
		parseContactPhones(contact),
		parseContactAddesses(contact),
		parseContactEmails(contact),
		FOOTER
	].join('');
}