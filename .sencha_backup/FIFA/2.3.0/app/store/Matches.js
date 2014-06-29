Ext.define('FIFA.store.Matches', {
    extend: 'Ext.data.Store',
     
    config: {
        model: 'FIFA.model.Match',
        autoLoad: true,        
        proxy: {
            type: 'ajax',
            url: 'resources/json/Match.json',
            reader: {
                type: 'json',
                totalProperty: 'totalCount',
                rootProperty: 'data',
                successProperty: 'success'
            }
        }
    }
});