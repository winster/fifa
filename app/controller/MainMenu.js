Ext.define('FIFA.controller.MainMenu', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            mainMenuView: 'mainmenuview',
            accountView: 'myaccountview',
            accountHistoryView: 'historyview',
            matchView: 'matchesview',
            casinoView: 'casinoview',
            gameFinishView: 'gamefinishview'
        },
        
        stores : ['Matches', 'History'],
  		models : ['Match', 'History'],
        
        matchDetails: {},

        control: {            
            mainMenuView: {
	            getAccountCommand: 'getAccountCommand'
	        },
	        matchView: {
	        	itemtap: 'selectMatch'
	        },
	        casinoView: {
	        	betCommand: 'betCommand'
	        },
	        gameFinishView: {
	        	gameFinishCommand: 'gameFinishCommand'
	        }  
        }
    },
    
	getAccountCommand: function () {

	    var me = this;
	    var email = JSON.parse(localStorage.getItem('login')).userId;;

	    Ext.Ajax.request({
	        url: FIFA.util.AppConfig.config.baseUrl+'user/'+email,
	        method: 'get',
	        success: function (response) {
	        	var accountData = Ext.JSON.decode(response.responseText);
	        	me.getAccountView().updateData(accountData);
				var historyData = me.populateMatchListData(accountData.matchList);
				if(historyData && historyData.length>0) {
					me.getAccountHistoryView().setData(historyData);
				} else {
					me.getAccountHistoryView().hide();
				}
				me.getAccountHistoryView().refresh();
				Ext.Viewport.animateActiveItem(me.getAccountView(), { type: 'slide', direction: 'left' });
	        },
	        failure: function (response) {
	            console.log("failed to fetch account details");
	        }
	    });
	    
	},
	
	populateMatchListData: function(matchList){
		for(var i in matchList) {
			var match = matchList[i];
			var matchStore = Ext.getStore('Matches');
            var matchData = matchStore.getAt(matchStore.find("id", match.id)).data; 
			match.team1 = matchData.team1_id + "-"+match.team1;
			match.team2 = matchData.team2_id + "-"+match.team2;
			match.result = match.result==="1" ?matchData.team1_id 
							:(match.result==="2" ?matchData.team2_id :"result");
		}
		return matchList;
	},

	selectMatch: function(view, index, target, record, event){
		var me = this;
		Ext.Ajax.request({
	        url: FIFA.util.AppConfig.config.baseUrl+'match/'+record.data.id,
	        method: 'get',
	        success: function (response) {
	        	var message = Ext.JSON.decode(response.responseText);
	        	message.id=record.data.id;
				me.gotoMatch(message, record, true);
	        },
	        failure: function (response) {
				var message = Ext.JSON.decode(response.responseText);
				Ext.Msg.show({
		            title: message.result? message.result :message,
		            showAnimation: 'slideIn',
		            hideAnimation: 'slideOut'
		        });
	        }
	    });
	},

	gotoMatch: function(response, record, fresh){
		console.log('inside gotoMatch');
		if(fresh) {
			this.config.matchDetails.matchid=response.id, 
			this.config.matchDetails.kickoff=record.data.kickoff, 
			this.config.matchDetails.team1Details={
				'name':FIFA.util.AppConfig.getTeam(record.data.team1_id).name,
				'cls':FIFA.util.AppConfig.getTeam(record.data.team1_id).code.toLowerCase(),
				'total':response.team1total,
				'playercount':response.team1players
			}, 
			this.config.matchDetails.team2Details={
				'name':FIFA.util.AppConfig.getTeam(record.data.team2_id).name,
				'cls':FIFA.util.AppConfig.getTeam(record.data.team2_id).code.toLowerCase(),
				'total':response.team2total,
				'playercount':response.team2players
			}, 
			this.config.matchDetails.drawDetails={
				'cls': 'matchdraw',
				'total':response.drawtotal,
				'playercount':response.drawplayers
			}, 
			this.config.matchDetails.total = {
				'total':response.matchtotal,
				'playercount':response.matchplayers
			};
		}
		if(Ext.JSON.decode(localStorage.getItem('login')).admin){
			this.getCasinoView().getAt(0).down("#finishButton").show();	
		} else {
			this.getCasinoView().getAt(0).down("#finishButton").hide();	
		}
		this.getCasinoView().getAt(1).getAt(0).getAt(0).setData(this.config.matchDetails.total);
		this.getCasinoView().getAt(1).getAt(1).getAt(0).setData(this.config.matchDetails.team1Details);
		this.getCasinoView().getAt(1).getAt(1).getAt(1).setData(this.config.matchDetails.team1Details);
		this.getCasinoView().getAt(1).getAt(2).getAt(0).setData(this.config.matchDetails.team2Details);
		this.getCasinoView().getAt(1).getAt(2).getAt(1).setData(this.config.matchDetails.team2Details);
		this.getCasinoView().getAt(1).getAt(3).getAt(0).setData(this.config.matchDetails.drawDetails);
		this.getCasinoView().getAt(1).getAt(3).getAt(1).setData(this.config.matchDetails.drawDetails);

	    Ext.Viewport.animateActiveItem(this.getCasinoView(), { type: 'slide', direction: fresh ?'left' :'right' });

	},

	betCommand: function(team, betAmount){
		
		var me = this;
		if (!betAmount || betAmount.length === 0) {
	        me.getCasinoView().showMessage('Enter valid amount.');
	        return false;
	    }
	    var dateBRT = new Date(this.config.matchDetails.kickoff),
	    	dateIST = new Date(dateBRT.getTime()+(510*60*1000));

	    if(new Date().getTime() > dateIST.getTime() ) {
        	me.getCasinoView().showMessage("Sorry. Can't Guezz");
	        return false;	
        }

	    var email = JSON.parse(localStorage.getItem('login')).userId;

		Ext.Ajax.request({
	        url: FIFA.util.AppConfig.config.baseUrl+'match/bet',
	        method: 'post',
	        params: {
	        	match: this.config.matchDetails.matchid,
	        	username: email,
	            team: team,
	            amount: betAmount
	        },
	        success: function (response) {
	        	var message = Ext.JSON.decode(response.responseText);
				me.getCasinoView().showMessage(message);

				if(message.result==='success') {
					me.config.matchDetails.total.total = message.summary.matchtotal;
					me.config.matchDetails.total.playercount = message.summary.matchplayers;
					me.config.matchDetails.team1Details.total = message.summary.team1total;
					me.config.matchDetails.team1Details.playercount = message.summary.team1players;
					me.config.matchDetails.team2Details.total = message.summary.team2total;
					me.config.matchDetails.team2Details.playercount = message.summary.team2players;
					me.config.matchDetails.drawDetails.total = message.summary.drawtotal;
					me.config.matchDetails.drawDetails.playercount = message.summary.drawplayers;
					me.getCasinoView().getAt(1).getAt(0).getAt(0).setData(me.config.matchDetails.total);
					me.getCasinoView().getAt(1).getAt(1).getAt(0).setData(me.config.matchDetails.team1Details);
					me.getCasinoView().getAt(1).getAt(2).getAt(0).setData(me.config.matchDetails.team2Details);
					me.getCasinoView().getAt(1).getAt(3).getAt(0).setData(me.config.matchDetails.drawDetails);
				}
	        },
	        failure: function (response) {
				var message = Ext.JSON.decode(response.responseText);
				me.getCasinoView().showMessage(message);
	        }
	    });
	},

	navigateToCasino: function() {
		this.gotoMatch(null, null, false);
	},

	populateGameFinish: function(){
		this.getGameFinishView().query('radiofield')[0].setLabel(this.config.matchDetails.team1Details.name);
		this.getGameFinishView().query('radiofield')[0].setValue("1");
		this.getGameFinishView().query('radiofield')[1].setLabel(this.config.matchDetails.team2Details.name);
		this.getGameFinishView().query('radiofield')[1].setValue("2");
		this.getGameFinishView().query('radiofield')[2].setLabel("Match Drawn");
		this.getGameFinishView().query('radiofield')[2].setValue("0");
		Ext.Viewport.animateActiveItem(this.getGameFinishView(), {type: 'slide', direction: 'left'});        
	},

	gameFinishCommand: function(winner){
		var me=this;
        Ext.Ajax.request({
	        url: FIFA.util.AppConfig.config.baseUrl+'match/result',
	        method: 'post',
	        params: {
	        	match: this.config.matchDetails.matchid,
	        	winner: winner
	        },
	        success: function (response) {
	        	var message = Ext.JSON.decode(response.responseText);
				me.getGameFinishView().showMessage(message);
	        },
	        failure: function (response) {
				me.getGameFinishView().showMessage(response.statusText);
	        }
	    });	
	}

});