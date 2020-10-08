// https://pegjs.org/online

{
	// Let's start with a single env.
	let env = {};
}

Lang = (Decl / Expr) _ Lang / ""

Decl = "let" _ k:Name _ "=" _ v:Integer { env[k] = v; }

Expr = Term / Term ("+" / "-") Term

Term = Integer / Variable

Name = [a-zA-z][a-zA-z0-9]* { return text(); }

Variable = [a-zA-z][a-zA-z0-9]* { 
	let v = env[text()];
    if (v) { return v; }
    else { error(text() + " not exist."); }
}

Integer "integer" = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace" = [ \t\n\r]* { return "_"; }
