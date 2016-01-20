

var DB = "http://127.0.0.1:5984/todo/";

function searchTodo(){
	
    
	var todoId = $('#todo').val();
	
	$.ajax({
		type:	'GET',
		url:	DB + todoId,
	    async: true,
	    success:function(data){
	    	parsed_data = JSON.parse(data);
	    	editTodo(parsed_data._id, parsed_data._rev, parsed_data.ingavedatum, parsed_data.einddatum, parsed_data.prioriteit, parsed_data.beschrijving, parsed_data.status);
	    },
		error: function(XMLHttpRequest, textStatus, errorThrown) { alert(XMLHttpRequest.responseText); }
	});

}

function editTodo(id, rev, ingavedatum, einddatum, prioriteit, beschrijving, status){
	
	$('#edit').empty();
	$('#edit').show();
	
	var html = '';
	
	// Build edit form
	html += '<h3>Editeer record</h3><table class="table table-hover">';
	html += '<input type="hidden" id="_id" value="' + id + '"/>';
	html += '<input type="hidden" id="_rev" value="' + rev + '"/>';
	html += '<tr><td>Ingavedatum :</td><td><input id="ingavedatum" type="text" size="50" value="' + ingavedatum + '"/></td></tr>';
	html += '<tr><td>Einddatum:</td><td><input id="einddatum" type="text" size="50" value="' + einddatum + '"/></td></tr>';
	html += '<tr><td>Prioriteit:</td><td><input id="prioriteit" type="text" size="10" value="' + prioriteit + '"/></td></tr>';
	html += '<tr><td>Beschrijving:</td><td><input id="beschrijving" type="text" size="100" value="' + beschrijving + '"/></td></tr>';
	html += '<tr><td>Status:</td><td><input id="status" type="text" size="50" value="' + status + '"/></td></tr>';
	html += '<tr><td colspan="2" align="center"><button type="button" class="btn btn-primary" onClick="updateTodo()">Ok</button></td></tr>';
	html += '</table>';
	
	$('#edit').html(html);
}

function updateTodo(){
	
	var id = $("#_id").val();
	var rev = $("#_rev").val();
	var ingavedatum = $("#ingavedatum").val();
	var einddatum = $("#einddatum").val();
	var prioriteit = $("#prioriteit").val();
	var beschrijving = $("#beschrijving").val();
	var status = $("#status").val();
	
	
	
	var doc = {};

	doc._id = id;
	doc._rev = rev;
	doc.ingavedatum = ingavedatum;
	doc.einddatum = einddatum;
	doc.prioriteit = parseInt(prioriteit);
	doc.beschrijving = beschrijving;
	doc.status = status;
	var json = JSON.stringify(doc);
	
	console.log(DB+id)
	$.ajax({
		type : 'PUT',
		url : DB + id,
		data : json,
		contentType : 'application/json',
		async : true,
		success : function(data){
			$('#edit').hide();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
}
