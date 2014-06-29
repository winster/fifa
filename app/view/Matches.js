Ext.define('FIFA.view.Matches', {
    extend: 'Ext.dataview.List',
    alias : 'widget.matchesview',
     
    config: {
    	store : 'Matches',
        itemId:'matchlist',
     	itemTpl: Ext.create('Ext.XTemplate', '<div class="match">'+
            '<div class="teamrow">'+
            '<div class="teamrowteam"><div class="{team1_id:this.className}"></div><span>{team1_id:this.teamName}</span></div>'+
            '<div class="teamrowmid"><span class="teamrowvs">Vs</span><span class="teamrowtime">@ {kickoff:this.timeIST}</span></div> '+
            '<div class="teamrowteam"><div class="{team2_id:this.className}"></div><span>{team2_id:this.teamName}</span></div>'+
            '</div>', {
            teamName: function (item) {
                var team = FIFA.util.AppConfig.getTeam(item);
                return team['name'];
            },
            venueName: function(item){
                var venue = FIFA.util.AppConfig.getVenue(item);
                return venue['name'];
            },
            className: function(item){
                var team = FIFA.util.AppConfig.getTeam(item);
                return team['code'].toLowerCase()+'_small';
            },
            timeIST: function(item){
                var dateBRT = new Date(item),
                dateIST = new Date(dateBRT.getTime()+(510*60*1000));
                return Ext.Date.format(dateIST, "Y-m-d H:i");
            }
        })
    },
    autoScroll: function(){
        var selected = this.getSelection()[0];
        if(selected) {
            this.select(selected);
        }

        var current_date = new Date(),
            date = Ext.Date.format(current_date, 'Y-m-d');
        var index = Ext.getStore('Matches').find("kickoff", date);        
        this.getScrollable().getScroller().scrollTo(0, index * 150);
                 
        for(var i=0;i<index;++i){
            this.getItemAt(i).addCls('oldgame');
        }    
    }
});