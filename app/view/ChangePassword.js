Ext.define('FIFA.view.ChangePassword', {
    extend: 'Ext.form.Panel',
    alias: "widget.changepwdview",
    config: {
        title: 'Change Password',
        items: [
            {
                xtype: 'titlebar',
                title: 'GUEZZnWIN',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        text: 'home',
                        itemId: 'homeButton',
                        align: 'left'
                    }
                ]
            },

            {
                xtype: 'image',
                src: 'resources/icons/Login_l.png',
                style: 'width:40px;height:40px;margin:auto'
            },

            {
                xtype: 'fieldset',
                title: 'Change Password',
                items: [
                    {
                        xtype: 'emailfield',
                        placeHolder: 'Enter Email',
                        itemId: 'emailTextField',
                        name: 'emailTextField',
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Enter Password',
                        itemId: 'pwdTextField',
                        name: 'pwdTextField',
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Re-enter Password',
                        itemId: 'pwdTextField1',
                        name: 'pwdTextField1',
                        required: true
                    }
                ]
            },

            {
                xtype: 'button',
                itemId: 'submitButton',
                ui: 'action',
                padding: '10px',
                text: 'Submit'
            }
        ],
        listeners: [
            {
    		    delegate: '#submitButton',
    		    event: 'tap',
    		    fn: 'onSubmitButtonTap'
		    },
            {
                delegate: '#homeButton',
                event: 'tap',
                fn: 'onHomeButtonTap'
            }
        ]
    },
    onSubmitButtonTap: function () {

	    var me = this;

	    var emailField = me.down('#emailTextField'),
            pwdField = me.down('#pwdTextField'),
            pwdField1 = me.down('#pwdTextField1');

	    var email = emailField.getValue(),
            pwd = pwdField.getValue(),
            pwd1 = pwdField1.getValue();

        if (email.length === 0) {
            this.showChangePwdCallbackMessage('Please enter valid email.');
            return false;
        }

        if(pwd!==pwd1) {
            this.showChangePwdCallbackMessage("Password mismatch");
            return false;
        }
	    var task = Ext.create('Ext.util.DelayedTask', function () {
	        
	        me.fireEvent('changePwdCommand', me, email, pwd);

	        pwdField.setValue('');
            pwdField1.setValue('');
	    });

	    task.delay(500);
	},

	showChangePwdCallbackMessage: function (message) {
	    Ext.Msg.show({
            title: message.result? message.result :message,
            showAnimation: 'slideIn',
            hideAnimation: 'slideOut'
        });
	},

    onHomeButtonTap: function () {
        window.location='http://guezznwin.appspot.com/';
    }
});