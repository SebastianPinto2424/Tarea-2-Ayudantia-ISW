

"use strict";

export const handleSuccess = (res, code = 200, message = "OK", data = null) => {
  return res.status(code).json({
    status: "success",
    message,
    data,
  });
};

export const handleErrorClient = (res, code = 400, message = "Error de cliente", errorDetails) => {
  return res.status(code).json({
    status: "client-error",
    message,
    errorDetails,
  });
};

export const handleErrorServer = (res, code = 500, message = "Error del servidor", errorDetails) => {
  return res.status(code).json({
    status: "server-error",
    message,
    errorDetails,
  });
};
