export class ApplicationException extends Error {
  constructor(msg = "") {
    super(msg);
    this.name = this.constructor.name;
  }
}

// Alteração \/
const exception = ApplicationException;

export function isApplicationException(err) {
  return (
    err instanceof excepction || Object.getPrototypeOf(err) instanceof exception
  );
}

export function getExceptionMessage(err) {
  if (isApplicationException(err)) {
    return err.message;
  } else {
    console.log(err);
    return "Não foi possível realizar a operação.";
  }
}
