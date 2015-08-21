AccountsTemplates.configure({
    // Behavior
    //confirmPassword             : true,
    //enablePasswordChange        : true,
    forbidClientAccountCreation : true,
    //overrideLoginErrors         : true,
    //sendVerificationEmail       : false,
    //lowercaseUsername           : false,
    //focusFirstInput             : true,

    // Appearance
    //showAddRemoveServices           : false,
    //showForgotPasswordLink          : false,
    //showLabels                      : true,
    //showPlaceholders                : true,
    //showResendVerificationEmailLink : false,

    // Client-side Validation
    //continuousValidation : false,
    //negativeFeedback     : false,
    //negativeValidation   : true,
    //positiveValidation   : true,
    //positiveFeedback     : true,
    //showValidating       : true,

    // Privacy Policy and Terms of Use
    //privacyUrl : 'privacy',
    //termsUrl   : 'terms-of-use',

    // Redirects
    //homeRoutePath   : '/login',
    //redirectTimeout : 4000,

    // Hooks
    onLogoutHook  : function(){
        console.log('Am I being called?')
        if (window)
            window.location = '/login';
    },
    onSubmitHook  : function(){
        console.log('Am I being called?')
        if (window)
            window.location = '/meraki_clients';
    },
    //preSignUpHook : myPreSubmitFunc,

    // Texts
    texts: {
      title: {
        changePwd     : "Cambiar Password",
        enrollAccount : "Nueva Cuenta",
        forgotPwd     : "Recuperación de Password",
        resetPwd      : "Reinciar Password",
        signIn        : "Iniciar Sesión",
        signUp        : "Registro",
        verifyEmail   : "Verificar Email"
      },
      button: {
        changePwd     : "Cambiar Password",
        enrollAccount : "Registro",
        forgotPwd     : "Recuperar Password",
        resetPwd      : "Reinciar Password",
        signIn        : "Iniciar Sesión",
        signUp        : "Registrar",
      }
    },
});