class Temp {
  private readonly value = 123;
  constructor() {}

  public getValue(): number {
    return this.value;
  }

  public add(a: number): number {
    return a + 10;
  }
}

export default Temp;
