var mongoose = require("mongoose");
//var config = require("config");
const userModel = require("../models/user");
const companyModel = require("../models/company");
const branchModel = require("../models/branch");
const roleModel = require("../models/role");
const branchRoleModel = require("../models/branchRole");

const { hashPassword } = require("./tool");

//database connection
mongoose.Promise = global.Promise;
const options = {
  // autoIndex: false,
  // reconnectTries: 100,
  // reconnectInterval: 500,
  // poolSize: 10,
  // bufferMaxEntries: 0,
  // useNewUrlParser: true,
  // useFindAndModify: false,

  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  dbName: "erpdb",
};

mongoose
  .connect("mongodb://AdminCherry:qwerty@127.0.0.1:27017", options)
  .then(() => {
    console.log("connected to mongoDB");

    //db.grantRolesToUser("edgar", ["root"]);

    // hashPassword("sysadmin").then((hash) => {
    //   var user = new userModel({
    //     username: "sysadmin",
    //     email: "sysadmin@gmail.com",
    //     password: hash,
    //   });
    //   user.save();
    // });

    const pipeline = [
      {
        $lookup: {
          from: "branches",
          localField: "_id",
          foreignField: "company_id",
          pipeline: [
            {
              $lookup: {
                from: "branchroles",
                localField: "_id",
                foreignField: "branch_id",
                pipeline: [
                  {
                    $lookup: {
                      from: "roles",
                      localField: "role_id",
                      foreignField: "_id",
                      as: "rol",
                    },
                  },
                  {
                    $lookup: {
                      from: "users",
                      localField: "user_id",
                      foreignField: "_id",
                      as: "user",
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      user_id: 1,
                      role_id: 1,
                      branch_id: 1,
                      rol_name: "$rol.name",
                      rol_description: "$rol.description",
                      rol_permissions: "$rol.permissions",
                      user_email: "$user.email",
                      user_name: "$user.username",
                    },
                  },
                  { $match: { user_email: "sysadmin@gmail.com" } },
                ],
                as: "userbranchroles",
              },
            },
            { $match: { userbranchroles: { $ne: [] } } },
          ],
          as: "branches",
        },
      },
      { $match: { branches: { $ne: [] } } },
    ];

    // companyModel
    //   .aggregate(pipeline)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // var user = new companyModel({
    //   code: "EM001",
    //   address: "test",
    //   business_name: "test",
    //   ruc_number: "test",
    //   ubigeo: "test",
    //   department: "test",
    //   district: "test",
    //   landline: "test",
    //   mobilePhone: "test",
    //   residential_tax: "test",
    //   website: "test",
    //   smtp_gmail: {
    //     emailSender: "test",
    //     emailSenderPass: "test",
    //   },
    // });

    // var user = new branchModel({
    //   code: "SU003",
    //   name: "test3",
    //   address: "test3",
    //   company_id: "6458534525d6b9ce818c8eef",
    // });

    // var user = new branchRoleModel({
    //   user_id: "645901988f7ac439a553f7ff",
    //   role_id: "645902b4a3dba83dade878d9",
    //   branch_id: "64585d9bf5b566dfb8eef63d",

    // });
    //user.save();
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

module.exports = mongoose;
