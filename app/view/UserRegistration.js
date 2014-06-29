Ext.define('FIFA.view.UserRegistration', {
    extend: 'Ext.form.Panel',
    alias: "widget.reguserview",
    config: {
        title: 'User UserRegistration',
        items: [
            {
                xtype: 'titlebar',
                title: 'GUEZZnWIN',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        text: 'back',
                        itemId: 'backButton',
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
                title: 'User Registration',
                items: [
                    {
                        xtype: 'emailfield',
                        placeHolder: 'Enter Email',
                        itemId: 'emailTextField',
                        placeHolder: 'you@guezz.com',
                        name: 'emailTextField',
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
                delegate: '#backButton',
                event: 'tap',
                fn: 'onBackButtonTap'
            }
        ]
    },
    onSubmitButtonTap: function () {

	    var me = this;

	    var emailField = me.down('#emailTextField');

	    var email = emailField.getValue();

	    var task = Ext.create('Ext.util.DelayedTask', function () {
            me.fireEvent('regUserCommand', me, email);
            emailField.setValue('');
	    });

	    task.delay(500);
	},

	showRegCallbackMessage: function (message) {
	    Ext.Msg.show({
            title: message.result? message.result :message,
            showAnimation: 'slideIn',
            hideAnimation: 'slideOut'
        });
	},

    onBackButtonTap: function () {
        Ext.Viewport.animateActiveItem({xtype:'loginview'}, {type: 'slide', direction: 'right'});
    }
});