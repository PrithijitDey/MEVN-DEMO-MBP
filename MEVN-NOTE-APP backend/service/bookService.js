const http_code = require("http-status-codes").StatusCodes;
const Book = require("../db/models/books");
let bookService = {
  addBook: async (data) => {
    try {
      const { book } = data;

      const availabilityResponse = await Book.findOne({ book });

      if (!availabilityResponse) {
        const response = await Book.create(data);

        return {
          status: http_code.CREATED,
          data: {
            status: true,
            message: "Book added Successfully",
            data: response,
          },
        };
      } else {
        if (availabilityResponse.book == book) {
          return {
            status: http_code.BAD_REQUEST,
            data: {
              status: false,
              message: "Book already exists.",
            },
          };
        } else {
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
  update: async (_id, data) => {
    try {
      let response = await Book.findByIdAndUpdate(
        _id,
        { $set: data },
        { new: true }
      );
      return {
        status: http_code.OK,
        data: {
          status: true,
          message: "Updated Book Successfully",
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
  book_details: async (body) => {
    try {
      let response = await Book.find(body);
      return {
        status: http_code.OK,
        data: {
          status: true,
          message: "GET book Successfully",
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
module.exports = bookService;
