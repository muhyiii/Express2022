function paginationMiddleware(req, res, next) {

  let { orderBy, sortBy ,page,pageSize} = req.query;

  if (sortBy === undefined || orderBy === undefined) {
    req.query.sortBy = "id";
    req.query.orderBy = "asc";
  }


  if (
    page === undefined ||
    pageSize === undefined ||
    page === "" ||
    pageSize === ""
  ) {
    delete req.query.page;
    delete req.query.pageSize;
    return next();
  }
  page = parseFloat(req.query.page)
  pageSize = parseFloat(req.query.pageSize)
  page = (page - 1) * pageSize;

  req.query.page = page;
  req.query.pageSize = pageSize;
  next();
}

module.exports = paginationMiddleware;
