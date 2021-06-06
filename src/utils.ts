export async function keepTrying<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    // Send logs to a storage
    console.error(err.message);

    return new Promise((resolve) => {
      resolve(keepTrying(fn));
    });
  }
}
