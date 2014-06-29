Ext.define('FIFA.view.Casino', {
    extend: 'Ext.Panel',
    requires: ['Ext.TitleBar'],
    alias: 'widget.casinoview',
    config: {
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        scrollable: true,
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
                    },
                    {
                        xtype: 'button',
                        text: 'Finish',
                        hidden: true,
                        itemId: 'finishButton',
                        align: 'right'
                    }
                ]
            },
            {
                layout: {
                    type: 'vbox'
                },
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'panel',
                                styleHtmlContent: true,
                                tpl: [
                                    "<h3 class='total'>Total Points: {total}</h3>"+
                                    "<h3 class='players'>Total Guezzers: {playercount}</h3>"
                                ]
                            }
                        ],
                        cls: 'casinoheader'
                    },
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'panel',
                                styleHtmlContent: true,
                                tpl: [
                                    "<h2 class='teamname'>{name}</h2>"+
                                    "<h3 class='total'>Total Points : {total}</h3>"+
                                    "<h3 class='players'>Guezzers: {playercount}</h3>"+
                                    "<button class='betbtn'>Guezz</button>"
                                ]
                            },
                            {
                                xtype: 'panel',
                                styleHtmlContent: true,
                                tpl: [
                                    "<div class='{cls}'><h1>BET</h1></div>"
                                ]
                            }
                        ],
                        cls: 'hand teamcontainer',
                        listeners: {
                            tap: {
                                fn: function(event, node, options, eOpts) {
                                    var panel=Ext.create('Ext.Panel',{
                                        left: '10%',
                                        top: '10%',
                                        modal: true,
                                        hideOnMaskTap: true,
                                        hidden: true,   
                                        width: '80%',
                                        height:'33%' ,
                                        styleHtmlContent: true,
                                        
                                        items: [
                                            {
                                                docked: 'top',
                                                xtype: 'titlebar',
                                                title: 'GUEZZ for '+FIFA.app.getController('FIFA.controller.MainMenu').config.matchDetails.team1Details.name
                                            },
                                            {
                                                xtype: 'numberfield',
                                                placeHolder: 'Enter points',
                                                itemId: 'team1Amount',
                                                name: 'amountTextField',
                                                required: true
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'team1SubmitButton',
                                                margin: '10%',
                                                text: 'Submit',
                                                listeners: {
                                                    tap: function(a, b, c, d) {
                                                        var team1AmountField = this.up('panel').down('#team1Amount');
                                                        var team1Amount = team1AmountField.getValue();
                                                        var task = Ext.create('Ext.util.DelayedTask', function () {
                                                            FIFA.app.getController('FIFA.controller.MainMenu').betCommand("1", team1Amount);
                                                        });
                                                        task.delay(500);

                                                        team1AmountField.setValue('');
                                                        this.up('panel').destroy();
                                                    }
                                                }
                                            }
                                        ]
                                    });
                                    Ext.Viewport.add(panel);
                                    panel.showBy(Ext.get(node));
                                },
                                element: 'element'
                            }   
                        }
                    },
                    {
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'panel',
                                styleHtmlContent: true,
                                tpl: [
                                    "<h2 class='teamname'>{name}</h2>"+
                                    "<h3 class='total'>Total Points: {total}</h3>"+
                                    "<h3 class='players'>Guezzers: {playercount}</h3>"+
                                    "<button class='betbtn'>Guezz</button>"
                                ]
                            },
                            {
                                xtype: 'panel',
                                styleHtmlContent: true,
                                tpl: [
                                    "<div class='{cls}'><h1>BET</h1></div>"
                                ]
                            }
                        ],
                        cls: 'hand teamcontainer',
                        listeners: {
                            tap: {
                                fn: function(event, node, options, eOpts) {
                                    var panel=Ext.create('Ext.Panel',{
                                        left: '10%',
                                        top: '10%',
                                        modal: true,
                                        hideOnMaskTap: true,
                                        hidden: true,   
                                        width: '80%',
                                        height:'33%' ,
                                        styleHtmlContent: true,
                                        
                                        items: [
                                            {
                                                docked: 'top',
                                                xtype: 'titlebar',
                                                title: 'GUEZZ for '+FIFA.app.getController('FIFA.controller.MainMenu').config.matchDetails.team2Details.name
                                            },
                                            {
                                                xtype: 'numberfield',
                                                placeHolder: 'Enter Points',
                                                itemId: 'team2Amount',
                                                name: 'amountTextField',
                                                required: true
                                            },
                                            {
                                                xtype: 'button',
                                                itemId: 'team2SubmitButton',
                                                margin: '10%',
                                                text: 'Submit',
                                                listeners: {
                                                    tap: function(a, b, c, d) {
                                                        var team2AmountField = this.up('panel').down('#team2Amount');
                                                        var team2Amount = team2AmountField.getValue();
                                                        var task = Ext.create('Ext.util.DelayedTask', function () {
                                                            FIFA.app.getController('FIFA.controller.MainMenu').betCommand("2", team2Amount);
                                                        });
                                                        task.delay(500);
                                                        
                                                        team2AmountField.setValue('');
                                                        this.up('panel').destroy();
                                                    }
                                                }
                                            }
                                        ]
                                    });
                                    Ext.Viewport.add(panel);
                                    panel.showBy(Ext.get(node));
                                },
                                element: 'element'
                            }   
                        }
                    },
                    {
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'panel',
                                styleHtmlContent: true,
                                tpl: [
                                    '<h2 class="teamname">Match Draw</h2>'+
                                    '<h3 class="total">Total Points: {total}</h3>'+
                                    "<h3 class='players'>Guezzers: {playercount}</h3>"+
                                    "<button class='betbtn'>Guezz</button>"
                                ]
                            },
                            {
                                xtype: 'panel',
                                styleHtmlContent: true,
                                tpl: [
                                    "<div class='{cls}'></div>"
                                ]
                            }
                        ],
                        cls: 'hand',
                        listeners: {
                            tap: {
                                fn: function(event, node, options, eOpts) {
                                    var panel=Ext.create('Ext.Panel',{
                                        left: '10%',
                                        top: '10%',
                                        modal: true,
                                        hideOnMaskTap: true,
                                        hidden: true,   
                                        width: '80%',
                                        height:'33%' ,
                                        styleHtmlContent: true,
                                        
                                        items: [
                                            {
                                                docked: 'top',
                                                xtype: 'titlebar',
                                                title: 'GUEZZ a Draw'
                                            },
                                            {
                                                xtype: 'numberfield',
                                                placeHolder: 'Enter Points',
                                                itemId: 'drawnAmount',
                                                name: 'amountTextField',
                                                required: true
                                            },
                                            {
                                                xtype: 'button',
                                                itemId: 'drawnSubmitButton',
                                                margin: '10%',
                                                text: 'Submit',
                                                listeners: {
                                                    tap: function(a, b, c, d) {
                                                        var drawnAmountField = this.up('panel').down('#drawnAmount');
                                                        var drawnAmount = drawnAmountField.getValue();
                                                        var task = Ext.create('Ext.util.DelayedTask', function () {
                                                            FIFA.app.getController('FIFA.controller.MainMenu').betCommand('0', drawnAmount);
                                                        });
                                                        task.delay(500);                                                        
                                                        drawnAmountField.setValue('');
                                                        this.up('panel').destroy();
                                                    }
                                                }
                                            }
                                        ]
                                    });
                                    Ext.Viewport.add(panel);
                                    panel.showBy(Ext.get(node));
                                },
                                element: 'element'
                            },
                            scope: this   
                        }
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
                delegate: '#finishButton',
                event: 'tap',
                fn: 'onFinishButtonTap'
            }
        ]
    },
    
    onBackButtonTap: function () {
        Ext.Viewport.animateActiveItem({xtype:'mainmenuview'}, {type: 'slide', direction: 'right'});
        FIFA.app.getController('FIFA.controller.Login').autoScroll('right');
    },

    onFinishButtonTap: function () {
        FIFA.app.getController('FIFA.controller.MainMenu').populateGameFinish();
    },

    showMessage: function (message) {
        Ext.Msg.show({
            title: message.result? message.result :message,
            showAnimation: 'slideIn',
            hideAnimation: 'slideOut'
        });
    }
});