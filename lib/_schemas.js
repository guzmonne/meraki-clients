/**
 * Schemas Namespace
 * @type {Object}
 */
Schemas = {};
/**
 * SimpleSchema's custom messages
 */
SimpleSchema.messages({
	required  : "[label] es requerido",
	maxString : "[label] no debe superar los [max] caracteres.",
	maxCount  : "No se pueden ingresar más de [max] [label].",
	regEx     : [
		{ exp: SimpleSchema.RegEx.Email, msg: "[label] debe ser una cuenta de correo valida" }
	]
});