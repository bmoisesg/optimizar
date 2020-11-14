 
%{
    const {declaracion} = require('../Instruction/declaracion');
    const {declaracion1} = require('../Instruction/declaracion1');
    const {declaracion2} = require('../Instruction/declaracion2');
    const {declaracion3} = require('../Instruction/declaracion3');
    const {declaracion4} = require('../Instruction/declaracion4');
    const {etiqueta} = require('../Instruction/etiqueta');
    const {llamada} = require('../Instruction/llamada');
    const {goto} = require('../Instruction/goto');
    const {metodo1} = require('../Instruction/metodo1');
    const {metodo2} = require('../Instruction/metodo2');
    const {imprimir} = require('../Instruction/imprimir');
    const {condicion} = require('../Instruction/condicion');

    var Lista_errores=[];

%}

%lex
// --- Expresiones regulares ---->

%options case-insensitive
decimal {number}"."{number}
number  [0-9]+
stringsimple     [\'][^']* [\']
stringplantilla  [\`][^`]* [\`]
print   "printf"[^;]*";"
%s  string 
//estado "string" para almacenar todo lo que tenga despue de el caracter \" 
%%

<INITIAL>["]        { this.begin('string'); tmp="";                         }
<string>[^"\\]      { tmp= tmp+yytext;   this.begin('string');              }
<string>[\\][n]     { tmp= tmp+"\n";     this.begin('string');              }
<string>[\\][t]     { tmp= tmp+"\t";     this.begin('string');              }
<string>[\\][r]     { tmp= tmp+"\r";     this.begin('string');              }
<string>[\\]["]     { tmp= tmp+"'";      this.begin('string');              }
<string>[\\][\\]    { tmp= tmp+"";       this.begin('string');              }
<string>[\"]        { this.begin('INITIAL'); yytext= tmp; return 'STRING'   }

\s+                                   // skip whitespace
"//".*                                // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   // comentario multiple líneas


"true"                      return 'true'
"false"                     return 'false'

{decimal}                   return 'DECIMAL'
{number}                    return 'NUMBER'
{stringsimple}              return 'STRING_2'
{stringplantilla}           return 'STRING_3'
{print}                     return 'ER_imprimir'
// --- Simbolos --->

"**"                        return '**'
"++"                        return '++'
"--"                        return '--'
"<="                        return '<='
">="                        return '>='
"!="                        return '!='
"=="                        return '=='
"&&"                        return '&&'
"||"                        return '||'
"+"                         return '+'
"-"                         return '-'
"*"                         return '*'
"/"                         return '/'
"%"                         return '%'
";"                         return ';'
":"                         return ':'
"."                         return '.'
"?"                         return '?'
","                         return ','
"["                         return '['
"]"                         return ']'
"<"                         return '<'
">"                         return '>'
"!"                         return '!'
"="                         return '='

")"                         return ')' 
"{"                         return '{'
"}"                         return '}'

// --- palabras reservadas -->

"void"                      return 't_void'
"if"                        return 't_if'
"goto"                      return 't_goto'

["(int)"]*([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
"("                         return '('

<<EOF>>		                return 'EOF'
.                           {  Lista_errores.push("<tr><td>lexico</td><td>No se reconoce el caracter: "+yytext + "</td><td>" + (yylineno+1) +'</td><td>'+(yylloc.first_column+1)+'</td></tr>');	}
/lex

%left '(' ')' '[' ']' '{' '}'


%start Init

%%
-
// -- Gramatica --->

Init    
    : Instructions EOF  {
        exports.Lista_errores= Lista_errores;
       
        return $1;  }
;

Instructions
    : Instructions Instruction  { $1.push($2); $$ = $1;    }
    | Instruction               {              $$ = [$1];  }
;

Instruction
    : DECLARACION   ';'       { $$=$1; }
    | ETIQUETA      ':'       { $$=$1; }
    | SALTO         ';'       { $$=$1; }
    | CALL          ';'       { $$=$1; }  
    | METODO                  { $$=$1; }
    | NOTERMINAR_IMPRIMIR     { $$=$1; }
    | IF             ';'         { $$=$1; }
;
NUMBERR:
    NUMBER    {$$=$1;}
    | DECIMAL {$$=$1;}
;

IF
    :'t_if' '('  ID SIGNO ID          ')' 't_goto' ID {$$= new  condicion($3,$4,$5,$8,@1.first_line);}
    |'t_if' '('  NUMBERR SIGNO NUMBERR ')' 't_goto' ID {$$= new  condicion($3,$4,$5,$8,@1.first_line);}
    |'t_if' '('  ID SIGNO NUMBERR     ')' 't_goto' ID {$$= new  condicion($3,$4,$5,$8,@1.first_line);}
    |'t_if' '('  ID SIGNO '-' NUMBERR ')' 't_goto' ID {$$= new  condicion($3,$4,$5,"-"+$9,@1.first_line);}
;

NOTERMINAR_IMPRIMIR: 'ER_imprimir' {$$= new imprimir($1,@1.first_line);}
;

METODO
    : 't_void' ID '(' ')' '{' { $$=new metodo1($2,@1.first_line); }
    | '}'                     { $$=new metodo2(@1.first_line);    }
;

CALL
    : ID '(' ')' {$$= new llamada($1,@1.first_line);} 
;

SALTO
    :'t_goto' ID {$$= new goto($2,@1.first_line);}
;

DECLARACION
    : ID '=' ID                         { $$= new declaracion3($1,$3,@1.first_line);                }
    | ID '=' ID     SIGNO NUMBERR        { $$= new declaracion($1,$3,$4,$5,false,@1.first_line);     }
    | ID '=' ID     SIGNO '-' NUMBERR    { $$= new declaracion($1,$3,$4,"-"+$6,false,@1.first_line); }
    | ID '=' NUMBERR SIGNO ID            { $$= new declaracion($1,$3,$4,$5,true ,@1.first_line);     }
    | ID '=' ID     SIGNO ID            { $$= new declaracion($1,$3,$4,$5,true ,@1.first_line);     }
    | ID '=' NUMBERR                     { $$= new declaracion1($1,$3,@1.first_line);                }
    | ID '=' ID '[' ID ']'              { $$= new declaracion2($1,$3,$5,true ,@1.first_line);       }   
    | ID '[' ID ']' '=' ID              { $$= new declaracion2($1,$3,$6,false,@1.first_line);       } 

    | ID '[' ID ']' '=' ID SIGNO  'STRING_2'  { $$= new declaracion4($1+"["+$3+"]="+$6+$7+$8,@1.first_line);       }   
    
    | ID '[' ID ']' '=' NUMBERR          { $$= new declaracion2($1,$3,$6,false,@1.first_line);       }   
    | ID '[' ID ']' '=' '-' NUMBERR          { $$= new declaracion2($1,$3,"-"+$7,false,@1.first_line);       }   
    
;
SIGNO
    :'+'  { $$=$1; }
    |'-'  { $$=$1; }
    |'*'  { $$=$1; }
    |'/'  { $$=$1; }
    |'%'  { $$=$1; }
    |'<'  { $$=$1; }
    |'<=' { $$=$1; }
    |'>'  { $$=$1; }
    |'>=' { $$=$1; }
    |'==' { $$=$1; }
    |'!=' { $$=$1; }
    |'&&' { $$=$1; }
    |'||' { $$=$1; }

;

ETIQUETA
    : ID { $$=new etiqueta($1,@1.first_line );}
;
