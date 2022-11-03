export const transposeMatrix = (X, m, n) => {
  let X_transposed = new Float64Array(m * n);
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      X_transposed[j * m + i] = X[i * n + j];
    }
  }
  return X_transposed;
};

/**
 *
 * @param {Float64Array} A An m by l matrix
 * @param {Float64Array} B An l by n matrix
 * @param {number} m
 * @param {number} l
 * @param {number} n
 * @returns Float64Array
 */
export const multiplyMatrices = (A, B, m, l, n) => {
  let C = new Float64Array(m * n);

  // Use the transpose of B so that during the matrix multiplication we access consecutive memory locations.
  // This is a fairer comparison of JS with the other languages which call on custom multiplication routines, which likely make use of such aligned memory.
  B = transposeMatrix(B, l, n);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let total = 0.0;
      for (let k = 0; k < l; k++) {
        total += A[i * l + k] * B[j * l + k];
      }
      C[i * n + j] = total;
    }
  }
  return C;
};
