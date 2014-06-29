Ext.define('FIFA.view.GameFinish', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.gamefinishview',
    requires: ['Ext.field.Radio'],
    config: {
        layout: {
            type: 'vbox'
        },
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
                xtype:'fieldset',
                title: 'Choose Winner',
                items: [
                    {
                        xtype: 'radiofield',
                        name: 'winner',
                        labelWidth: '60%',
                        value: '1',
                        label: 'Team 1'
                    },
                    {
                        xtype: 'radiofield',
                        name: 'winner',
                        labelWidth: '60%',
                        value: '2',
                        label: 'Team 2'
                    },
                    {
                        xtype: 'radiofield',
                        name: 'winner',
                        labelWidth: '60%',
                        value: '0',
                        label: 'Draw'
                    }
                ]
            },
            {
                xtype:'panel',
                items: [
                    {
                        xtype: 'button',
                        text: 'Submit',
                        itemId: 'submitButton'
                    }
                ]
            }
        ],
        listeners: [
            {
                delegate: '#backButton',
                event: 'tap',
                fn: 'onBackButtonTap'
            },
            {
                delegate: '#submitButton',
                event: 'tap',
                fn: 'onSubmitButtonTap'
            }
        ]
    },
    onBackButtonTap: function () {
        FIFA.app.getController('FIFA.controller.MainMenu').navigateToCasino();
    },
    onSubmitButtonTap: function () {
        var me=this;
        var winnerGroup = this.up().query('radiofield');
        var winner = winnerGroup[0].getGroupValue();
                                                        
        var task = Ext.create('Ext.util.DelayedTask', function () {
            me.fireEvent('gameFinishCommand', winner);
        });
        task.delay(500);
    },
    showMessage: function(message) {
        Ext.Msg.show({
            title: message.message? message.message :message.result,
            showAnimation: 'slideIn',
            hideAnimation: 'slideOut'
        });
    }
});