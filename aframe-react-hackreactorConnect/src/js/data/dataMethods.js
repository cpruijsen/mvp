// merge allData and allUsers (to port github info to allData)
// TODO: readFile / writeFile... :/.

/*



*/

for (var x = 0; x < data1.length; x++) {
	var handle = data1[x].handle;
  var email = data1[x].email;
  var githubid = data1[x].githubid;
  var id = data1[x].id;

  for (var i = 0; i < data2.length; i++) {
		for (var j = 0; j < data2[i].users.length; j++) {
    	if (id == data2[i].users[j].id) {
      data2[i].users[j].handle = handle;
      data2[i].users[j].githubid = githubid;
      console.log('same');
      }
    }
  }
}
