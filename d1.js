
		// E1
const prompt = require('prompt');
prompt.start();
prompt.get(['guestName', 'guestAddress'], function(err, result) {
	if(!err) 
	{
		
		function setGuest(_guestName, _guestAddress, callback)
		{
			var guest = {guestName: _guestName, guestAddress: _guestAddress};
				
			connection.query('INSERT INTO guest SET ?', guest, function(err, result) {
			  if (err) callback(err, null);
			  else callback(null, result[0]);
			});	
		}

		function getGuest(_guestName, _guestAddress, callback)
		{
			var guestr = ['guestName', 'guestAddress'];
			
			connection.query('SELECT ?? from guest WHERE guestName = ? AND guestAddress = ?', [guestr, _guestName, _guestAddress],  function(err, result) {
				if (err) callback(err, null);
				else callback(null, result[0]); 
			});
		}
		
		console.log('Adding ' + result.guestName + ' from ' + result.guestAddress + '...');
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

		setGuest(result.guestName, result.guestAddress, function(err, data){
			if (!err) console.log("Response from INSERT: " + data);
			else 
				console.log('Error: ' + err);
		});
		
		getGuest(result.guestName, result.guestAddress, function(err, data){
			if (!err) console.log('Response from QUERY: ' + data.guestName + ' ' + data.guestAddress);
			else 
				console.log('Error: ' + err);
		});
		
		
		
		connection.end();
	}
});

