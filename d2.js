		// E2 
const prompt = require('prompt');
prompt.start();
prompt.get(['hotelId', 'roomNo', 'guestId', 'startDate', 'endDate'], function(err, result){
	if (!err)
	{
		function getInfo(_hotelId, _roomNo, _guestId, _startDate, _endDate, callback)
		{
			var src = ['hotelId', 'roomNo', 'guestId', 'startDate', 'endDate'];
			
			connection.query('SELECT ?? from booking WHERE hotelId = ? OR roomNo = ? OR guestId = ? OR startDate = ? OR endDate = ?', [src, _hotelId, _roomNo, _guestId, _startDate, _endDate],  function(err, result) {
				if (err) callback(err, null);
				else callback(null, result[0]); 
			});
		}
		
		var mysql      = require('mysql');
		var connection = mysql.createConnection({
			host     : 'localhost',
			port	 : '3306',
			user     : 'root',
			password : 'qwed',
			database : 'sys'
		});

		connection.connect(function(err) {
		  if (err) throw err;
		});
		
		getInfo(result.hotelId, result.roomNo, result.guestId, result.startDate, result.endDate, function(err, data){
			if (!err) console.log('Response from QUERY: ' + data.hotelId + ' ' + data.roomNo + ' ' + data.guestId + ' ' + data.startDate + ' ' + data.endDate);
			else 
				console.log('Error: ' + err);
		});
		
		connection.end();
	}
});