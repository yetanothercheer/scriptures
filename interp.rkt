#lang racket

;;; CMSC 430: Design and Implementation of Programming Languages
;;; https://www.cs.umd.edu/class/spring2020/cmsc430/index.html

;;; Auxiliary Functions

(define (primitive? x)
  (or (integer? x)
      (boolean? x)))

(define (lookup env x)
  (match env
    ['() 'err]
    [(cons (list y v) env)
      (match (symbol=? x y)
        [#t v]
        [#f (lookup env x)])]))

(define (ext r x v)
  (cons (list x v) r))


;;; AST:
;;; Type Expr =
;;; | Integer
;;; | Boolean
;;; | Variable
;;; | `(if ,Expr ,Expr ,Expr)
;;; | `(let ((,Variable ,Expr)) ,Expr)
;;; | `(add1 ,Expr)
;;; | `(sub1 ,Expr)
;;; | `(zero? ,Expr)

;;; type Varialbe = Symbol (except 'add1 'sub1 'if 'let)

(define (interp-env e r)
  (match e
    [(? primitive? v) v]
    [`(if ,e0 ,e1 ,e2)
      (match (interp-env e0 r)
        ['err 'err]
        [v (if v (interp-env e1 r) (interp-env e2 r))])]
    [(? symbol? x)
      (lookup r x)]
    [`(let ((,x ,e0)) ,e1)
      (match (interp-env e0 r)
        ['err 'err]
        [v (interp-env e1 (ext r x v))])]
    [`(add1, e) (+ (interp-env e r) 1)]
    [`(sub1, e) (- (interp-env e r) 1)]
    [`(zero?, e) (zero? (interp-env e r))]
    [_ 'err]))

(define (interp e)
  (interp-env e '()))

(writeln (interp `(let ((x 0)) (if #t (add1 x) (sub1 x)))))
(writeln (interp `(let ((x 0)) (if #f (add1 x) (sub1 x)))))
(writeln (interp `(let ((x 0)) (zero? x))))
(writeln (interp `(let ((x 10)) (zero? x))))