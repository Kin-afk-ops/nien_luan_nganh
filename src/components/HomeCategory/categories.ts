interface Category {
  id: number;
  name: string;
  image: string;
  slug?: string;
}

const categories: Category[] = [
  { id: 2, name: "Sách", image: "/category_img/1.jpg", slug: "mua-ban-sach" },
  { id: 14, name: "Thời trang nữ", image: "/category_img/2.jpg",slug: "thoi-trang-nu" },
  { id: 15, name: "Thời trang nam", image: "/category_img/3.jpg",slug: "thoi-trang-nam" },
  { id: 16, name: "Đồ cho mẹ và bé", image: "/category_img/4.jpg",slug: "do-cho-me-va-be" },
  { id: 17, name: "Đồ chơi", image: "/category_img/5.jpg", slug: "do-choi" },
  { id: 18, name: "Xe cộ", image: "/category_img/6.jpg", slug: "xe-co" },
  { id: 20, name: "Đồ dùng", image: "/category_img/7.jpg", slug: "do-dung" },
  { id: 21, name: "Giày nữ", image: "/category_img/8.jpg", slug: "giay-nu" },
  { id: 22, name: "Giày nam", image: "/category_img/9.jpg", slug: "giay-nam" },
  { id: 31, name: "Đồ cho thú cưng", image: "/category_img/10.jpg", slug: "do-cho-thu-cung" },
  { id: 19, name: "Thiết bị điện tử", image: "/category_img/11.jpg", slug: "thiet-bi-dien-tu" },
  { id: 30, name: "Đồ thể thao", image: "/category_img/12.jpg", slug: "do-the-thao" },
  { id: 23, name: "Đồ văn phòng", image: "/category_img/13.jpg", slug: "van-phong" },
  { id: 24, name: "Trang sức và phục kiện", image: "/category_img/14.jpg", slug: "trang-suc-va-phuc-kien" },
  { id: 25, name: "Máy ảnh", image: "/category_img/15.jpg", slug: "may-anh" },
  { id: 26, name: "Thiết bị âm thanh", image: "/category_img/16.jpg", slug: "thiet-bi-am-thanh" },
  { id: 27, name: "Đồ âm nhạc và công nghệ", image: "/category_img/17.jpg", slug: "do-am-nhac-va-cong-nghe" },
  { id: 28, name: "Nước hoa", image: "/category_img/18.jpg", slug: "nuoc-hoa" },
  { id: 29, name: "Phụ kiện xe", image: "/category_img/19.jpg", slug: "phu-kien-xe" },
  { id: 1, name: "Khác", image: "/category_img/20.jpg", slug:'mua-ban-do-cu' },
];

export default categories;
