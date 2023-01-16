class ControllerError extends Error {
  declare code;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export default ControllerError;
