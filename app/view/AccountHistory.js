Ext.define('FIFA.view.AccountHistory', {
    extend: 'Ext.dataview.List',
    alias : 'widget.historyview',
    config: {
        itemId:'historylist',
        itemTpl: Ext.create('Ext.XTemplate', 
     		'<div>'+
            	'<div lass="historyrow">{id:this.matchDetails}</div>'+
            	'<div class="historyrow">{team1:this.teamDetails} <strong> {team1:this.amount}</strong> / {team2:this.teamDetails} <strong> {team2:this.amount}</strong> / Draw <strong> {draw}</strong></div>'+
            '</div>', {
            amount: function (item) {
                var items = item.split("-");
                return items[1];
            },
            teamDetails: function (item) {
            	var items = item.split("-");
                var team = FIFA.util.AppConfig.getTeam(items[0]);
                return team['name'];
            },
            matchDetails: function(item){
            	var matchStore = Ext.getStore('Matches');
                var match = matchStore.getAt(matchStore.find("id", item)).data; 
                var team1 = FIFA.util.AppConfig.getTeam(match.team1_id);
                var team2 = FIFA.util.AppConfig.getTeam(match.team2_id);
                return team1.name+ " VS "+team2.name;
            }
        })
    }
});