const changeToSlug = title => {
  if (!title) {
    return "";
  }

  let slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/[áàảạãăắằẳẵặâấầẩẫậ]/gi, "a");
  slug = slug.replace(/[éèẻẽẹêếềểễệ]/gi, "e");
  slug = slug.replace(/[iíìỉĩị]/gi, "i");
  slug = slug.replace(/[óòỏõọôốồổỗộơớờởỡợ]/gi, "o");
  slug = slug.replace(/[úùủũụưứừửữự]/gi, "u");
  slug = slug.replace(/[ýỳỷỹỵ]/gi, "y");
  slug = slug.replace(/đ/gi, "d");

  //Xóa các ký tự đặc biệt
  slug = slug.replace(/[`~!@#|$%^&()+=,.\/?><'":;_]/gi, "");

  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");

  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");

  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");

  return slug;
};

export default changeToSlug;
