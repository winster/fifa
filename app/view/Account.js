Ext.define('FIFA.view.Account', {
    extend: 'Ext.Panel',
    alias: 'widget.myaccountview',
     
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
                xtype: 'fieldset',
                title: 'User Details & History',
                items: [
                    {
                        xtype: 'panel',
                        itemId: 'accountdetails',
                        styleHtmlContent: true,
                        tpl: [
                            '<div class="accountrow">User Name: {email}</div>'+
                            '<div class="accountrow">Account Balance: {balance}</div>'
                        ]
                    }            
                ],
                flex: 0
            },            
            {
                xtype: 'historyview',
                flex: 1
            }
        ],
        listeners: [
            {
                delegate: '#backButton',
                event: 'tap',
                fn: 'onBackButtonTap'
            }
        ]
    },
    onBackButtonTap: function () {
        FIFA.app.getController('FIFA.controller.Login').autoScroll('right');                                                        
    },
    updateData: function(data){
        this.callParent(arguments);
        var element = this.down('#accountdetails');
        element.setData(data.user);
    }
});