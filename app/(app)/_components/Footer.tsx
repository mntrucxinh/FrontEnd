import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-emerald-600 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Column 1: Logo + Intro */}
        <div className="space-y-4">
          <div className="text-2xl font-bold">Trúc Xinh Preschool</div>
          <p className="text-sm leading-relaxed">
            Ngôi trường mầm non xanh mát, an toàn và thân thiện. Cùng bé khám phá thế giới qua
            những hoạt động gần gũi thiên nhiên.
          </p>
          <p className="text-sm">Trúc Xinh © 2025</p>
        </div>

        {/* Column 2: Company */}
        <div>
          <h3 className="font-bold mb-2">Nhà trường</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#pricing">Học phí</a></li>
            <li><a href="#">Lịch học</a></li>
            <li><a href="#">Chính sách bảo vệ trẻ</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="font-bold mb-2">Phụ huynh</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Trao đổi phụ huynh - cô</a></li>
            <li><a href="#">Thực đơn & sức khỏe</a></li>
            <li><a href="#">Sự kiện hằng tháng</a></li>
          </ul>
        </div>

        {/* Column 4: Liên hệ */}
        <div>
          <h3 className="font-bold mb-2">Liên hệ</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="tel:0123456789">Hotline: 0123 456 789</a></li>
            <li><a href="mailto:tuvan@trucxinh.edu">Email: tuvan@trucxinh.edu</a></li>
            <li><a href="#">Đặt lịch tham quan</a></li>
          </ul>
        </div>

        {/* Column 5: Social */}
        <div>
          <h3 className="font-bold mb-2">Kết nối</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">YouTube</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
