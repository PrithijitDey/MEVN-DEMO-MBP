const http_code = require("http-status-codes").StatusCodes;
const User = require("../db/models/user");
let userService = {
  login: async (data) => {
    try {
      let response = await User.findOne({ username: data.username });
      if (response != null) {
        if (response.password == data.password) {
          return {
            status: http_code.OK,
            data: {
              status: true,
              message: "Login Successfully",
              data: response,
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
            data: response,
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
  // company_list: async () => {
  //     try {
  //         let response = await User.find({}, "company.name");
  //         return {
  //             status: http_code.OK, data: {
  //                 status: true,
  //                 message: 'Company List Get Successfully',
  //                 data: response
  //             }
  //         };
  //     } catch (error) {
  //         return {
  //             status: http_code.INTERNAL_SERVER_ERROR, data: {
  //                 status: false,
  //                 message: error.message
  //             }
  //         };
  //     }
  // },
  // search: async (res) => {
  //     try {
  //         console.log(res);
  //         let search_query=[];
  //         if (res.hasOwnProperty('search')) {
  //             search_query = [
  //                 {
  //                     $addFields: {
  //                         "name_s": { $toLower: "$name" },
  //                         "username_s": { $toLower: "$username" },
  //                         "email_s": { $toLower: "$email" }
  //                     }
  //                 },
  //                 {
  //                     $match: {
  //                         $or: [
  //                             { "name_s": { $regex: res.search } },
  //                             { "username_s": { $regex: res.search } },
  //                             { "email_s": { $regex: res.search } },
  //                             { "phone": { $regex: res.search } }
  //                         ]
  //                     }
  //                 },
  //                 {
  //                     $project:
  //                     {
  //                         name_s: 0,
  //                         email_s: 0,
  //                         username_s: 0
  //                     }
  //                 },
  //             ];
  //         }
  //         if (res.hasOwnProperty('company')) {
  //             search_query.push({
  //                 $match: {
  //                     "company.name": res.company
  //                 }
  //             })
  //         }
  //         let response = await User.aggregate(search_query)
  //         return {
  //             status: http_code.OK, data: {
  //                 status: true,
  //                 message: 'User List Get Successfully',
  //                 data: response
  //             }
  //         };
  //     } catch (error) {
  //         return {
  //             status: http_code.INTERNAL_SERVER_ERROR, data: {
  //                 status: false,
  //                 message: error.message
  //             }
  //         };
  //     }
  // },
};
module.exports = userService;
