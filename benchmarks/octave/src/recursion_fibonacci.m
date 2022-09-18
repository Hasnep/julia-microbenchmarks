function f = recursion_fibonacci(n)
    if n < 2
        f = n;
        return
    else
        f = recursion_fibonacci(n - 1) + recursion_fibonacci(n - 2);
    end
end
