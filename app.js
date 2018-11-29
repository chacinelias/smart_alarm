var fetch = require('node-fetch');
var moment = require('moment');

//create moments
var arrival_time = moment('2018-11-30 09:30');          //time I want to arrive at
var get_ready_time = moment.duration(1800, 'seconds');  //half an hour to get ready
var commute_time;                                       //API supplied commute time
var alarm_time;
// var now = moment();

//callback with promise
function getCommuteTime(trip){
    commute_time = moment.duration(trip, 'seconds');
    console.log("\ncommute time (in minutes): " + commute_time.asMinutes());

    alarm_time = moment(arrival_time);
    alarm_time.subtract(get_ready_time).subtract(commute_time);

    console.log("\narrival time: " + arrival_time.format('LT'));
    console.log("\nalarm time:" + alarm_time.format('LT') + "\n");
}

//URL construction
var service = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
var key = '&[ACCESS KEY HERE]';
var origins = '&[ORIGIN HERE]';
var destinations = '&[DESTINATION HERE]';
var departure_time = '&departure_time=' + arrival_time.valueOf();
 
var url = service + key + origins + destinations + departure_time; // + '&traffic_model=pessimistic'

//console.log(url);

fetch(url)
    .then(resp => resp.json())
    .then(json => getCommuteTime(json.rows[0].elements[0].duration_in_traffic.value))
    .catch(error => console.log(error));


//TODO: find a way to find alarm-time with accurate commute_time (currently using arrival_time to query API)
//TODO: add transit_mode to url in order to specify the preffered mode of transit (car, train, bus, bike)
//TODO: add alarm function
//TODO: add refresh_alarm function which changes the arrival_time to next day same time