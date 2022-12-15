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
    console.log(data);
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
  book_list: async (data) => {
    try {
      let query = {};
      if(data.query.id != undefined && data.query.id != null){
        query['_id']=data.query.id;
      }
      let response = await Book.find(query);
      return {
        status: http_code.OK,
        data: {
          status: true,
          message: "GET book-list Successfully",
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
  book_details: async (data) => {
    try {
      let query = {};
      if(data.query.id != undefined && data.query.id != null){
        query['_id']=data.query.id;
      }
      let response = await Book.findOne(query);
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
  // getBook: async (_id) => {
  //   try {
  //     let response = await Book.findById(
  //       _id
        
  //     );
  //     return {
  //       status: http_code.OK,
  //       data: {
  //         status: true,
  //         message: "Got selected Book Successfully",
  //         data: response,
  //       },
  //     };
  //   } catch (error) {
  //     return {
  //       status: http_code.INTERNAL_SERVER_ERROR,
  //       data: {
  //         status: false,
  //         message: error.message,
  //       },
  //     };
  //   }
  // },

};
module.exports = bookService;
