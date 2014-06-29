Ext.define('FIFA.util.AppConfig', {
    singleton : true,
 
    requires: [ 'Ext.Ajax'],
    config : {
        /*baseUrl : 'http://localhost:8080/GUEZZ/',*/
        baseUrl : 'http://fifawinster.herokuapp.com/',
        /*resourceUrl: 'http://localhost/resources/',*/
        groups: {},
        teams: {},
        venues:{},
        teambrackets:{},
        animationType : 'slide',
        animationDuration : 100
    },

    constructor : function(config) {
        this.initConfig(config);
        this.callParent([config]);
        this.init();
    },

    init: function () {
        this.loadGroups();
        this.loadTeams();
        this.loadVenues();
        /*this.loadTeamBrackets();*/
    },

    getTeam: function(teamId) {
        var teams = this.teams['data'];
        for(var index in teams) {
            if(teams[index]['id']==teamId){
              return teams[index];
            }
        }
    },

    getVenue: function(venueId) {
        var venues = this.venues['data'];
        for(var index in venues) {
            if(venues[index]['id']==venueId){
              return venues[index];
            }
        }
    },

    loadGroups: function(){
        var me=this;
        Ext.Ajax.request({
            url: 'resources/json/Group.json',
            method: 'get',
            success: function (response) {
                me.groups = Ext.JSON.decode(response.responseText);
            },
            failure: function (response) {
                console.log("failed to load groups");
            }
        });     
    },

    loadTeams: function(){
      var me=this;
        Ext.Ajax.request({
            url: 'resources/json/Team.json',
            method: 'get',
            success: function (response) {
                me.teams = Ext.JSON.decode(response.responseText);
            },
            failure: function (response) {
              console.log("failed to load teams");
            }
        });     
    },


    loadVenues: function(){
      var me=this;
        Ext.Ajax.request({
            url: 'resources/json/Venue.json',
            method: 'get',
            success: function (response) {
                me.venues = Ext.JSON.decode(response.responseText);
            },
            failure: function (response) {
              console.log("failed to load venues");
            }
        });     
    },


    loadTeamBrackets: function(){
      var me=this;
        Ext.Ajax.request({
            url: 'resources/json/Team_bracket.json',
            method: 'get',
            success: function (response) {
                me.teambrackets = Ext.JSON.decode(response.responseText);
            },
            failure: function (response) {
              console.log("failed to load team brackes");
            }
        });     
    }
});
   