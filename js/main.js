var data; 
var initMap = ()=>{};
fetch('property.json')
.then((data)=> data.json())
.then(function (result){
    data=result.Address.Coordinates;
    // Load header => Name and Address
    const name = document.getElementById('name');
    const address = document.getElementById('address');
    name.innerText = result.Name;
    address.innerText = result.Address.Location;
    // Load Picture
    const pic = document.getElementById('pic');
    var img = document.createElement('img');
    img.src = result.Picture;
    pic.appendChild(img);
    // Load Info List, Property Details
    const list = document.getElementById('list');
    append(list.children[0], result.PropertyType, {el:'span'});
    append(list.children[1], result.TotalBuildingArea, {el:'span'});
    append(list.children[2], result.Tenancy, {el:'span'});
    append(list.children[3], result.NumTenant, {el:'span'});
    append(list.children[4], result.Website, {el:'a', href: '//'+result.Website});
    append(list.children[5], result.PropertyClass, {el:'span'});
    append(list.children[6], result.Year, {el:'span'});
    append(list.children[7], result.Floors, {el:'span'});
    // Load Description
    const desc = document.getElementById('desc');
    desc.innerHTML = `<b class="sb">Description: </b>${result.Description}`;
    // Load Table Availabilities
    document.querySelector('.rec').innerHTML = `${result.Avaibility.length} records`;
    const tbody = document.querySelector('.table>tbody');
    result.Avaibility.forEach((val)=>{
        var tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${val.UnitNN}</td>
        <td>${val.RecordType}</td>
        <td>${val.Area}</td>`;
        tbody.appendChild(tr);
    })
    
})
//Google Map
setTimeout(function initMap() {
    var coor = {lat: data[0], lng: data[1]};
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: coor});
    var marker = new google.maps.Marker({position: coor, map: map});
},0);

function append(parent, data , child){
    var el = document.createElement(child.el);
    el.href = child.href? child.href : null;
    el.innerHTML = data;
    parent.appendChild(el);
}