//ESTA ABSTRACCION SE ENCARGA DE EL RESULTADO QUE VA A TENER LA OPERACION DEL SERVICIO 

export class Result<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly data?: T,
    public readonly errorMessage?: string
  ) 
  {
    if (isSuccess && errorMessage) {
      throw new Error("No se puede tener éxito y un mensaje de error al mismo tiempo.");
    }
    if (!isSuccess && !errorMessage) {
      throw new Error("Un resultado con error debe tener un mensaje de error.");
    }
  }

  public static ok<U>(data?: U): Result<U> {
    return new Result<U>(true, data);
  }

  public static fail<U>(errorMessage: string): Result<U> {
    return new Result<U>(false, undefined, errorMessage);
  }

  public get isFailure(): boolean {
    return !this.isSuccess;
  }
}