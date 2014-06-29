Ext.define('FIFA.controller.Login', {
	extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            mainMenuView: 'mainmenuview',
            regUserView: 'reguserview',
            matchListView: 'matchesview',
            changePwdView: 'changepwdview'
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand'
            },
	        mainMenuView: {
	            signOffCommand: 'onSignOffCommand'
	        },
	        regUserView: {
	        	regUserCommand: 'onRegUserCommand'
	        },
	        changePwdView: {
	        	changePwdCommand: 'onChangePwdCommand'
	        }
        },
        routes: {
	        'changepassword': 'showChangePasswordView'
	    }
    },

    onSignInCommand: function (view, username, password) {
	    var me = this,
	        loginView = me.getLoginView();

	    if (username.length === 0 || password.length === 0) {

	        loginView.showSignInFailedMessage('Please enter your username and password.');
	        return;
	    }
	    

	    Ext.Ajax.request({
	        url: FIFA.util.AppConfig.config.baseUrl+'user/login',
	        method: 'post',
	        params: {
	            user: username,
	            pwd: password
	        },
	        success: function (response) {

	            var loginResponse = Ext.JSON.decode(response.responseText);

	            if (loginResponse.result === "success") {
	               	localStorage.setItem('login', JSON.stringify(loginResponse));
        			me.signInSuccess(loginResponse);     
	            } else {
	                me.signInFailure(loginResponse.message);
	            }
	        },
	        failure: function (response) {
	            me.signInFailure('Login failed. Please try again later.');
	        }
	    });
	},

	signInSuccess: function (response) {
	    console.log('Signed in.');
		FIFA.util.AppConfig.init(response);
	    this.autoScroll();
	},

	signInFailure: function (message) {
	    var loginView = this.getLoginView();
	    loginView.showSignInFailedMessage(message);
	},

	onSignOffCommand: function () {

	    var me = this;

	    Ext.Ajax.request({
	        url: FIFA.util.AppConfig.config.baseUrl+'user/logoff',
	        method: 'post',
	        success: function (response) {
	         	Ext.Viewport.animateActiveItem(me.getLoginView(), { type: 'slide', direction: 'right' });
	         	localStorage.removeItem('login');
	        },
	        failure: function (response) {	        	
	        }
	    });	    
	},

	onRegUserCommand: function(view, email) {
	    var me = this,
	        regView = me.getRegUserView();

	    if (email.length === 0 || !this.isEmailValid(email)) {
	        regView.showRegCallbackMessage('Please enter valid email.');
	        return false;
	    }

	    Ext.Ajax.request({
	        url: FIFA.util.AppConfig.config.baseUrl+'user/register',
	        method: 'post',
	        params: {
	            email: email
	        },
	        success: function (response) {

	            var regResponse = Ext.JSON.decode(response.responseText);

	            if (regResponse.result === "success") {
	                regView.showRegCallbackMessage(regResponse); 
	            } else {
	                regView.showRegCallbackMessage(regResponse);
	            }
	        },
	        failure: function (response) {
	            regView.showRegCallbackMessage('Registration failed. Please try again later.');
	        }
	    });
	},

	isEmailValid: function (emailAdress) {
	    var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');
	    return EMAIL_REGEXP.test(emailAdress);
	},

	regUserSuccess: function(message) {
		var regView = this.getRegUserView();
	    regView.showRegCallbackMessage(message);
	},

	regUserFailure: function(message) {
	    var regView = this.getRegUserView();
	    regView.showRegCallbackMessage(message);
	}, 

	autoScroll: function(flag) {
		var loginView = this.getLoginView(),
	    	mainMenuView = this.getMainMenuView();	    	
	
	    Ext.Viewport.animateActiveItem(mainMenuView, { type: 'slide', direction: flag && flag=='left' ?'left' :'right' });
		this.getMatchListView().autoScroll();
	},

	onChangePwdCommand: function(view, email, pwd) {
	    var me = this,
	        changePwdView = me.getChangePwdView();

	    Ext.Ajax.request({
	        url: FIFA.util.AppConfig.config.baseUrl+'user/change',
	        method: 'post',
	        params: {
	            user: email,
	            pwd: pwd
	        },
	        success: function (response) {
	        	console.log("inside success");
	            var pwdResponse = Ext.JSON.decode(response.responseText);
				me.changePwdCallback(pwdResponse);	            
	        },
	        failure: function (response) {
	        	console.log("inside failure");
	            me.changePwdCallback('Registration failed. Please try again later.');
	        }
	    });
	},

	changePwdCallback: function(message) {
		var changePwdView = this.getChangePwdView();
	    changePwdView.showChangePwdCallbackMessage(message);
	},

	regUserFailure: function(message) {
	    var regView = this.getRegUserView();
	    regView.showRegCallbackMessage(message);
	},

    showChangePasswordView: function(){
    	Ext.Viewport.animateActiveItem({xtype: 'changepwdview'}, { type: 'slide', direction: 'left' });
    }
});