// 天地图api方法封装
// 工具类

/**
 * 创建polygon
 * @param {*} points 多边形坐标 二维数组
 * @param {*} option 
 * @returns  返回polygon
 */
 function createPolygon(coors,option){
    console.log(coors, 'coors');
    let points=[];
    coors.forEach((lonlat)=>{
        points.push(new T.LngLat(lonlat[0], lonlat[1]));
    })
    console.log(points, 'points');
    return new T.Polygon(points,{
        color: option.lineColor||"#47D4DE", 
        weight:  option.lineWidth||1, 
        opacity:  option.lineOpacity||1, 
        fillColor: option.fillColor||"black", 
        fillOpacity: option.fillOpacity||1
    });
}

/**
 * 创建偏移polygon(适合做表现为立体效果的polygon)
 * @param {*} points 多边形坐标 二维数组
 * @param {*} option 
 * @returns 返回polygon
 */
 function createOffsetPolygon(coors,option){
    let points=[];
    coors.forEach((lonlat)=>{
        points.push(new T.LngLat(lonlat[0]-0.015, lonlat[1]-0.035));
    })
    return new T.Polygon(points,{
        color: option.lineColor||"#47D4DE", 
        weight:  option.lineWidth||1, 
        opacity:  option.lineOpacity||1, 
        fillColor: option.fillColor||"black", 
        fillOpacity: option.fillOpacity||1
    });
}
/**
 * 从featureCollection获取所有linestring
 * @param {*} featureCollection 
 * @returns  返回线段数组  let geometries=featureCollection.geometry.coordinates[0]
 */
function  getLinesFromGeojson(featureCollection){
    let lines=[];
    let features=featureCollection.features
    for(let i=0;i<features.length;i++){
        let geometry=features[i].geometry
        let type=geometry.type;
        if(type==="LineString"){
            let line=geometry.coordinates
            lines.push(line)
        }
        if(type==="MultiLineString"){
           let subLines=geometry.coordinates
           lines=lines.concat(subLines) 
        }
        if( type === "MultiPolygon") {
           let subLines=geometry.coordinates
           lines=lines.concat(subLines) 
        }
    }
    return lines
}
/**
 * 创建marker；默认或者自定义图片的marker
 * @param {*} coors 
 * @param {*} icon 
 * @returns 返回marker
 */
function createMarker(coors,icon){
    let marker= new T.Marker(new T.LngLat(coors[0],coors[1]));
    if(icon){
        //创建icon对象
        var icon = new T.Icon({
            iconUrl: icon.url,
            iconSize: new T.Point(icon.width, icon.height),
            iconAnchor: new T.Point(10, 25)
        });
        marker.setIcon(icon)
    }
    return marker
    
}
/**
 * 创建自定义覆盖物
 * @param {*} domId domid
 * @returns 返回覆盖物对象
 */
function createCustomOverlay(domId){
    var DefinedOverlay = T.Overlay.extend({
        initialize: function (lnglat,options) {
            this.lnglat = lnglat;
            this.setOptions(options);
        },
        onAdd: function (map) {
            this.map = map;
            this._div = document.getElementById(domId);
            map.getPanes().overlayPane.appendChild(this._div);
            this.update(this.lnglat);
        },
        onRemove: function () {
            var parent = this.div.parentNode;
            if (parent) {
                parent.removeChild(this.div);
                this.map = null;
                this.div = null;
            }
        },
        setLnglat: function (lnglat) {
            this.lnglat = lnglat;
            this.update();
        },
        getLnglat: function () {
            return this.lnglat;
        },
        setPos: function (pos) {
            this.lnglat = this.map.layerPointToLngLat(pos);
            this.update();
        },
        /**
         * 更新位置
         */
        update: function () {
            var pos = this.map.lngLatToLayerPoint(this.lnglat);
            this._div.style.top = ( pos.y -255) + "px";
            this._div.style.left = (pos.x - 135) + "px";
        }
    })
    return DefinedOverlay
}
/**
 * 创建右键菜单
 * @param Array menuList 显示的菜单列表 每一个{text:String, callback:Function}
 * @param {*} option
 * @returns 返回菜单
 */
function createContextMenu(menuList,options) {
    if(!Array.isArray(menuList)) {
        console.error('请传入数组')
        return
    }
      // 创建一个菜单
    const menu = new T.ContextMenu({
        width: 100,
        ...options
    });
    for (var i = 0; i < menuList.length; i++) {
        //添加菜单项
        var menuItem = new T.MenuItem(menuList[i].text, menuList[i].callback);
        menu.addItem(menuItem);
        if (i == 1) {
          //添加分割线
          menu.addSeparator();
        }
    }
    return menu
}
export default{
    createPolygon:createPolygon,
    createOffsetPolygon:createOffsetPolygon,
    getLinesFromGeojson:getLinesFromGeojson,
    createMarker:createMarker,
    createCustomOverlay:createCustomOverlay,
    createContextMenu
}