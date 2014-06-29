Ext.define('FIFA.view.MainMenu', {
    extend: 'Ext.Panel',
    requires: ['Ext.TitleBar'],
    alias: 'widget.mainmenuview',
    config: {
        layout: {
            type: 'fit'
        },
		items: [
			{
			    xtype: 'titlebar',
			    title: 'BATTLES',
			    docked: 'top',
			    items: [
			        {
			            xtype: 'button',
			            text: 'Log Off',
			            itemId: 'logOffButton',
			            align: 'left'
			        },
			        {
			            xtype: 'button',
			            text: 'My Account',
			            itemId: 'accountButton',
			            align: 'right'
			        }
			    ]
			},
			{
			    xtype: 'matchesview',
			    itemId: 'matchlist'			            
			}
		],
		listeners: [
			{
			    delegate: '#logOffButton',
			    event: 'tap',
			    fn: 'onLogOffButtonTap'
			},
			{
			    delegate: '#accountButton',
			    event: 'tap',
			    fn: 'onAccountButtonTap'
			}
		]
    },
    onLogOffButtonTap: function () {
	    this.fireEvent('signOffCommand');
	},
    onAccountButtonTap: function () {
	    this.fireEvent('getAccountCommand');
	}
});