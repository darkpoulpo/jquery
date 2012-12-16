

/* usage 

	$(all).storage(true); //save all values
	{id1 : 4, id2: 5} = $(all).storage(false); //get all saved values
	
	value = jQuery.storage(name,value); ///save or get a value for a name
	
	
	eg: execute and refresh
	
	jQuery.serializeSettings.name = 'myapplication'; // application name or website name, ...
	jQuery.serializeSettings.type = 'local'; //  local -> html5 Storage | cookie | both -> the first available 
  
	console.info(jQuery.storage('value1')); // first : undefined, refresh : 4
	jQuery.storage('value1',4);
	
	console.info(jQuery.storage('value2')); // first : undefined, refresh : "a text"
	jQuery.storage('value2',"a text");
	
	console.info(jQuery.storage('value3'));  // first : undefined, refresh : true
	jQuery.storage('value3',true);
	
	console.info($("input").storage(false));  // first : {id1 : undefined, id2 : undefined}, refresh : {id1 : "444", id2 : "555"}
	$("input").storage(true);
	
	...
	
	
	<input id='id1' type="text" value="444">
	<input id='id2' type="text" value="555">

*/
	
jQuery.fn.extend({
	storage : function(params)
	{
		var ret = (params) ? this : {};
		this.each(function(){
			var id = this.getAttribute('id');
			if (id === null) return;
			
			if (params === true)
			{
				var value = $(this).val();
				jQuery.storage(id,value);
			} else {
				ret[id] = jQuery.storage(id);
			}
		});
		return ret;
	}
	
});

jQuery.extend({
	serializeSettings : {
		name: null, /* application name or website name, ... */
		type : null /*  local -> html5 Storage | cookie | both -> the first available */
	},
	
	storage : function(name,value)
	{
		function _readCookie()
		{
			var ret = {};
			var attributes = document.cookie.split(';');
			for(var j=0; j<attributes.length; j++) {
				var entry = attributes[j].split('=');
				if (entry[0].trim() === '') continue;
				ret[entry[0].trim()] = (entry[1] === undefined) ? null : entry[1].trim();
			}
			return ret;
		}
		
		if (jQuery.serializeSettings.name === null) return value;
		if (jQuery.serializeSettings.type === null) return value;
		if (jQuery.serializeSettings.name.trim() === '') return value;
	
		jQuery.serializeSettings.type = jQuery.serializeSettings.type.toLowerCase();
		
		if (jQuery.serializeSettings.type === 'both')
		{
			jQuery.serializeSettings.type = (jQuery.support.storage) ? 'local' : 'cookie';
		}
		
		if (jQuery.serializeSettings.type === 'local')
		{
			jQuery.serializeSettings.type = (jQuery.support.storage) ? jQuery.serializeSettings.type : 'cookie';
		}
		
		if (jQuery.serializeSettings.type === 'cookie')
		{
			jQuery.serializeSettings.type = (jQuery.support.cookie) ? jQuery.serializeSettings.type : null;
		}

		if (typeof value !== 'undefined' && (jQuery.isNumeric(value) || typeof value === 'string' || typeof value === 'boolean'))
		{
			if (jQuery.serializeSettings.type === 'local')
			{
				localStorage[jQuery.serializeSettings.name + '_' + name] = value;
			} else if (jQuery.serializeSettings.type === 'cookie')
			{
				var date = new Date();
				date.setTime(date.getTime()+(2000*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
				var cook = jQuery.serializeSettings.name + '_' + name + '=' + value + expires;
				cook += '; domain=' + document.domain;
				cook += '; path=' + location.pathname;	
				document.cookie =  cook;
			}
		} else {
			if (jQuery.serializeSettings.type === 'local')
			{
				value = localStorage[jQuery.serializeSettings.name + '_' + name];
			} else if (jQuery.serializeSettings.type === 'cookie')
			{
				var cookies = _readCookie();
				value = cookies[jQuery.serializeSettings.name + '_' + name];
			}
		}
		
		return value;
	}
});
	
jQuery.extend(jQuery.support, {
	storage  : ( typeof(Storage)!=="undefined"),
	cookie : (document.cookie) ? true : false
});
