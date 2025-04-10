const offerData = [
    {id: 1, label: "Freeship"},
    {id: 2, label: "Sản phẩm 0đ"},
]

export const priceData = [
    {id: 1, label: "Tất cả"},
    {id: 2, label: "Sản phẩm 0đ", value:0},
    {id: 3, label: "Dưới 100.000đ", maxValue: 99999},
    {id: 4, label: "100.000đ - 200.000đ", maxValue: 200000, minValue: 100000},
    {id: 5, label: "200.000đ - 500.000đ", maxValue: 500000, minValue: 200000},
    {id: 6, label: "Trên 500.000đ", minValue: 500000},
    {id: 7, label: "Chọn trong khoảng"},
]

export const statusData = [
    {id:1, label: "Mới", value: 'new'},
    {id:2, label: 'Đã sử dụng', value: 'used'},
    {id:3, label: 'Như mới', value: 'like-new'},
    {id:4, label: 'Tốt', value: 'good'},
    {id:5, label: 'Khá', value: 'average'},
    {id:6, label: 'Trung bình', value: 'fair'},
    {id:7, label: 'Kém', value: 'poor'},
]

export const clothSize = [
    {id: 'cl1', label: "M"},
    {id: 'cl2', label: "S"},
    {id: 'cl3', label: "L"},
    {id: 'cl4', label: "Xl"},
    {id: 'cl5', label: "XXL"},
    {id: 'cl6', label: "XXXL"},
]

export const cateData = [
    {
      cateIdList: [29, 30, 31, 32],
      listDataType: [
        {id: 1, label: "Kích thước", name: "size", options: [
          {id: 1, value: "S"},
          {id: 2, value: "M"},
          {id: 3, value: "L"},
          {id: 4, value: "XL"},
          {id: 5, value: "XXL"}
        ]}
      ]
    },
    {
      cateIdList: [9, 10, 11, 12],
      listDataType: [
        {id: 1, label: "Kích thước", name: "size", options: [
          {id: 1, value: "13 inch"},
          {id: 2, value: "14 inch"},
          {id: 3, value: "15 inch"},
          {id: 4, value: "16 inch"},
          {id: 5, value: "17 inch"}
        ]},
        {id: 2, label: "Màu sắc", name: "color", options: [
          {id: 1, value: "Đen"},
          {id: 2, value: "Trắng"},
          {id: 3, value: "Xanh"},
          {id: 4, value: "Đỏ"},
          {id: 5, value: "Vàng"}
        ]},
        {id: 3, label: "Hệ điều hành", name: "os", options: [
          {id: 1, value: "Windows"},
          {id: 2, value: "MacOS"},
          {id: 3, value: "Linux"},
          {id: 4, value: "Android"},
          {id: 5, value: "IOS"}
        ]},
        {id: 4, label: "Lượng pin", name: "battery", options: [
          {id: 1, value: "1h"},
          {id: 2, value: "2h"},
          {id: 3, value: "3h"},
          {id: 4, value: "4h"},
          {id: 5, value: "5h"}
        ]}
      ]
    }
  ]

