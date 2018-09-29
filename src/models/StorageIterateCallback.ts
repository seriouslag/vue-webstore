export default interface StorageIterateCallback {
  callback(value: any, key: string, iterationNumber: number): any;
}
