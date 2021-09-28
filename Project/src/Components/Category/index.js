import React from 'react'

export default function index() {
    return (
        <div className ="typeMovie">
            <div className = "type-move-choose">
                <div className= "name-category">Thể Loại</div>
                <ul className="list-categories">
                    <li>Hành Động</li>
                    <li>Tình Cảm</li>
                    <li>Hài Kịch</li>
                    <li>Hoạt Hình</li>
                </ul> 
            </div>
            <div className = "type-move-choose hidden-category">
                <div className= "name-category">Ngày công chiếu</div>
                <ul className="list-categories">
                    <li>Mới Nhất</li>
                    <li>Sắp Chiếu</li>
                </ul> 
            </div>
            <div className = "type-move-choose">
                <div className= "name-category">Quốc Gia</div>
                <ul className="list-categories">
                    <li>Việt Nam</li>
                    <li>Hàn Quốc</li>
                    <li>Anh</li>
                    <li>Mỹ</li>
                </ul> 
            </div>
            <div className = "type-move-choose hidden-category">
                <div className= "name-category">Doanh Thu</div>
                <ul className="list-categories">
                    <li>Trong Tuần</li>
                    <li>Trong Tháng</li>
                    <li>Trong Năm</li>
                </ul> 
            </div>             
        </div>
    )
}
