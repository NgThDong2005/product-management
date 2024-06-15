const Product = require("../../models/product.model");

const paginationHelper = require("../../helpers/pagination.helper");

// [PATCH] /admin/products/
module.exports.index = async (req, res) => {
    const find = {
      deleted: false
    };
  
    const filterStatus = [
      {
        label: "Tất cả",
        value: ""
      },
      {
        label: "Hoạt động",
        value: "active"
      },
      {
        label: "Dừng hoạt động",
        value: "inactive"
      },
    ];
  
    if(req.query.status) {
      find.status = req.query.status;
    }
  
    //Tìm kiếm 
    let keyword = "";
    if(req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
        keyword = req.query.keyword;
    }

    //Phân trang
    const pagination = await paginationHelper(req, find);

    const products = await Product
        .find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skip);

    res.render("admin/pages/products/index", {
        pageTitle: "Quản lý sản phẩm",
        products: products,
        keyword: keyword,
        filterStatus: filterStatus,
        pagination: pagination
    });
}

// [GET] /admin/products/change-status/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
    const {id, statusChange} = req.params;

    await Product.updateOne({
        _id: id
    },{
        status: statusChange
    });

    res.json({
        code: 200
    });
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const { status, ids } = req.body;

  await Product.updateMany({
    _id: ids
  }, {
    status: status
  });
  
  res.json({
    code: 200
  });
}
