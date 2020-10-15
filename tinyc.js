// https://github.com/antlr/grammars-v4/blob/master/tinyc/tinyc.g4

program = statement
statement =
    "if" _ paren_expr _ statement "else" _ statement /
    "if" _ paren_expr _ statement /
    "while" _ paren_expr _ statement /
    "do" _ statement "while" _ paren_expr ";" /
    "{" _ statement* _ "}" /
    expr ";" _ /
    ";" _
paren_expr = "(" expr ")"
expr = id "=" expr / test
test = sum "<" sum / sum
sum = term "+" sum / term "-" sum / term
term = id / int / paren_expr
id  = [a-z]
int = [0-9]+

_ = " "*

/*

Test Cases:
{ i=1; while (i<100) i=i+i; }
{ i=125; j=100; while (i-j) if (i<j) j=j-i; else i=i-j; }
{ i=1; do i=i+10; while (i<50); }
{ i=1; while ((i=i+10)<50) ; }
{ i=7; if (i<5) x=1; if (i<10) y=2; }

*/
