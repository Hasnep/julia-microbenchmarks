require "benchmark"
require "spec"

# parse_integers
def parse_int(s, base)
  n = 0
  s.each_char do |c|
    d = 0
    if (c.ord >= "0".ord && c.ord <= "9".ord)
      d = c.ord - "0".ord
    elsif (c.ord >= 'A'.ord && c.ord <= 'Z'.ord)
      d = c.ord - 'A'.ord + 10
    elsif (c.ord >= 'a'.ord && c.ord <= 'z'.ord)
      d = c.ord - 'a'.ord + 10
    else
      break
    end
    if (base <= d)
      break
    end
    n = n * base + d
  end
  return n
end

def parse_integers
  1..t do
    n = Random.new.rand(0..(2**32 - 1))
  end
  return n
end

# def parse_int(t):
#     for i in range(1,t):

#         s = hex(n)
#         #s = string(n, base = 16)
#         if s[-1]=='L':
#             s = s[0:-1]
#         m = int(s,16)
#         assert m == n
#     return n

# parseintperf = function(t) {
#     for (i in 1:t) {
#         # R doesn't support uint32 values
#         n = floor(runif(1, min=0, max=2^31-1))
#         s = sprintf("0x%x", n)
#         m = as.numeric(s)
#         assert(m == n)
#     }
# }

# timeit("parse_integers", parseintperf, 1000)
