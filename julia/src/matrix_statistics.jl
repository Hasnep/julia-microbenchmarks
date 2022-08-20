# using BenchmarkTools
# using Test

# include("utils.jl")

# function matrix_statistics(t)
#   n = 5
#   v = zeros(t, t)
#   w = zeros(t, t)
  
# end

# def randmatstat(t):
#     n = 5
#     v = zeros(t)
#     w = zeros(t)
#     for i in range(t):
#         a = randn(n, n)
#         b = randn(n, n)
#         c = randn(n, n)
#         d = randn(n, n)
#         P = concatenate((a, b, c, d), axis=1)
#         Q = concatenate((concatenate((a, b), axis=1), concatenate((c, d), axis=1)), axis=0)
#         v[i] = trace(matrix_power(dot(P.T,P), 4))
#         w[i] = trace(matrix_power(dot(Q.T,Q), 4))
#     return (std(v)/mean(v), std(w)/mean(w))

# randmatstat = function(t) {
#     n = 5
#     v = matrix(0, nrow=t)
#     w = matrix(0, nrow=t)
#     for (i in 1:t) {
#         a = matrix(rnorm(n*n), ncol=n, nrow=n)
#         b = matrix(rnorm(n*n), ncol=n, nrow=n)
#         c = matrix(rnorm(n*n), ncol=n, nrow=n)
#         d = matrix(rnorm(n*n), ncol=n, nrow=n)
#         P = cbind(a,b,c,d)
#         Q = rbind(cbind(a,b),cbind(c,d))
#         v[i] = sum(diag((t(P)%*%P)^4))
#         w[i] = sum(diag((t(Q)%*%Q)^4))
#     }
#     s1 = apply(v,2,sd)/mean(v)
#     s2 = apply(w,2,sd)/mean(w)
#     return(c(s1,s2))
# }

# timeit("matrix_statistics", randmatstat, 1000)
