const isMongoId = (id: string | null): boolean => {
  // Kiểm tra định dạng của MongoDB ObjectId (24 ký tự hex)

  return id ? /^[0-9a-fA-F]{24}$/.test(id) : false;
};

export default isMongoId;
