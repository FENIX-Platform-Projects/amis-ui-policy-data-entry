define(['underscore'], function(_) {
    return {
        "dbName": "FMD",
        "dbCollectionData": "survey",
        "dbCollectionSchemas": "schemas",

        //"reportPdfUrl": "http://fenixapps2.fao.org:10100/fenixExport",
        //"reportPdfUrl": "http://fenixapps2.fao.org:101000/fenixExport",
        //"reportPdfUrl": "http://kalimaha-fao.device.fao.org:8080",
        "reportPdfUrl": "http://fenixapps2.fao.org/fenixExport",

        "sections": (function() {
            //var secs = _.map(_.range(1, 17), function(i) {
            var secs = _.map(_.range(1, 2), function(i) {
                return 'cat'+i;
            });
            //HIDDEN SECTIONS
            return secs;//_.without(secs,'cat11');
        })(),

        "wmsUrl": "http://fenixapps2.fao.org/geoserver-demo",
        "sldUrl": "http://fenixapps2.fao.org/geoservices/CSS2SLD",

        "url_geoserver_wms": "http://fenix.fao.org/geoserver",
        "url_bbox": "http://fenix.fao.org/geo/fenix/spatialquery/db/spatial/bbox/",
        "url_spatialquery": "http://fenix.fao.org/geo/fenix/spatialquery/db/spatial/query/",

        "url_spatialquery_enc": "http://fenix.fao.org/geo/fenix/spatialquery/db/spatial/query/<%= sql %>?geojsonEncoding=True",

        "url_geocoding": "http://fenix.fao.org/geo/fenix/geocoding/latlon/",
        "url_esrilayer": "http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.png",
        "url_baselayer": "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        "url_osmlayer": "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        "map_attribution": "&copy; <a href='http://www.openstreetmap.org/copyright'>OSM contrib</a>"
    };
});
