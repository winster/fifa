Ext.define('FIFA.model.Match', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'id',
            'stage',
            'venue_id',
            'team1_id',
            'team2_id',
            'kickoff'
        ]
    }
});