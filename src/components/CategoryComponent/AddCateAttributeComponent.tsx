import { CategoryAttribute } from '@/models/attributesModel';
import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { FaSave } from "react-icons/fa";
import { createCategoryAttr, updateCategoryAttr } from '@/utils/addCategory';

interface Props {
  onClick: () => void;
  attributeData: CategoryAttribute | null;
  isEditAttribute: boolean;
}

const AddCateAttributeComponent = (props: Props) => {
  const { onClick, attributeData, isEditAttribute } = props;
  const [attribute, setAttribute] = useState<CategoryAttribute>({
    attributeId: attributeData?.attributeId || Date.now(),
    label: attributeData?.label || "",
    listDataTypes: attributeData?.listDataTypes || [],
  });

  const [isAdding, setIsAdding] = useState(false);
  const [attrIndex, setAttrIndex] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof CategoryAttribute, value: any) => {
    setAttribute((prev) => ({...prev, [field]: value}))
  };

  useEffect(() => {
    if (attributeData) {
      setAttribute(attributeData);
    }
  },[isEditAttribute]);

  const addAttribute = () => {
    setIsAdding(true);
    setAttrIndex(attribute.listDataTypes.length);
    setAttribute((prev) => ({
      ...prev,
      listDataTypes: [
        ...prev.listDataTypes,
        { id: prev.listDataTypes.length+1, label: "", name: "", options: [] },
      ],
    }));
  };



  const removeAttribute = (id: any) => {
    setAttribute((prev) => ({
      ...prev,
      listDataTypes: prev.listDataTypes.filter((attr) => attr.id !== id),
    }));
  };

  const updateAttribute = (id: number, field: keyof CategoryAttribute['listDataTypes'][number], value: any) => {
    setAttribute((prev) => ({
      ...prev,
      listDataTypes: prev.listDataTypes.map((attr) =>
        attr.id === id ? { ...attr, [field]: value } : attr
      ),
    }));
  };

  const addOption = (attributeId: number) => {
    setAttribute((prev) => ({
      ...prev,
      listDataTypes: prev.listDataTypes.map((attr) =>
        attr.id === attributeId
          ? {
              ...attr,
              options: [...attr.options, { id: attr.options.length+1, value: "" }],
            }
          : attr
      ),
    }));
  };

  const removeOption = (attributeId:number, optionId:number) => {
    setAttribute((prev) => ({
      ...prev,
      listDataTypes: prev.listDataTypes.map((attr) =>
        attr.id === attributeId
          ? { ...attr, options: attr.options.filter((opt) => opt.id !== optionId) }
          : attr
      ),
    }));
  };

  const updateOption = (attributeId: number, optionId: number, value: string) => {
    setAttribute((prev) => ({
      ...prev,
      listDataTypes: prev.listDataTypes.map((attr) =>
        attr.id === attributeId
          ? {
              ...attr,
              options: attr.options.map((opt) =>
                opt.id === optionId ? { ...opt, value } : opt
              ),
            }
          : attr
      ),
    }));
  };

  const handleSaveAttribute = async (attributeIndex: number) => {
    if(attribute.listDataTypes[attributeIndex].label === "") {
      toast.error('Vui lòng nhập tên thuộc tính');
      return;
    }

    if(attribute.listDataTypes[attributeIndex].name === "") {
      toast.error('Vui lòng nhập tên danh mục');
      return;
    }

    if(attribute.listDataTypes[attributeIndex].options.length === 0){
      toast.error('Vui lòng thêm ít nhất một giá trị đáp ứng');
      return;
    }
    setIsAdding(false);
  };

  const handleEditAttribute = (attributeIndex: number) => {
    
    setAttrIndex(attributeIndex);
    setIsAdding(true);
  }

  const handleSaveCataAttribute = async () => {
    if(isEditAttribute) {
      try {
        await updateCategoryAttr(attribute);
        toast.success('Cập nhật thuộc tính thành công');
        onClick();
      } catch (error) {
        toast.error('Có lỗi xảy ra khi cập nhật thuộc tính');
      }
    } else {
      const res = await createCategoryAttr(attribute);
      if(res.error) {
        toast.error(res.error);
        return;
      }
      if(res) {
        toast.success('Tạo thuộc tính thành công');
        onClick();
      }
    }
  }

  return (
    <div className='attribute_form_container'>
      <form className='add_attribute_container'>
      <div className='attribute_value_group'>
        <h3>Tên danh mục</h3>
        <input type="text" value={attribute.label} 
          onChange={e => handleChange("label",e.target.value)} 
          className='input_group'
          placeholder='Nhập tên thuộc tính chi tiết'
          />
      </div>
      <div className="attribute_value_group">
        <h3>Danh sách thuộc tính</h3>
        {attribute.listDataTypes.map((attr, index) => (
          (isAdding && attrIndex == index) ? (
            <div key={index}>
            <div className="list_data_type">
              <div className="label_attribute">
                <h4>Nhập label</h4>
                <input
                  type='text'
                  value={attr.label}
                  onChange={e => updateAttribute(attr.id, "label", e.target.value)}
                  placeholder='Nhập label thuộc tính'
                  className='input_group'
                ></input>
              </div>
              <div className="name_attribute">
                <h4>Nhập tên</h4>
                <input
                  type='text'
                  value={attr.name}
                  onChange={e => updateAttribute(attr.id, "name", e.target.value)}
                  placeholder='Nhập tên thuộc tính'
                  className='input_group'
                  ></input>
              </div>
            </div>
            <div className="option_list">
              <h4>Danh sách giá trị</h4>
              {attr.options.map((opt, index) =>(
                <div key={index} className='option_item'>
                  <p>{index+1}</p>
                  <div className="option_group">
                    <input 
                      type='text' 
                      value={opt.value} 
                      onChange={e => updateOption(attr.id, opt.id, e.target.value)} 
                      placeholder='Nhập giá trị' 
                      className='input_group'
                    ></input>
                    
                  </div>
                  <div className="remove_option" onClick={() => removeOption(attr.id, opt.id)}>
                      <p>-</p>
                    </div>
                </div>
              ))}
              {isAdding && <div className="add_option" onClick={() => addOption(attr.id)}>
                <p>+ Thêm giá trị</p>
              </div>}

              {isAdding && (
                (
                  <div className="add_data_button isAdding">
                    <div className="cancle">
                      <p>Hủy</p>
                    </div>
                    <div className="add" onClick={() => handleSaveAttribute(attrIndex)}>
                      <p>Thêm</p>
                    </div>
                    
                  </div>
                )
              )}
             
            </div>
          </div>
            ) : (
              <div key={index} className='attribute_info'>
                <p>{index+1}</p>
                <div className="attribute_group">
                  <p>{attr.label}</p>
                  <p>{attr.name}</p>
                </div>
                <div className="icon_group">
                  <div className="edit_icon" onClick={() => handleEditAttribute(index)}>
                    <FaEdit />
                  </div>
                  <div className="remove_attribute" onClick={() => removeAttribute(attr.id)}>
                    <p>-</p>
                  </div>
                </div>
              </div>
            )
          ))}
           {!isAdding && (
                <div className="add_data_button" onClick={addAttribute}>
                  <p>+ Thêm thuộc tính</p>
                </div>
              ) }
        
      </div>
    </form>
    <div className="save_attribute_button">
      <div className="button" onClick={handleSaveCataAttribute}>
        <FaSave></FaSave>
        <p>Lưu</p>
      </div>
    </div>
    </div>

  )
}

export default AddCateAttributeComponent