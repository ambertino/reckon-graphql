export async function keepTrying<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(err.message);
    console.log("Retrying");
    return new Promise(resolve => {
      resolve(keepTrying(fn));
    });
  }
}
