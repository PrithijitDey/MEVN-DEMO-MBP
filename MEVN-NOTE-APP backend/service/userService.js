const http_code = require("http-status-codes").StatusCodes;
const User = require("../db/models/user");
const jwt = require("jsonwebtoken");

let userService = {
  login: async (data) => {
    try {
      let response = await User.findOne({ username: data.username });
      if (response != null) {
        if (response.password == data.password) {
          const token = await jwt.sign(
            {
              user_id: response._id,
              name: response.name,
              email: response.email,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "8h",
            }
          );

          response.token = token;

          let updateResponse = await User.findByIdAndUpdate(
            response._id,
            { $set: { token: token } },
            { new: true }
          );

          return {
            status: http_code.OK,
            data: {
              status: true,
              message: "Login Successfully",
              data: {
                id: updateResponse._id,
                name: updateResponse.name,
                username: updateResponse.username,
                email: updateResponse.email,
                token: updateResponse.token,
              },
            },
          };
        } else {
          throw new Error("Wrong Password");
        }
      } else {
        throw new Error("User does't exsist");
      }
    } catch (error) {
      return {
        status: http_code.INTERNAL_SERVER_ERROR,
        data: {
          status: false,
          message: error.message,
        },
      };
    }
  },
  register: async (data) => {
    try {
      const { email, username } = data;

      const availabilityResponse = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (!availabilityResponse) {
        const response = await User.create(data);

        return {
          status: http_code.CREATED,
          data: {
            status: true,
            message: "Register Successfully",
            data: {
              id: response._id,
              name: response.name,
              username: response.username,
              email: response.email,
            },
          },
        };
      } else {
        if (
          availabilityResponse.email == email &&
          availabilityResponse.username == username
        ) {
          return {
            status: http_code.BAD_REQUEST,
            data: {
              status: false,
              message: "User already exists.",
            },
          };
        } else if (availabilityResponse.email == email) {
          return {
            status: http_code.BAD_REQUEST,
            data: {
              status: false,
              message: "Email already exists.",
            },
          };
        } else if (availabilityResponse.username == username) {
          return {
            status: http_code.BAD_REQUEST,
            data: {
              status: false,
              message: "Username already exists.",
            },
          };
        }
      }
    } catch (error) {
      return {
        status: http_code.INTERNAL_SERVER_ERROR,
        data: {
          status: false,
          message: error.message,
        },
      };
    }
  },

  logout: async (data) => {
    try {
      let response = await User.findByIdAndUpdate(
        data.id,
        { $set: { token: "" } },
        { new: true }
      );
      return {
        status: http_code.OK,
        data: {
          status: true,
          message: "Logout Successfully",
          data: response,
        },
      };
    } catch (error) {
      return {
        status: http_code.BAD_REQUEST,
        data: {
          status: false,
          message: error.message,
        },
      };
    }
  },
  // register: async (data) => {
  //     try {
  //         try {
  //             let email = await User.findOne({ "email": data.email });
  //             if (email != null) {
  //                 return {

  //                     status: http_code.INTERNAL_SERVER_ERROR, data: {
  //                         status: false,
  //                         message: `Email already exists`
  //                     }
  //                 };
  //             }
  //             else{
  //                 let response = await User.create(data);

  //                 return {
  //                     status: http_code.CREATED, data: {
  //                         status: true,
  //                         message: 'Registered Successfully',
  //                         data: response
  //                     }
  //                 };
  //             }
  //         }catch (error) {
  //                 return {
  //                     status: http_code.INTERNAL_SERVER_ERROR, data: {
  //                         status: false,
  //                         message: error.message
  //                     }
  //                 };

  //     }} catch (error) {
  //         return {
  //             status: http_code.INTERNAL_SERVER_ERROR, data: {
  //                 status: false,
  //                 message: error.message
  //             }
  //         };
  //     }
  // },
  update: async (_id, data) => {
    try {
      let response = await User.findByIdAndUpdate(
        _id,
        { $set: data },
        { new: true }
      );
      return {
        status: http_code.OK,
        data: {
          status: true,
          message: "Updated Successfully",
          data: response,
        },
      };
    } catch (error) {
      return {
        status: http_code.INTERNAL_SERVER_ERROR,
        data: {
          status: false,
          message: error.message,
        },
      };
    }
  },
  user_details: async (body) => {
    try {
      let response = await User.find(body);
      return {
        status: http_code.OK,
        data: {
          status: true,
          message: "GET User Successfully",
          data: response,
        },
      };
    } catch (error) {
      return {
        status: http_code.INTERNAL_SERVER_ERROR,
        data: {
          status: false,
          message: error.message,
        },
      };
    }
  },
};
module.exports = userService;
