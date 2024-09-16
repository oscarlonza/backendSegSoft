export const constants = {
  response: {
    status: {
      OK: 200,
      not_found: 404,
      not_auth: 401,
      bad_request: 400,
      not_valid: 422,
      server_error: 500,
    },
    message: {
      OK: "Server on",
      not_found: "Not found",
      not_auth: "Not Authorized",
      not_jwt: "Not Valid JWT",
      invalid_phone: "Invalid phone number",
      send_sms: "Message sent",
    },
  },
  bcrypt: {
    rounds: 5,
  },
};