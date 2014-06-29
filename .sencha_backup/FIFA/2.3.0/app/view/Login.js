Ext.define('FIFA.view.Login', {
    extend: 'Ext.form.Panel',
    alias: "widget.loginview",
    requires: ['Ext.form.FieldSet', 'Ext.form.Password', 
            'Ext.Label', 'Ext.Img', 'Ext.field.Email', 'Ext.util.DelayedTask'],
    config: {
        title: 'Login',
        items: [
            {
                xtype: 'titlebar',
                title: 'GUEZZ n WIN',
                docked: 'top'
            },
            {
                xtype: 'image',
                src: Ext.Viewport.getOrientation() == 'portrait' ? 'resources/icons/Login_p.png' : 'resources/icons/Login_l.png',
                style: Ext.Viewport.getOrientation() == 'portrait' ? 'width:80px;height:80px;margin:auto' : 'width:40px;height:40px;margin:auto'
            },
            {
                xtype: 'label',
                html: 'Login failed. Please enter the correct credentials.',
                itemId: 'signInFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:red;margin:5px 0px;'
            },
            {
                xtype: 'fieldset',
                title: 'User Login',
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Username',
                        itemId: 'userNameTextField',
                        name: 'userNameTextField',
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Password',
                        itemId: 'passwordTextField',
                        name: 'passwordTextField',
                        required: true
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'logInButton',
                ui: 'action',
                padding: '10px',
                text: 'Log In'
            },
            
            {
                xtype: 'panel',
                styleHtmlContent: true,
                html: '<div></div>'+
                    '<div>Not a user? Register with us</div>'
                
            },

            {
                xtype: 'panel',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'regAdminButton',
                        ui: 'action',
                        padding: '10px',
                        text: 'Admin Account',
                        flex: 2,
                        disabled:true,
                        cls: 'disabledButton'
                    },
                    {
                        xtype: 'panel',
                        html: '',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        itemId: 'regUserButton',
                        ui: 'action',
                        padding: '10px',
                        text: 'User Account',
                        flex: 2
                    }
                ]
            }
        ],
        listeners: [
            {
    		    delegate: '#logInButton',
    		    event: 'tap',
    		    fn: 'onLogInButtonTap'
		    },
            {
                delegate: '#regAdminButton',
                event: 'tap',
                fn: 'onRegAdminButtonTap'  
            },
            {
                delegate: '#regUserButton',
                event: 'tap',
                fn: 'onRegUserButtonTap'  
            }
        ]
    },
    onLogInButtonTap: function () {

	    var me = this;

	    var usernameField = me.down('#userNameTextField'),
	        passwordField = me.down('#passwordTextField'),
	        label = me.down('#signInFailedLabel');

	    label.hide();

	    var username = usernameField.getValue(),
	        password = passwordField.getValue();

	    var task = Ext.create('Ext.util.DelayedTask', function () {
	        me.fireEvent('signInCommand', me, username, password);

	        usernameField.setValue('');
	        passwordField.setValue('');
	    });

	    task.delay(500);
	},
	showSignInFailedMessage: function (message) {
	    /*var label = this.down('#signInFailedLabel');
	    label.setHtml(message);
	    label.show();*/
        Ext.Msg.show({
            title: message.result? message.result :message,
            showAnimation: 'slideIn',
            hideAnimation: 'slideOut'
        });
	},
    onRegAdminButtonTap: function () {
        console.log("will implement if you want to become an administrator. :P");
    },
    onRegUserButtonTap: function () {
        Ext.Viewport.animateActiveItem({xtype:'reguserview'}, {type: 'slide', direction: 'left'});
    }
});