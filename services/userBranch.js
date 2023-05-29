const companyModel = require("../models/company");

var getUserDetails = async (req, res, next) => {
  console.log(req.user);
  var email = "sysadmin@gmail.com";
  var email = req.user.email;
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
                { $match: { user_email: email } },
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
  var data = await companyModel.aggregate(pipeline);
  if (data.length) {
    res.json({
      success: true,
      info: data,
    });
  } else {
    res.json({
      success: false,
      info: {},
    });
  }
};

module.exports = {
  getUserDetails,
};
