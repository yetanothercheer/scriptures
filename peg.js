// https://pegjs.org/online

// TODO: write a complete language and repl for it in React

{
	let env = {};
}

Language = s:Sentense tail:("\n" Sentense)* {
    s();
    tail.map(e => e[1]())
    console.log(env)
}

Sentense = v:V _ "=" f:Expr { return () => env[v] = f(); }

Expr = i:Integer "+" v:V { return () => { return i() + env[v];  } } / Integer

Integer "integer" = [0-9]+ { let v =  parseInt(text(), 10); return () => v; }

_ "whitespace" = [ \t\n\r]*
  
V = [a-zA-Z]+

/*
Examples:

a=1
b=10+a
c=101+b

*/
