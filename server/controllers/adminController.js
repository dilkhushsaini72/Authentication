const adminProductController = async (req, res) => {
  try {
    const { id } = req.user;

    res
      .status(200)
      .json({ message: "Admin product controller response", adminId: id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  adminProductController,
};
