start = get / post / edit / delete
// Helpers
url = [a-zA-Z<>\/]+
string = [a-zA-Z]+
_ = [ \t\r\n]*
editKeyword = "patch"/"put"
routeString = _ path:url _ "=>" _ controller:string "#" action:string;

// Route text
get "get"
	= "get" routeString
post "post"
	= "post" routeString
edit "patch/put"
	= editKeyword routeString
delete "delete"
	= "delete" routeString