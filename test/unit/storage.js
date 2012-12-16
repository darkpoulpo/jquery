if ( jQuery.storage ) {

module("storage", { teardown: moduleTeardown });

test("storage(boolean)", function() {

	jQuery.serializeSettings.name = 'test';
	jQuery.serializeSettings.type = 'local';
  
	
	console.info(jQuery("<div id='id1' value='3'>").storage(false));
	equal( jQuery("<div id='id1' value='3'>").storage(false), undefined, "it's ok" );

	jQuery("<div id='id1' value='4'>").storage(true);
	equal( jQuery("<div id='id1'>").storage(false), 4, "it's ok" );
	
});

}